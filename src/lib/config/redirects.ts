/*
 * Copyright (c) 2025. Daniel Iacob
 * All Rights Reserved
 */
import Site from '$lib/config/common';
import createRedirects from '$utils/redirects';

const redirects = createRedirects([
	{ paths: ['/github', '/gh'], url: Site.out.github },
	{ paths: ['/insta', '/ig'], url: Site.out.instagram },
	{ paths: ['/email', '/mail'], url: `mailto:${Site.out.email}` },
	{ paths: '/repo', url: Site.repo.url },
	{ paths: '/resume', url: '/resume.pdf' },
	{ paths: '/interva', url: 'https://github.com/chaosweasl/interva' }
]);

export default redirects;
