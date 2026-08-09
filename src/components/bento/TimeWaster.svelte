<script lang="ts">
	import { IconCoffee } from '@tabler/icons-svelte';
</script>

<div
	class="border-surface0 bg-base flex flex-col items-center justify-center rounded-xl border p-6 shadow-lg"
>
	<IconCoffee size={32} class="text-accent mb-3" />
	<p class="text-subtext0 mb-4 text-center text-sm">
		If you like what I do, consider buying me a coffee!
	</p>
	<a
		href="https://buymeacoffee.com/danieliaco4"
		target="_blank"
		rel="noopener noreferrer"
		class="bg-accent hover:bg-accent/90 rounded-xl px-6 py-3 text-base font-bold transition-all duration-150 hover:scale-105 active:scale-95"
	>
		Buy me a coffee
	</a>
</div>
