<script lang="ts">
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import WavesIcon from '@lucide/svelte/icons/waves';
	import { resolve } from '$app/paths';
	import { LINKS, NAVS } from '$lib/config/blog';
	import { Button } from '@/components/ui/button';
	import { toggleMode } from 'mode-watcher';
</script>

<nav class="sticky top-4 mx-6 shadow-lg">
	<div class="flex flex-row justify-between rounded bg-slate-300 p-4 dark:bg-slate-700">
		<ul class="flex max-w-[530px] flex-row items-center gap-x-1 overflow-auto font-oswald tracking-wide">
			{#each NAVS as nav}
				{#if nav.active}
					<li>
						<a
							href={resolve(nav.path as any)}
							class="0 block rounded-lg px-2.5 leading-10 break-keep hover:bg-foreground hover:text-background"
						>
							{nav.nav}
						</a>
					</li>
				{/if}
			{/each}
		</ul>

		<div>
			<Button href={resolve(LINKS.internal.wave as any)} size="icon" target="_blank">
				<WavesIcon />
			</Button>
			<Button onclick={toggleMode} size="icon">
				<SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>
	</div>
</nav>
