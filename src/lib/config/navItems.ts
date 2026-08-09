import type { Icon } from '@tabler/icons-svelte';

interface NavItem {
	title: string;
	href: string;
	icon?: Icon;
	external?: boolean;
}

export const mainNavItems: NavItem[] = [
	{ title: 'About', href: '/about' },
	{ title: 'Blogs', href: '/blogs' },
	{ title: 'Projects', href: '/projects' },
	{ title: 'Pics', href: '/pics' },
	{ title: 'Contact', href: '/contact' }
];

export const moreNavItems: NavItem[] = [];
