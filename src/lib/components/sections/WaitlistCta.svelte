<script lang="ts">
	import { finalCta } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
	import EmailCapture, { type WaitlistResult } from '$lib/components/ui/EmailCapture.svelte';

	let {
		form = null,
		data = finalCta,
		name = 'cta',
		source = 'cta',
		placeholder = undefined
	}: {
		form?: WaitlistResult | null;
		/** The client half closes with the same panel and its own headline. */
		data?: typeof finalCta;
		name?: string;
		source?: string;
		/** Example address in the field; the two panels' frames differ. */
		placeholder?: string;
	} = $props();
</script>

<section
	data-section={name}
	class="relative isolate overflow-hidden bg-amber lg:min-h-[min(43.86vw,625px)]"
>
	<!-- Watermark discs and rings on the amber, behind the tools. Geometry read
	     off the design at 1425: a disc centred (956, 709) r278 rising from below
	     the fold, one anchored to the lower-left corner, and two ring sweeps.
	     Expressed in vw so the shapes scale with the full-bleed field. -->
	<div class="cta-watermark pointer-events-none absolute inset-0 -z-20" aria-hidden="true"></div>

	<!-- The tools artwork rings a clear centre. The design offsets it so only the
	     band of tools sits along this section's top edge, leaving the rest clear
	     amber for the copy — the same placement used under the hero. Anchored at
	     its natural aspect rather than object-cover, which scaled it up and put
	     the hardware straight over the headline. -->
	<img
		src="/images/tools-flatlay.webp"
		alt=""
		aria-hidden="true"
		width="2200"
		height="1020"
		loading="lazy"
		class="pointer-events-none absolute top-[-23.6vw] left-0 -z-10 w-screen max-w-none"
	/>

	<div class="container-page w-full py-20 text-center lg:pt-[min(11.58vw,165px)] lg:pb-16">
		<h2 class="text-h2 mx-auto max-w-[70rem] font-normal text-ink">
			{#each data.heading as line, i (i)}
				<span class="block"><RichText segments={line} /></span>
			{/each}
		</h2>

		<p class="mt-5 text-[17px] text-ink/80">{data.subhead}</p>

		<EmailCapture {source} tone="light" {form} {placeholder} class="mx-auto mt-8 max-w-[648px] text-left" />
	</div>
</section>
