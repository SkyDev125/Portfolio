<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import StarfieldBackground from '$lib/components/ui/background/background.svelte';
	import Footer from '$lib/components/ui/footer/footer.svelte';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Animated Background -->
<StarfieldBackground />

<!-- Mode Watcher to handle theme changes -->
<ModeWatcher />

<!-- Layout -->
<div class="flex min-h-screen flex-col">
	<!-- Navigation Menu -->
	<header>
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
