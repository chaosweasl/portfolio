<script lang="ts">
	type Props = {
		title: string;
		slug: string;
		bgColor?: string;
	};

	let { title, slug, bgColor = '#FFC480' }: Props = $props();

	const dots = ['#FF5F56', '#FFBD2E', '#27C93F'];

	const taglines: Record<string, string> = {
		interva: 'A simple Pomodoro Timer that taught me CI/CD',
		'room-scraper': 'Multi-source housing scraper for the Dutch market',
		urbanpulse: 'A weekend hackathon — more chaos than code',
		'horror-game': 'Co-op horror built in Roblox Studio',
		pbinfo: '1000+ algorithmic problems solved',
		'blank-canvas-beginner-art': 'From stick figures to digital art',
		'building-cognify': 'AI-powered study tool built from scratch',
		'building-interva': 'How a simple timer taught me DevOps',
		'building-room-scraper': 'Engineering a housing radar to survive the Netherlands',
		'color-side-quest-photography': 'Photography as a creative side quest',
		'erasmus-vet-spain': 'Teaching robotics in a burnt-down building in Spain',
		'from-plastic-blocks-to-architecture': 'From Roblox blocks to game architecture',
		'hello-physical-world': 'Bridging code and the physical world',
		'trust-no-one-client': 'Building a zero-trust client architecture',
		'urbanpulse-hackathon-vibes': "Why winning a hackathon doesn't matter",
		'voice-acting-ambitions': 'Chasing voice acting dreams'
	};

	const tagline = taglines[slug] ?? 'thoughts, stories, and late-night debugging';
</script>

<div
	class="flex aspect-[16/10] w-full items-center justify-center p-5"
	style="background-color: {bgColor};"
>
	<div class="flex h-full w-full flex-col rounded-lg bg-[#1E1E2E] p-4 shadow-lg">
		<div class="mb-3 flex gap-1.5">
			{#each dots as color}
				<div class="h-2.5 w-2.5 rounded-full" style="background-color: {color};"></div>
			{/each}
		</div>

		<div class="flex flex-1 flex-col justify-center font-mono text-xs leading-relaxed sm:text-sm">
			<div class="flex">
				<span class="mr-2 text-white/20 select-none">$</span>
				<span style="color: #AE63FA;">~/{slug}</span>
			</div>
			<div class="flex">
				<span class="mr-2 text-white/20 select-none">$</span>
				<span style="color: #AAFD93;">cat README.md</span>
			</div>
			<div class="flex">
				<span class="mr-2 text-white/20 select-none">$</span>
				<span style="color: #FFCD3A;">> {title}</span>
			</div>
			<div class="flex">
				<span class="mr-2 text-white/20 select-none">$</span>
				<span style="color: #FFFFFF;"> {tagline}</span>
				<span class="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-white/60"></span>
			</div>
		</div>
	</div>
</div>
