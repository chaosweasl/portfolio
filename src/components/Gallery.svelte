<script lang="ts">
	import Lightbox from '$components/Lightbox.svelte';

	type Props = {
		images: { src: string; alt: string }[];
		cols?: 2 | 3;
	};

	let { images, cols = 2 }: Props = $props();

	const gridStyle = $derived(`grid-template-columns: repeat(${cols}, 1fr);`);

	let lightboxOpen = $state(false);
	let lightboxIndex = $state(0);

	// Build PhotoData-compatible array for the Lightbox
	const photoData = $derived(
		images.map((img) => ({
			id: img.src,
			alt: img.alt,
			hash: '',
			originalWidth: 0,
			originalHeight: 0,
			exif: {
				camera: null,
				aperture: null,
				shutterSpeed: null,
				iso: null,
				focalLength: null,
				dateTaken: null
			},
			variants: [{ width: 0, format: 'jpeg' as const, url: img.src }]
		}))
	);
</script>

<div class="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2" style={gridStyle}>
	{#each images as img, i}
		<button
			type="button"
			class="cursor-pointer overflow-hidden rounded-md border-none bg-transparent p-0 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
			onclick={() => {
				lightboxIndex = i;
				lightboxOpen = true;
			}}
			aria-label="View larger: {img.alt}"
		>
			<img src={img.src} alt={img.alt} class="w-full object-cover" loading="lazy" />
		</button>
	{/each}
</div>

{#if lightboxOpen}
	<Lightbox
		images={photoData}
		r2BaseUrl=""
		currentIndex={lightboxIndex}
		onclose={() => (lightboxOpen = false)}
		onprev={() => (lightboxIndex = (lightboxIndex - 1 + photoData.length) % photoData.length)}
		onnext={() => (lightboxIndex = (lightboxIndex + 1) % photoData.length)}
	/>
{/if}
