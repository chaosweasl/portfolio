<script lang="ts">
	import {
		IconBrandGithub,
		IconBrandInstagram,
		IconMail,
		IconPaw,
		IconStar
	} from '@tabler/icons-svelte';
	import Site from '$lib/config/common';
	import AnchorHeader from '$lib/components/AnchorHeader.svelte';
	import Lightbox from '$components/Lightbox.svelte';
	import TechStack from '$components/TechStack.svelte';

	const handleEmailClick = () => {
		window.location.href = `mailto:${Site.out.email}`;
	};

	type str = string;

	const aboutImages = [
		{
			id: 'avatar',
			alt: 'Daniel Iacob',
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
			variants: [{ width: 0, format: 'jpeg' as const, url: '/images/avatar.webp' }]
		},
		{
			id: 'ferret-1',
			alt: 'A cute ferret',
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
			variants: [{ width: 0, format: 'jpeg' as const, url: '/images/ferrets/ferret-1.webp' }]
		},
		{
			id: 'ferret-2',
			alt: 'A cute ferret',
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
			variants: [{ width: 0, format: 'jpeg' as const, url: '/images/ferrets/ferret-2.webp' }]
		},
		{
			id: 'ferret-3',
			alt: 'A cute ferret',
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
			variants: [{ width: 0, format: 'jpeg' as const, url: '/images/ferrets/ferret-3.webp' }]
		},
		{
			id: 'lara-1',
			alt: 'Lara posing',
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
			variants: [{ width: 0, format: 'jpeg' as const, url: '/images/lara/lara-1.webp' }]
		},
		{
			id: 'lara-2',
			alt: 'Lara relaxing outdoors',
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
			variants: [{ width: 0, format: 'jpeg' as const, url: '/images/lara/lara-2.webp' }]
		}
	];

	let lightboxOpen = $state(false);
	let lightboxIndex = $state(0);

	function openLightbox(idx: number) {
		lightboxIndex = idx;
		lightboxOpen = true;
	}
</script>

<svelte:head>
	<title>About Me | Daniel Iacob</title>
</svelte:head>

