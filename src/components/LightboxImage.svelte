<script lang="ts">
	type Props = {
		src: string;
		alt: string;
		class?: string;
	};

	let { src, alt, class: className = '' }: Props = $props();

	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Thumbnail -->
<button
	class="cursor-pointer overflow-hidden border-none bg-transparent p-0 {className}"
	onclick={() => (open = true)}
	aria-label="View larger image: {alt}"
>
	<img {src} {alt} class={className} />
</button>

<!-- Fullscreen overlay -->
{#if open}
	<div
		class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
		onclick={() => (open = false)}
		role="button"
		tabindex="-1"
	>
		<button
			class="absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
			onclick={() => (open = false)}
			aria-label="Close"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>
		<img
			{src}
			{alt}
			class="max-h-[90vh] max-w-[90vw] rounded-md object-contain"
			onclick={(e: MouseEvent) => e.stopPropagation()}
		/>
	</div>
{/if}
