<script lang="ts">
	import LinkWithIcon from '$components/LinkWithIcon.svelte';
	import Featured, { type FeaturedProject } from '$components/layout/Featured.svelte';
	import {
		IconArrowRight,
		IconExternalLink,
		IconArticle,
		IconMail,
		IconActivity
	} from '@tabler/icons-svelte';
	import Site from '$lib/config/common';
	import { Home } from '$lib/config/pages';
	import ThemeSelector from '$components/themes/ThemeSelector.svelte';
	import ColorSelector from '$components/themes/ColorSelector.svelte';
	import Experience from '$components/Experience.svelte';
	import LocationMap from '$components/bento/LocationMap.svelte';
	import TimeWaster from '$components/bento/TimeWaster.svelte';
	import { formatDate } from '$utils/date';
	import type { CommitData } from '$lib/api/commits';

	type PageData = {
		featuredProjects: FeaturedProject[];
		commitData: CommitData;
		latestPosts: {
			slug: string;
			metadata: { title: { text: string; config?: string }; published_at: string };
		}[];
	};

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
	<!-- Section 1: Hero / Introduction — mxb-inspired -->
	<section class="space-y-5 px-4 md:px-0">
		<p class="text-subtext0 text-base">
			<a href="/about" class="link">hey, I'm Serban-Daniel Iacob — but call me Serban (chaosweasl)!</a
			>
		</p>
		<h1 class="text-4xl font-bold md:text-5xl">
			<span class="sr-only">Serban-Daniel Iacob (Serban / chaosweasl / weasl) — </span>i like
			to create things
		</h1>
		<p class="text-subtext0 max-w-prose text-lg leading-relaxed">
			I'm Serban-Daniel Iacob — a software developer and Business & IT student who lives for
			creation — whether that's
			<a class="link" href="/projects">building apps</a>, developing indie horror games in Roblox
			Studio, solving
			<a class="link" href="https://www.pbinfo.ro" target="_blank" rel="noopener"
				>1000+ competitive programming problems</a
			>
			on pbinfo (top 100 in my city). I dabble in cybersecurity, robotics, digital art, voice acting,
			and photography. Code is just one of many tools I use to bring ideas to life.
		</p>
		<div class="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
			{#each Home.socialLinks as link (link.href)}
				<LinkWithIcon
					href={link.href}
					text={link.text}
					icon={link.icon}
					external={true}
					class="text-sm"
				/>
				{#if link !== Home.socialLinks[Home.socialLinks.length - 1]}
					<span class="text-surface1 text-xs">|</span>
				{/if}
			{/each}
			<span class="text-surface1 text-xs">|</span>
			<a
				href="/about"
				class="group text-subtext1 hover:text-accent inline-flex items-center gap-1 text-sm transition-colors duration-200"
			>
				<span>More about me</span>
				<IconArrowRight
					size={16}
					class="transition-transform duration-200 group-hover:translate-x-0.5"
				/>
			</a>
		</div>
	</section>

	<!-- Section: Minimal Experience Row -->
	<Experience />

	<!-- Section: Featured Projects -->
	<Featured projects={data.featuredProjects} maxProjects={2} />

	<!-- Section: Bento Grid Container -->
	<section class="px-4 md:px-0">
		<h2 class="sr-only">Dashboard / Highlights</h2>
		<div class="grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
			<!-- Box 1: Theme + Color -->
			<div
				class="border-surface0 bg-base rounded-xl border p-4 shadow-lg sm:col-span-2 xl:col-span-1"
			>
				<ThemeSelector />
				<ColorSelector />
			</div>

			<!-- Box 2: Get in Touch -->
			<div
				class="border-surface0 bg-base flex flex-col justify-center rounded-xl border p-6 text-center shadow-lg"
			>
				<h3 class="text-text mb-3 flex items-center justify-center gap-2 text-lg font-semibold">
					<IconMail size={20} class="text-accent" />
					Get in Touch
				</h3>
				<p class="text-subtext0 mb-4 text-center text-sm">
					Always open to interesting projects and conversations.
				</p>
				<a
					href="/contact"
					class="bg-accent/80 hover:bg-accent focus:ring-accent/50 focus:ring-offset-base inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-bold shadow-sm transition-all duration-150 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-95"
				>
					<IconMail size={18} />
					Send an Email
				</a>
			</div>

			<!-- Box 3: Location Map -->
			<LocationMap />

			<!-- Box 4: Buy me a coffee -->
			<TimeWaster />

			<!-- Box 5: Latest Commits -->
			<div class="border-surface0 bg-base rounded-xl border p-4 shadow-lg md:col-span-2">
				<div class="text-text mb-3 flex items-center justify-between gap-2 text-sm">
					<h3 class="flex items-center gap-2 font-semibold">
						<IconActivity size={16} class="text-accent" />
						<span>Recent Commits</span>
					</h3>
				</div>
				{#if data.commitData?.commits?.length > 0}
					<ul class="space-y-1.5 text-sm">
						{#each data.commitData.commits.slice(0, 4) as commit (commit.sha)}
							<li>
								<a
									href={commit.href}
									target="_blank"
									rel="noopener noreferrer"
									class="text-subtext0 hover:text-accent flex min-w-0 items-center gap-2"
									title={`${commit.repo}: ${commit.message}`}
								>
									<span class="text-text flex-shrink-0 font-medium"
										>{commit.repo.split('/')[1]}:</span
									>
									<span class="min-w-0 flex-1 truncate">{commit.message}</span>
								</a>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-subtext1 text-sm italic">No recent public commits.</p>
				{/if}
				<div class="mt-3 flex items-center gap-3">
					<a
						href={Site.out.github}
						target="_blank"
						rel="noopener noreferrer"
						class="group text-accent inline-flex items-center gap-1 text-sm hover:underline"
					>
						<span>View on GitHub</span>
						<IconExternalLink
							size={14}
							class="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
						/>
					</a>
				</div>
			</div>
			<!-- Box 6: Latest Blog Posts -->
			<div
				class="border-surface0 bg-base rounded-xl border p-4 shadow-lg sm:col-span-2 lg:col-span-2"
			>
				<div class="text-text mb-3 flex items-center justify-between gap-2 text-sm">
					<h3 class="flex items-center gap-2 font-semibold">
						<IconArticle size={14} class="text-accent" />
						<span>Latest Blogs</span>
					</h3>
					<a
						href="/blogs"
						aria-label="View all blogs"
						class=" text-accent/80 transition-transform duration-500 ease-in hover:translate-x-0.5 hover:-translate-y-0.5"
					>
						<IconExternalLink size={18} />
					</a>
				</div>

				{#if data.latestPosts.length > 0}
					<ul class="list-none space-y-2">
						{#each data.latestPosts as post (post.slug)}
							{@const words = post.metadata.title.text.split(' ')}
							{@const safePath = post.slug.split('/').pop() || post.slug}
							<li>
								<a
									href={'/blogs/' + post.slug}
									class="text-subtext0 hover:text-accent flex min-w-0 items-center gap-2 text-sm"
								>
									<span class="min-w-0 flex-1 truncate">
										{#each words as word, i (i)}
											{@const normalized = word.toLowerCase().replace(/[^a-z0-9\s-_]/g, '')}
											{@const vtName = `_${safePath}__${normalized}`}
											<span style="view-transition-name: {vtName};">
												{word}{i < words.length - 1 ? ' ' : ''}
											</span>
										{/each}
									</span>

									{#if post.metadata.published_at}
										<span class="text-surface1 mx-2 flex-shrink-0 text-xs">&ndash;</span>
										<span class="text-subtext1 flex-shrink-0 text-xs whitespace-nowrap">
											{formatDate(post.metadata.published_at, { shortMonth: true })}
										</span>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-subtext1 text-xs italic">No posts yet.</p>
				{/if}
			</div>
		</div>
	</section>
</div>
