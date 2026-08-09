import Site from '$lib/config/common';

export const prerender = true;

export async function GET() {
	const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${Site.url}/sitemap.xml`, ''].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain' }
	});
}
