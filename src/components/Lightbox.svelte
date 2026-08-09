<script lang="ts">
	import type { PhotoData } from '$types/photos';

	type Props = {
		images: PhotoData[];
		r2BaseUrl: string;
		currentIndex: number;
		onclose: () => void;
		onprev: () => void;
		onnext: () => void;
	};

	let { images, r2BaseUrl, currentIndex, onclose, onprev, onnext }: Props = $props();

	let image = $derived(
		currentIndex >= 0 && currentIndex < images.length ? images[currentIndex] : null
	);
	let lightboxEl: HTMLDivElement | null = $state(null);

	let touchStartX = 0;
	let touchEndX = 0;

	let currentSrc = $derived.by(() => {
		if (!image) return '';
		const first = image.variants[0];
		return first ? `${r2BaseUrl}${first.url}` : '';
	});

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onclose();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onclose();
		} else if (e.key === 'ArrowLeft') {
			onprev();
		} else if (e.key === 'ArrowRight') {
			onnext();
		}
	}

	$effect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	});
	$effect(() => {
		const el = lightboxEl;
		if (!el) return;

		const handleTouchStart = (e: TouchEvent) => {
			if (e.touches.length > 0) {
				touchStartX = e.touches[0].clientX;
			}
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (e.touches.length > 0) {
				touchEndX = e.touches[0].clientX;
			}
		};

		const handleTouchEnd = () => {
			const diff = touchStartX - touchEndX;
			const threshold = 50;

			if (Math.abs(diff) > threshold) {
				if (diff > 0) {
					onnext();
				} else {
					onprev();
				}
			}
		};

		el.addEventListener('touchstart', handleTouchStart);
		el.addEventListener('touchmove', handleTouchMove);
		el.addEventListener('touchend', handleTouchEnd);

		return () => {
			el.removeEventListener('touchstart', handleTouchStart);
			el.removeEventListener('touchmove', handleTouchMove);
			el.removeEventListener('touchend', handleTouchEnd);
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if image}
	<div
		class="lightbox"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="button"
		tabindex="-1"
		bind:this={lightboxEl}
	>
		<button
			class="text-accent absolute top-1/2 left-1 z-[10000] -translate-y-1/2 cursor-pointer overflow-visible border-none bg-transparent px-4 py-8 text-3xl transition-transform duration-200 hover:scale-110 md:left-4 md:px-8 md:py-16 md:text-5xl"
			onclick={onprev}
			aria-label="Previous image"
		>
			<span class="block scale-y-[1.5] transition-transform duration-500">&#8249;</span>
		</button>

		<img class="lightbox-img" src={currentSrc} alt={image.alt} />

		<button
			class="text-accent absolute top-1/2 right-1 z-[10000] -translate-y-1/2 cursor-pointer overflow-visible border-none bg-transparent px-4 py-8 text-3xl transition-transform duration-200 hover:scale-110 md:right-4 md:px-8 md:py-16 md:text-5xl"
			onclick={onnext}
			aria-label="Next image"
		>
			<span class="block scale-y-[1.5] transition-transform duration-500">&#8250;</span>
		</button>

		<div class="counter">
			<span class="text-accent">{currentIndex + 1}</span> / {images.length}
		</div>
	</div>
{/if}

<style>
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.95);
		cursor: pointer;
		overflow: visible;
	}

	.lightbox-img {
		max-width: 95vw;
		max-height: 95vh;
		object-fit: contain;
		display: block;
		pointer-events: none;
	}

	.counter {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.875rem;
		pointer-events: none;
	}
</style>
