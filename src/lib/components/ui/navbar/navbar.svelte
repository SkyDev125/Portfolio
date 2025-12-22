<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunriseIcon from '@lucide/svelte/icons/sunrise';
	import { resetMode, setMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { resolve } from '$app/paths';
	import {
		themeMode,
		saveThemeMode,
		applyTheme,
		initSkyMode,
		skyColors,
		type ThemeMode
	} from '$lib/stores/sky-theme';

	function setTheme(mode: ThemeMode) {
		themeMode.set(mode);
		saveThemeMode(mode);

		if (mode === 'sky') {
			initSkyMode();
			applyTheme(mode, $skyColors.isDark, $skyColors.solidColor);
		} else {
			// Clean up sky mode's custom --background variable
			applyTheme(mode);
			// Use mode-watcher for light/dark/system
			if (mode === 'light') {
				setMode('light');
			} else if (mode === 'dark') {
				setMode('dark');
			} else if (mode === 'system') {
				resetMode();
			}
		}
	}
</script>

<nav
	class="mx-2 my-2 flex items-center justify-between rounded-2xl border-b border-white/20 bg-white/60 p-2 shadow-sm backdrop-blur-[2px] dark:border-black/30 dark:bg-black/40"
>
	<NavigationMenu.Root>
		<NavigationMenu.List>
			<NavigationMenu.Item>
				<NavigationMenu.Link>
					{#snippet child()}
						<a href={resolve('/')} class={navigationMenuTriggerStyle()}>Home</a>
					{/snippet}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Link>
					{#snippet child()}
						<a href={resolve('/about')} class={navigationMenuTriggerStyle()}>About</a>
					{/snippet}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Link>
					{#snippet child()}
						<a href={resolve('/projects')} class={navigationMenuTriggerStyle()}>Projects</a>
					{/snippet}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Link>
					{#snippet child()}
						<a href={resolve('/contact')} class={navigationMenuTriggerStyle()}>Contact</a>
					{/snippet}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
			{#if $themeMode === 'sky'}
				<SunriseIcon class="h-[1.2rem] w-[1.2rem] transition-all! duration-200" />
			{:else}
				<SunIcon
					class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! duration-200 dark:scale-0 dark:-rotate-90"
				/>
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! duration-200 dark:scale-100 dark:rotate-0"
				/>
			{/if}
			<span class="sr-only">Toggle theme</span>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Item onclick={() => setTheme('light')}>Light</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => setTheme('dark')}>Dark</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => setTheme('system')}>System</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item onclick={() => setTheme('sky')}>
				<SunriseIcon class="mr-2 h-4 w-4" />
				Time-Based
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</nav>
