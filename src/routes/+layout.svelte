<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import ScrollToTop from '$lib/components/ui/ScrollToTop.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/brand/logo-mark.png" />
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50
	       focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
>
	Skip to content
</a>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main id="main" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>

<ScrollToTop />
