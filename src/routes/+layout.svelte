<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Mode Watcher to handle theme changes -->
<ModeWatcher />

<!-- Navigation Menu -->
<Navbar />

<!-- Main Content -->
{@render children?.()}
