<script lang="ts">
	import { clients } from '$lib/data/content';
	import AudienceHero from './AudienceHero.svelte';
	import type { WaitlistResult } from '$lib/components/ui/EmailCapture.svelte';

	let { form = null }: { form?: WaitlistResult | null } = $props();
</script>

<!-- The client side of the product, closing the page. Same composition as the
     service-provider hero; the body runs three lines rather than one, so its top
     margin is smaller — both variants finish just above the chips, which sit at
     the same y in the design (516 for the hero, 514 here). -->
<AudienceHero
	name="clients"
	id="clients"
	heading={clients.heading}
	body={clients.body}
	chips={clients.chips}
	source="clients"
	frame="/icons/hero-frame-clients.svg"
	bodyGap="lg:mt-[min(2.947vw,42px)]"
	{form}
/>
