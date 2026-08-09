<script lang="ts">
	import { formatDate } from '$lib/utils/date';
	import type { PostPageData } from '$lib/content/posts';
	import SlabTitle from '$components/SlabTitle.svelte';
	import PostTags from '$components/posts/PostTags.svelte';
	import '$lib/styles/content.css';
	import Site from '$lib/config/common';
	import { jsonLd, postJsonLd } from '$lib/utils/jsonld';

	let { data }: { data: PostPageData } = $props();

	const Content = $derived(data.content);
</script>

<svelte:head>
	<title>{data.metadata.title.text}</title>
	<meta name="description" content={data.metadata.description} />
	{#if data.metadata.tags}
		<meta name="keywords" content={data.metadata.tags.join(', ')} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={data.metadata.title.text} />
	<meta property="og:description" content={data.metadata.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={Site.url + '/blogs/' + data.slug} />
	{#if data.metadata.image}
		<meta property="og:image" content={new URL(data.metadata.image.url, Site.url).href} />
		<meta property="og:image:alt" content={data.metadata.image.alt || data.metadata.title.text} />
	{/if}
	<meta property="article:author" content={Site.seo.author} />
	{#if data.metadata.published_at}
		<meta property="article:published_time" content={data.metadata.published_at} />
	{/if}
	{#if data.metadata.updated_at}
		<meta property="article:modified_time" content={data.metadata.updated_at} />
	{/if}

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.metadata.title.text} />
	<meta name="twitter:description" content={data.metadata.description} />
	{#if data.metadata.image}
		<meta name="twitter:image" content={new URL(data.metadata.image.url, Site.url).href} />
		<meta name="twitter:image:alt" content={data.metadata.image.alt || data.metadata.title.text} />
	{/if}

	<link rel="canonical" href={Site.url + '/blogs/' + data.slug} />
	{@html `<script type="application/ld+json">${jsonLd(postJsonLd(data))}</script>`}
</svelte:head>

<div class="mx-auto max-w-4xl px-4">
	<header class="mb-12 space-y-4">
		<SlabTitle
			title={data.metadata.title.text}
			slug={data.slug}
			config={data.metadata.title?.config}
			hash={data.metadata.title?.hash}
		/>
		<p class="text-subtext0 text-sm">
			{#if data.metadata.published_at}
				{formatDate(data.metadata.published_at)}
			{:else}
				Draft
			{/if}
			{#if data.metadata.updated_at}
				| Updated {formatDate(data.metadata.updated_at)}
			{/if}
		</p>
		<PostTags post={data} />
	</header>

	<article class="prose mx-auto mb-6 max-w-4xl">
		<Content />
	</article>
</div>
