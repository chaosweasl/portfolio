<script lang="ts">
	import type { PageData } from './$types';
	import Lightbox from '$components/Lightbox.svelte';
	import { useLightboxNav } from '$lib/hooks/use-lightbox-nav.svelte';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const lightbox = useLightboxNav(() => data.images);

	function getSrc(image: (typeof data.images)[0]): string {
		const v = image.variants[0];
		return v ? `${data.r2BaseUrl}${v.url}` : '';
	}
</script>

<svelte:head>
	<title>Pics | Serban-Daniel Iacob</title>
	<meta name="description" content="A collection of my photography." />
</svelte:head>

<main class="px-6 pt-0 pb-16 md:px-16">
	<h1 class="mb-2 text-2xl font-semibold">
		pics
		<span
			aria-label="count of photos"
			class="text-subtext0 inline-block align-baseline text-sm leading-none font-normal"
		>
			[{data.images.length}]
		</span>
	</h1>
	<p class="text-subtext0 text-sm">photos from all around the world.</p>

	<div class="columns-1 gap-x-4 md:columns-2 xl:columns-3">
		{#each data.images as image, index (image.id)}
			<div
				class="group mb-4 block cursor-pointer break-inside-avoid overflow-hidden"
				role="button"
				tabindex="0"
				onclick={() => lightbox.openAt(index)}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						lightbox.openAt(index);
					}
				}}
			>
				<img
					class="block h-auto w-full opacity-0 transition-opacity duration-200 group-hover:opacity-80"
					src={getSrc(image)}
					alt={image.alt}
					loading="lazy"
					decoding="async"
					width={image.originalWidth}
					height={image.originalHeight}
					onload={(e) => {
						(e.currentTarget as HTMLImageElement).style.opacity = '1';
					}}
				/>
			</div>
		{/each}
	</div>
</main>

{#if lightbox.open}
	<Lightbox
		images={data.images}
		r2BaseUrl={data.r2BaseUrl}
		currentIndex={lightbox.currentIndex}
		onclose={lightbox.close}
		onprev={lightbox.prev}
		onnext={lightbox.next}
	/>
{/if}
