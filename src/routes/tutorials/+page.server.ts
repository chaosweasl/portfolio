/*
 * Copyright (c) 2026. Serban-Daniel Iacob
 * All Rights Reserved
 */

import { getAllTutorials } from '$lib/content/tutorials';
import { createListingPage } from '$lib/utils/pagemeta';

export const { load } = createListingPage(getAllTutorials, 'tutorials');
