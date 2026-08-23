import Site from '$lib/config/common';
import type { PostPageData } from '$lib/content/posts';
import type {
	BlogPosting,
	CollegeOrUniversity,
	Graph,
	Person,
	ProfilePage,
	WebSite,
	WithContext
} from 'schema-dts';

const siteId = `${Site.url}/#website`;
const personId = `${Site.url}/#person`;
type JsonLd = Graph | WithContext<BlogPosting>;

export function siteUrl(path: string): string {
	return new URL(path, Site.url).href;
}

export function jsonLd(data: JsonLd): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function baseJsonLd(pathname: string): Graph {
	const graph: Array<WebSite | Person | ProfilePage> = [
		{
			'@type': 'WebSite',
			'@id': siteId,
			url: Site.url,
			name: Site.name,
			description: Site.description,
			inLanguage: 'en-NL',
			publisher: { '@id': personId }
		},
		{
			'@type': 'Person',
			'@id': personId,
			name: Site.seo.author,
			givenName: 'Serban-Daniel',
			familyName: 'Iacob',
			alternateName: ['Serban', 'Serban-Daniel Iacob', 'chaosweasl', 'weasl'],
			url: Site.url,
			image: siteUrl('/images/avatar.webp'),
			description:
				'Software engineer and full-stack developer available for hire, based in Enschede, Netherlands. Business & IT student at the University of Twente (UTwente) and Erasmus+ alumni.',
			jobTitle: 'Software Developer',
			birthDate: Site.seo.birthDate,
			worksFor: {
				'@type': 'CollegeOrUniversity',
				name: Site.seo.worksFor.name,
				url: Site.seo.worksFor.url
			},
			address: {
				'@type': 'PostalAddress',
				addressLocality: Site.seo.location.city,
				addressRegion: Site.seo.location.region,
				addressCountry: Site.seo.location.country
			},
			sameAs: [Site.out.github, Site.out.instagram],
			knowsAbout: [
				'Software Engineering',
				'Full-Stack Web Development',
				'Web Development',
				'Game Development',
				'Indie Game Development',
				'Cybersecurity',
				'Competitive Programming',
				'Web Scraping',
				'Robotics',
				'Hardware',
				'TypeScript',
				'JavaScript',
				'React',
				'Next.js',
				'Tauri',
				'Rust',
				'Python',
				'C++',
				'Lua',
				'Roblox Studio',
				'Docker',
				'SQLite',
				'Supabase',
				'Arduino',
				'Microcontrollers',
				'AI',
				'Photography',
				'Digital Art',
				'Voice Acting',
				'Hackathons',
				'Teaching',
				'Leadership',
				'Erasmus+',
				'University of Twente'
			]
		}
	];

	if (pathname === '/') {
		graph.push({
			'@type': 'ProfilePage',
			'@id': `${Site.url}/#webpage`,
			url: Site.url,
			isPartOf: { '@id': siteId },
			name: `Serban-Daniel Iacob — Portfolio & Blog`,
			description: Site.description,
			inLanguage: 'en-NL',
			mainEntity: { '@id': personId }
		});
	}

	return { '@context': 'https://schema.org', '@graph': graph };
}

export function postJsonLd(post: PostPageData): WithContext<BlogPosting> {
	const url = siteUrl(`/blogs/${post.slug}`);

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'@id': `${url}#blogposting`,
		url,
		mainEntityOfPage: { '@id': `${url}#webpage` },
		headline: post.metadata.title.text,
		description: post.metadata.description,
		keywords: post.metadata.tags?.join(', ') ?? '',
		inLanguage: 'en-NL',
		datePublished: post.metadata.published_at ?? '',
		dateModified: post.metadata.updated_at ?? post.metadata.published_at ?? '',
		author: { '@id': personId },
		publisher: { '@id': personId },
		image: post.metadata.image
			? {
					'@type': 'ImageObject',
					'@id': `${url}#image`,
					url: siteUrl(post.metadata.image.url)
				}
			: siteUrl('/og-image.png')
	};
}
