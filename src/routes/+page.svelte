<script lang="ts">
	import { site } from '$lib/data/site';
	import AudienceSelector from '$lib/components/sections/AudienceSelector.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import ValueOffering from '$lib/components/sections/ValueOffering.svelte';
	import Comparison from '$lib/components/sections/Comparison.svelte';
	import GetPaid from '$lib/components/sections/GetPaid.svelte';
	import SubscriptionCard from '$lib/components/sections/SubscriptionCard.svelte';
	import ProductCarousel from '$lib/components/sections/ProductCarousel.svelte';
	import FeeCalculator from '$lib/components/sections/FeeCalculator.svelte';
	import WaitlistCta from '$lib/components/sections/WaitlistCta.svelte';
	import Faq from '$lib/components/sections/Faq.svelte';
	import ClientsSection from '$lib/components/sections/ClientsSection.svelte';
	import ProcessSteps from '$lib/components/sections/ProcessSteps.svelte';
	import { clientComparison, clientBenefits, clientCta } from '$lib/data/content';
	import { clientFaq } from '$lib/data/faq';

	let { form } = $props();
</script>

<svelte:head>
	<title>{site.name} — {site.tagline}</title>
	<meta name="description" content={site.description} />
	<meta property="og:title" content="{site.name} — {site.tagline}" />
	<meta property="og:description" content={site.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<AudienceSelector />

<!-- Everything below is the service-provider side of the product. It is grouped
     under one id so the selector above and the primary nav can both jump
     straight to it without leaving the page. scroll-mt clears the 84px sticky
     navbar so the section's top edge is not hidden under it on arrival. -->
<div id="service-providers" class="scroll-mt-[84px]">
	<Hero {form} />
	<ValueOffering />
	<Comparison />
	<GetPaid />
	<SubscriptionCard />
	<ProductCarousel />
	<FeeCalculator />
	<WaitlistCta {form} />
	<Faq />
</div>

<!-- The client side of the product, closing the page. Carries its own id so the
     nav and the selector jump straight to it.

     It mirrors the provider half section for section, as the design does: the
     same Comparison, GetPaid, WaitlistCta and Faq components render again with
     client copy, which is what keeps the two halves visually identical. -->
<ClientsSection {form} />
<ProcessSteps />
<Comparison data={clientComparison} name="client-comparison" ruleAfter={1} />
<GetPaid data={clientBenefits} name="client-benefits" photo="/images/kitchen-consult.webp" />
<WaitlistCta
	{form}
	data={clientCta}
	name="client-cta"
	source="client-cta"
	placeholder={clientCta.placeholder}
/>
<Faq data={clientFaq} name="client-faq" />
