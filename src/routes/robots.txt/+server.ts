import Site from '$lib/config/common';

export const prerender = true;

export async function GET() {
	const body = [
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
