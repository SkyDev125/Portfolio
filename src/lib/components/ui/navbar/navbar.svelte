<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { resetMode, setMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { resolve } from '$app/paths';
</script>

<nav
	class="sticky top-2 z-50 mx-2 my-2 flex justify-end rounded-2xl border-b border-white/20 bg-white/60 p-2 shadow-sm backdrop-blur-[2px] dark:border-black/30 dark:bg-black/40"
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
			<NavigationMenu.Item>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
						<SunIcon
							class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! duration-200 dark:scale-0 dark:-rotate-90"
						/>
						<MoonIcon
							class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! duration-200 dark:scale-100 dark:rotate-0"
						/>
						<span class="sr-only">Toggle theme</span>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Item onclick={() => setMode('light')}>Light</DropdownMenu.Item>
						<DropdownMenu.Item onclick={() => setMode('dark')}>Dark</DropdownMenu.Item>
						<DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</nav>
