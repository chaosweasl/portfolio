import { type Icon, IconBrandGithub, IconBrandInstagram, IconMail } from '@tabler/icons-svelte';
import { dev } from '$app/environment';

interface Site {
	name: string;
	url: string;
	description: string;
	tags: string[];
	seo: {
		author: string;
		birthDate: string;
		worksFor: {
			name: string;
			url: string;
		};
		location: {
			city: string;
			region: string;
			country: string;
		};
	};
	abacus: { instance: string; namespace: string };
	out: {
		github: string;
		email: string;
		instagram: string;
	};
	repo: { url: string; commitBaseUrl: string };
}

const Site: Site = {
	name: 'Daniel Iacob',
	url: dev ? 'http://localhost:5173' : 'https://chaosweasl.com',
	description:
		'Serban-Daniel Iacob (chaosweasl / weasl) — software developer, game creator, and Business & IT student. Building apps, indie horror games, and creative tools with TypeScript, React, Python, and Roblox Studio.',
	tags: [
		'Serban-Daniel Iacob',
		'Daniel Iacob',
		'Serban Daniel',
		'chaosweasl',
		'weasl',
		'Software Developer',
		'Game Developer',
		'TypeScript',
		'React',
		'Python',
		'Next.js',
		'Lua',
		'Roblox Studio',
		'Full Stack Developer',
		'Web Development',
		'Cybersecurity',
		'Open Source',
		'Student Developer',
		'Enschede',
		'Netherlands'
	],
	seo: {
		author: 'Serban-Daniel Iacob',
		birthDate: '2007-07-17',
		worksFor: {
			name: 'Student (Business & IT)',
			url: 'https://chaosweasl.com'
		},
		location: {
			city: 'Enschede',
			region: 'Overijssel',
			country: 'Netherlands'
		}
	},
	abacus: {
		instance: '',
		namespace: ''
	},
	out: {
		github: 'https://github.com/chaosweasl',
		email: '17daniel.dev@gmail.com',
		instagram: 'https://www.instagram.com/chaosweasl/'
	},
	repo: {
		url: 'https://github.com/chaosweasl/portfolio',
		commitBaseUrl: 'https://github.com/chaosweasl/portfolio/commit/'
	}
};

export default Site;

export const Socials = [
	{
		url: Site.out.github,
		label: 'GitHub',
		icon: IconBrandGithub,
		footer: true
	},
	{
		url: Site.out.instagram,
		label: 'Instagram',
		icon: IconBrandInstagram,
		footer: true
	},
	{
		url: `mailto:${Site.out.email}`,
		label: 'Email',
		icon: IconMail as unknown as Icon,
		footer: true
	}
];