{#snippet ExternalLink(href: str, text: str)}
	<a {href} target="_blank" rel="noopener noreferrer" class="link">
		{text}
	</a>
{/snippet}

{#snippet GithubProject(title: str, href: str)}
	<a {href} id={title.toLowerCase()} target="_blank" rel="noopener noreferrer" class="link">
		{title}
	</a>
{/snippet}

<div class="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6">
	<section class="space-y-6">
		<h1 class="flex items-center gap-3 text-3xl font-bold md:text-4xl">
			<span>About Me</span>
		</h1>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="md:col-span-1">
				<button
					type="button"
					class="h-full w-full cursor-pointer overflow-hidden rounded-md border-none bg-transparent p-0"
					onclick={() => openLightbox(0)}
					aria-label="View larger: Daniel Iacob"
				>
					<img
						src="/images/avatar.webp"
						alt="Daniel Iacob"
						class="h-full w-full rounded-md object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
					/>
				</button>
			</div>

			<div class="space-y-4 md:col-span-2">
				<p class="text-subtext0 text-base leading-relaxed">
					<b>Hey!</b> I'm Daniel Iacob (<a class="link" href="/socials">@weasl</a>) — a software
					developer and Business & IT student currently based in Enschede, NL. I
					<a href="/projects" class="link">build things</a>
					when I'm bored, which is basically all the time.
				</p>

				<p class="text-subtext0 text-base leading-relaxed">
					Some of my more notable projects include {@render GithubProject(
						'Interva',
						'https://github.com/chaosweasl/interva'
					)}, an open-source Pomodoro timer built with Tauri & React, and
					{@render GithubProject('Room Scraper', '/projects/room-scraper')}, a housing radar that
					saved me from the brutal Dutch rental market. I also spend a lot of time in Roblox Studio
					building an indie horror game with a friend.
				</p>

				<p class="text-subtext0 text-base leading-relaxed">
					Beyond the code editor, I'm into
					<a href="/pics" class="link">photography</a>, digital art on my tablet, amateur voice
					acting (I can do a lot of good impressions for niche characters like Mort from
					Madagascar), and getting my hands dirty with robotics and hardware.
				</p>

				<p class="text-subtext0 text-base leading-relaxed">
					Feel free to <button onclick={handleEmailClick} class="link cursor-pointer"
						>shoot me an email</button
					> if you'd like to chat, collaborate!
				</p>

				<div class="flex flex-wrap gap-3 pt-2">
					<a
						href={Site.out.github}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
					>
						<IconBrandGithub size={16} />
						GitHub
					</a>
					<span class="text-surface1">*</span>
					<a
						href={Site.out.instagram}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
					>
						<IconBrandInstagram size={16} />
						Instagram
					</a>
					<span class="text-surface1">*</span>
					<span
						role="button"
						aria-label="Send an email to contact"
						class="hover:text-accent inline-flex cursor-pointer items-center gap-1.5 text-sm transition-colors"
						tabindex="0"
						onclick={handleEmailClick}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								handleEmailClick();
							}
						}}
					>
						<IconMail size={16} />
						17daniel.dev@gmail.com
					</span>
				</div>
			</div>
		</div>
	</section>

	<section id="hobbies-section" class="space-y-8">
		<div class="bg-base rounded-lg p-6 transition-all duration-300">
			<AnchorHeader
				level="h3"
				id="what-i-do"
				class="mb-5 flex items-center gap-2 text-xl font-semibold"
			>
				<IconStar size={24} class="text-accent" />
				What I Do
			</AnchorHeader>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<ul class="text-subtext0 list-disc space-y-2 pl-5 text-base leading-relaxed">
					<li>Full-stack developer who loves creating new things</li>
					<li>Game developer in Roblox Studio (for now)</li>
					<li>Web scraping & automation with Playwright and Python</li>
				</ul>
				<ul class="text-subtext0 list-disc space-y-2 pl-5 text-base leading-relaxed">
					<li>Digital illustration & Art</li>
					<li>Robotics & hardware programming</li>
					<li>Photography and chasing aesthetics</li>
				</ul>
			</div>
		</div>

		<!-- Tech Stack -->
		<div class="bg-base rounded-lg p-6 transition-all duration-300">
			<AnchorHeader
				level="h3"
				id="tech-stack"
				class="mb-5 flex items-center gap-2 text-xl font-semibold"
			>
				<IconStar size={24} class="text-accent" />
				Tech Stack
			</AnchorHeader>
			<TechStack />
		</div>

		<div class="bg-base rounded-lg p-6 transition-all duration-300">
			<AnchorHeader
				level="h3"
				id="ferrets"
				class="mb-5 flex items-center gap-2 text-xl font-semibold"
			>
				<IconPaw size={24} class="text-accent" />
				Ferrets!
			</AnchorHeader>
			<p class="text-subtext0 mb-4 leading-relaxed">
				I have a thing for ferrets (and weasels — they're cousins). They're small, chaotic, fiercely
				curious, and way smarter than they look, kind of like the best kind of developer. My online
				pseudonym <b>weasl</b> is inspired by these little chaos demons. If I had to pick a favourite
				animal, I'd definitely pick these little critters
			</p>
			<div class="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
				<button
					type="button"
					class="cursor-pointer overflow-hidden rounded-md border-none bg-transparent p-0 shadow-sm transition-transform duration-300 hover:scale-[1.03]"
					onclick={() => openLightbox(1)}
					aria-label="View larger: ferret 1"
				>
					<img
						src="/images/ferrets/ferret-1.webp"
						alt="A cute ferret"
						class="aspect-[4/3] w-full rounded-md object-cover"
					/>
				</button>
				<button
					type="button"
					class="cursor-pointer overflow-hidden rounded-md border-none bg-transparent p-0 shadow-sm transition-transform duration-300 hover:scale-[1.03]"
					onclick={() => openLightbox(2)}
					aria-label="View larger: ferret 2"
				>
					<img
						src="/images/ferrets/ferret-2.webp"
						alt="A cute ferret"
						class="aspect-[4/3] w-full rounded-md object-cover"
					/>
				</button>
				<button
					type="button"
					class="cursor-pointer overflow-hidden rounded-md border-none bg-transparent p-0 shadow-sm transition-transform duration-300 hover:scale-[1.03]"
					onclick={() => openLightbox(3)}
					aria-label="View larger: ferret 3"
				>
					<img
						src="/images/ferrets/ferret-3.webp"
						alt="A cute ferret"
						class="aspect-[4/3] w-full rounded-md object-cover"
					/>
				</button>
			</div>
		</div>

		<div class="bg-base rounded-lg p-6 transition-all duration-300">
			<AnchorHeader level="h3" id="lara" class="mb-5 flex items-center gap-2 text-xl font-semibold">
				<IconPaw size={24} class="text-accent" />
				My Dog (Lara!)
			</AnchorHeader>
			<div class="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
				<button
					type="button"
					class="cursor-pointer overflow-hidden rounded-md border-none bg-transparent p-0 shadow-sm transition-transform duration-300 hover:scale-[1.03]"
					onclick={() => openLightbox(4)}
					aria-label="View larger: Lara 1"
				>
					<img
						src="/images/lara/lara-1.webp"
						alt="Lara posing"
						class="aspect-[4/3] w-full rounded-md object-cover"
					/>
				</button>
				<button
					type="button"
					class="cursor-pointer overflow-hidden rounded-md border-none bg-transparent p-0 shadow-sm transition-transform duration-300 hover:scale-[1.03]"
					onclick={() => openLightbox(5)}
					aria-label="View larger: Lara 2"
				>
					<img
						src="/images/lara/lara-2.webp"
						alt="Lara relaxing outdoors"
						class="aspect-[4/3] w-full rounded-md object-cover"
					/>
				</button>
			</div>
		</div>
	</section>
</div>

{#if lightboxOpen}
	<Lightbox
		images={aboutImages}
		r2BaseUrl=""
		currentIndex={lightboxIndex}
		onclose={() => (lightboxOpen = false)}
		onprev={() => (lightboxIndex = (lightboxIndex - 1 + aboutImages.length) % aboutImages.length)}
		onnext={() => (lightboxIndex = (lightboxIndex + 1) % aboutImages.length)}
	/>
{/if}

<style>
	:global(html) {
		scroll-padding-top: 5rem;
	}
</style>
