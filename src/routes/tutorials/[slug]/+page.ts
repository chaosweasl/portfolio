/*
 * Copyright (c) 2026. Serban-Daniel Iacob
 * All Rights Reserved
 */

import { getAllTutorials, getTutorialBySlug } from '$lib/content/tutorials';
import { createContentPage } from '$lib/utils/pagemeta';

const { prerender, entries, load } = createContentPage({
	getAll: getAllTutorials,
	getBySlug: getTutorialBySlug
});

export { prerender, entries, load };
