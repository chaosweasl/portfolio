import Site from '$lib/config/common';

export const prerender = true;

export async function GET() {
	// Bulk AI / scraping crawlers. Blocked by default; contact for paid access.
	const aiBots = [
		'AI2Bot',
		'Ai2Bot-Dolma',
		'Amazonbot',
		'anthropic-ai',
		'Applebot',
		'Applebot-Extended',
		'Bytespider',
		'CCBot',
		'ChatGPT-User',
		'Claude-Web',
		'ClaudeBot',
		'cohere-ai',
		'Diffbot',
		'DuckAssistBot',
		'FacebookBot',
		'FriendlyCrawler',
		'GPTBot',
		'iaskspider/2.0',
		'ICC-Crawler',
		'ImagesiftBot',
		'img2dataset',
		'ISSCyberRiskCrawler',
		'Kangaroo Bot',
		'Meta-ExternalAgent',
		'Meta-ExternalFetcher',
		'OAI-SearchBot',
		'omgili',
		'omgilibot',
		'PanguBot',
		'PerplexityBot',
		'PetalBot',
		'Scrapy',
		'Sidetrade indexer bot',
		'Timpibot',
		'VelenPublicWebCrawler',
		'Webzio-Extended',
		'YouBot'
	];

	const body = [
		'# If your bot is in this list and you want to scrape my blog, contact me to arrange access.',
		...aiBots.map((bot) => `User-agent: ${bot}`),
		'Disallow: /',
		'',
		'User-agent: *',
		'Allow: /',
		'',
		// Cloudflare email obfuscation artifact — not a real page on the origin.
		'Disallow: /cdn-cgi/',
		// No on-site search page exists; prevents crawling the JSON-LD search template.
		'Disallow: /search',
		'',
		`Sitemap: ${Site.url}/sitemap.xml`,
		''
	].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain' }
	});
}
