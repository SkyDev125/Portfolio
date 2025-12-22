<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import StarfieldBackground from '$lib/components/ui/background/background.svelte';
	import Footer from '$lib/components/ui/footer/footer.svelte';
	import { Toaster } from 'svelte-sonner';
	import { onMount, onDestroy } from 'svelte';
	import {
		themeMode,
		loadThemeMode,
		initSkyMode,
		cleanupSkyMode,
		skyColors,
		applyTheme
	} from '$lib/stores/sky-theme';

	let { children } = $props();

	// Initialize theme on mount
	onMount(() => {
		const savedMode = loadThemeMode();
		themeMode.set(savedMode);

		if (savedMode === 'sky') {
			initSkyMode();
		}
	});

	onDestroy(() => {
		cleanupSkyMode();
	});

	// React to sky color changes when in sky mode
	$effect(() => {
		if ($themeMode === 'sky') {
			applyTheme('sky', $skyColors.isDark, $skyColors.solidColor);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Animated Background -->
<StarfieldBackground />

<!-- Mode Watcher to handle theme changes (only when not in sky mode) -->
{#if $themeMode !== 'sky'}
	<ModeWatcher defaultMode="dark" />
{/if}

<!-- Layout -->
<div class="relative z-0 flex min-h-screen flex-col">
	<!-- Navigation Menu -->
	<header class="sticky top-0 z-50">
		<Navbar />
	</header>

	<!-- Main Content grows to fill available space -->
	<main class="flex-1">
		{@render children?.()}
	</main>

	<!-- Footer stays at the bottom -->
	<footer class="mt-auto">
		<Footer />
	</footer>
</div>

<Toaster />
