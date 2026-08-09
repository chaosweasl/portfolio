import { dev } from '$app/environment';
import { GITHUB_TOKEN } from '$env/static/private';
import { measurePerformance } from '$lib/utils/performance';
import { getKV, setKV, isCacheStale } from '$lib/utils/edge-cache';
import type { KVNamespace } from '@cloudflare/workers-types';

export interface ProcessedCommit {
	repo: string;
	message: string;
	href: string;
	sha: string;
	date: string;
}

export interface CommitData {
	commits: ProcessedCommit[];
}

const KV_KEY = 'github:commits';
const TTL_MS = 60 * 60 * 1000; // 1 hour
const GITHUB_USERNAME = 'chaosweasl';

// ── GitHub Events API (free, no auth needed for public data) ──────────

interface GitHubEvent {
	type: string;
	repo: { name: string };
	payload: {
		commits?: { sha: string; message: string }[];
	};
	created_at: string;
}

function processEvents(events: GitHubEvent[]): CommitData {
	const commits: ProcessedCommit[] = [];

	for (const event of events) {
		if (event.type !== 'PushEvent') continue;
		const payloadCommits = event.payload.commits ?? [];
		for (const c of payloadCommits) {
			commits.push({
				repo: event.repo.name,
				message: c.message.split('\n')[0],
				href: `https://github.com/${event.repo.name}/commit/${c.sha}`,
				sha: c.sha.substring(0, 7),
				date: event.created_at
			});
		}
	}

	return { commits: commits.slice(0, 5) };
}

// ── Fallback (shown when API is unreachable) ──────────────────────────

const FALLBACK_RAW: GitHubEvent[] = [];

// ── Public API ────────────────────────────────────────────────────────

export async function fetchLatestCommits(kv?: KVNamespace): Promise<CommitData> {
	// In dev, skip network entirely
	if (dev) return { commits: [] };

	if (kv) {
		const cached = await getKV<CommitData>(kv, KV_KEY);
		if (cached) {
			if (isCacheStale(cached, TTL_MS)) {
				console.log('[commits] Cache stale, background refresh');
				void refreshCache(kv);
			}
			return cached.data;
		}
	}

	return await refreshCache(kv);
}

async function refreshCache(kv?: KVNamespace): Promise<CommitData> {
	return await measurePerformance('github-api-fetch', async () => {
		try {
			const url = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`;
			const headers: Record<string, string> = {
				Accept: 'application/vnd.github+json',
				'User-Agent': 'portfolio'
			};
			if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;

			const response = await fetch(url, {
				headers,
				signal: AbortSignal.timeout(5000)
			});

			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const events: GitHubEvent[] = await response.json();
			const data = processEvents(events);

			if (kv) await setKV(kv, KV_KEY, data);
			return data;
		} catch (err) {
			console.warn('GitHub API fetch failed:', err);
			if (kv) {
				const cached = await getKV<CommitData>(kv, KV_KEY);
				if (cached) return cached.data;
			}
			return processEvents(FALLBACK_RAW);
		}
	});
}
