<script lang="ts">
	import * as si from 'simple-icons';

	type Tech = {
		name: string;
		icon: string; // simple-icons key
	};

	const techs: Tech[] = [
		{ name: 'TypeScript', icon: 'siTypescript' },
		{ name: 'JavaScript', icon: 'siJavascript' },
		{ name: 'Python', icon: 'siPython' },
		{ name: 'C++', icon: 'siCplusplus' },
		{ name: 'Lua', icon: 'siLua' },
		{ name: 'React', icon: 'siReact' },
		{ name: 'Next.js', icon: 'siNextdotjs' },
		{ name: 'Svelte', icon: 'siSvelte' },
		{ name: 'SvelteKit', icon: 'siSvelte' },
		{ name: 'Tauri', icon: 'siTauri' },
		{ name: 'Tailwind CSS', icon: 'siTailwindcss' },
		{ name: 'Vite', icon: 'siVite' },
		{ name: 'Bun', icon: 'siBun' },
		{ name: 'npm', icon: 'siNpm' },
		{ name: 'pnpm', icon: 'siPnpm' },
		{ name: 'Playwright', icon: 'siPlaywright' },
		{ name: 'Docker', icon: 'siDocker' },
		{ name: 'Git', icon: 'siGit' },
		{ name: 'SQLite', icon: 'siSqlite' },
		{ name: 'Supabase', icon: 'siSupabase' },
		{ name: 'MongoDB', icon: 'siMongodb' },
		{ name: 'Prisma', icon: 'siPrisma' },
		{ name: 'Rust', icon: 'siRust' },
		{ name: 'Arduino', icon: 'siArduino' }
	];

	function getIcon(key: string): { path: string; hex: string } | null {
		const icon = (si as Record<string, { path: string; hex: string }>)[key];
		return icon ?? null;
	}
</script>

<div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
	{#each techs as tech}
		{@const icon = getIcon(tech.icon)}
		<div
			class="bg-surface0 hover:bg-surface1 flex flex-col items-center gap-1.5 rounded-lg p-3 transition-colors"
			title={tech.name}
		>
			{#if icon}
				<svg width="28" height="28" viewBox="0 0 24 24" fill="none">
					<path d={icon.path} fill={`#${icon.hex}`} />
				</svg>
			{/if}
			<span class="text-subtext1 text-center text-[10px] leading-tight font-medium"
				>{tech.name}</span
			>
		</div>
	{/each}
</div>
