<script lang="ts">
	import { site } from '$lib/data/site';
	import Hero from '$lib/components/sections/Hero.svelte';
	import ValueOffering from '$lib/components/sections/ValueOffering.svelte';
	import Comparison from '$lib/components/sections/Comparison.svelte';
	import GetPaid from '$lib/components/sections/GetPaid.svelte';
	import SubscriptionCard from '$lib/components/sections/SubscriptionCard.svelte';
	import ProductCarousel from '$lib/components/sections/ProductCarousel.svelte';
	import FeeCalculator from '$lib/components/sections/FeeCalculator.svelte';
	import WaitlistCta from '$lib/components/sections/WaitlistCta.svelte';
	import Faq from '$lib/components/sections/Faq.svelte';

	let { form } = $props();
</script>

<svelte:head>
	<title>{site.name} — {site.tagline}</title>
	<meta name="description" content={site.description} />
	<meta property="og:title" content="{site.name} — {site.tagline}" />
	<meta property="og:description" content={site.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<Hero {form} />
<ValueOffering />
<Comparison />
<GetPaid />
<SubscriptionCard />
<ProductCarousel />
<FeeCalculator />
<WaitlistCta {form} />
<Faq />
