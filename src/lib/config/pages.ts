import { IconBrandGithub, IconBrandInstagram } from '@tabler/icons-svelte';
import Site from '$lib/config/common';

export const Home = {
	socialLinks: [
		{
			href: Site.out.github,
			text: 'GitHub',
			icon: IconBrandGithub
		},
		{
			href: Site.out.instagram,
			text: 'Instagram',
			icon: IconBrandInstagram
		}
	]
};

export interface ExperienceTimelineItem {
	company: string;
	role: string;
	url: string;
	logoUrl: string;
	logoAlt: string;
	startDate: string;
	endDate?: string;
	details?: string;
	logoScale?: number;
}

export const experienceTimeline: ExperienceTimelineItem[] = [
	{
		company: 'Interva',
		role: 'Lead Developer & Maintainer',
		url: 'https://github.com/chaosweasl/interva',
		logoUrl: '/logos/interva.svg',
		logoAlt: 'Interva Logo',
		startDate: '2025-01-01',
		details:
			'Built and maintain an open-source Pomodoro timer desktop app using React, TypeScript, Tauri, and Rust. Set up CI/CD with GitHub Actions for automated cross-platform releases.',
		logoScale: 1.0
	},
	{
		company: 'KamerCatch',
		role: 'Creator & Full-Stack Developer',
		url: 'https://github.com/chaosweasl/KamerCatch',
		logoUrl: '/logos/kamercatch.svg',
		logoAlt: 'KamerCatch Logo',
		startDate: '2025-04-01',
		details:
			'Built a multi-source housing scraper monitoring Dutch rental platforms with Playwright stealth scraping, SQLite, Next.js dashboard, and AI-powered email automation.'
	},
	{
		company: 'Competitive Programmer',
		role: 'pbinfo',
		url: 'https://www.pbinfo.ro',
		logoUrl: '/logos/pbinfo.png',
		logoAlt: 'pbinfo Logo',
		startDate: '2022-01-01',
		endDate: '2025-01-01',
		details:
			'Solved 1000+ algorithmic problems on pbinfo.ro, reaching top 100 in my city. Deep focus on data structures, dynamic programming, graph algorithms, and C++.',
		logoScale: 1.0
	},
	{
		company: 'Erasmus VET+',
		role: 'Team Lead & Robotics Instructor',
		url: 'https://chaosweasl.com/blogs/erasmus-vet-spain',
		logoUrl: '/logos/erasmus.svg',
		logoAlt: 'Erasmus Logo',
		startDate: '2025-03-01',
		endDate: '2025-04-01',
		details:
			'Led a robotics team during a two-week intensive program in Spain. Taught hardware programming to beginners, managed task delegation, and delivered the first completed final project.',
		logoScale: 1.1
	}
];
