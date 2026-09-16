<script lang="ts">
	import { finalCta } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
	import EmailCapture, { type WaitlistResult } from '$lib/components/ui/EmailCapture.svelte';

	let {
		form = null,
		data = finalCta,
		name = 'cta',
		source = 'cta',
		connector = false
	}: {
		form?: WaitlistResult | null;
		/** The client half closes with the same panel and its own headline. */
		data?: typeof finalCta;
		name?: string;
		source?: string;
		/** Draws the rule that hangs off the submit button and runs out to the
		 *  left screen edge. Opt-in: only the client panel shows it in the design
		 *  I have — the provider frame has not been checked. */
		connector?: boolean;
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

	<!-- On narrow viewports the band is short and the tools crowd the copy. -->
	<div
		class="pointer-events-none absolute inset-0 -z-10 bg-amber/80 md:hidden"
		aria-hidden="true"
	></div>

	{#if connector}
		<!-- The rule hanging off the submit button: a knob at the button's base, a
		     drop, then a turn out to the left screen edge. Measured on the design
		     crop and scaled by the button (128 crop px against 134.9 here, so
		     0.949); in section coordinates at 1425x625 that gives

		       knob        ~12px, centred x933, top on the button's base at y408
		       drop        3px at x933, y419..473
		       horizontal  3px at y473, running left from x933 to x710
		       fall        3px at x710, from y473 to the section's base

		     The run turns down at x710 and leaves through the bottom edge — it does
		     not carry on to the left edge, which is what an earlier reading of the
		     crop had it doing.

		     The knob sits ~8px right of the button's centre, which is what the
		     design shows rather than a true centre. Percentages of the section, so
		     the run holds as the panel scales. -->
		<span
			class="pointer-events-none absolute top-[65.12%] left-[65.05%] hidden h-[1.92%] w-[0.842%] rounded-full bg-ink lg:block"
			aria-hidden="true"
		></span>
		<span
			class="pointer-events-none absolute top-[67.04%] left-[65.37%] hidden h-[8.64%] w-[3px] bg-ink lg:block"
			aria-hidden="true"
		></span>
		<span
			class="pointer-events-none absolute top-[75.68%] right-[34.53%] left-[49.82%] hidden h-[3px] bg-ink lg:block"
			aria-hidden="true"
		></span>
		<span
			class="pointer-events-none absolute top-[75.68%] bottom-0 left-[49.75%] hidden w-[3px] bg-ink lg:block"
			aria-hidden="true"
		></span>
	{/if}

	<div class="container-page w-full py-20 text-center lg:pt-[min(11.58vw,165px)] lg:pb-16">
		<h2 class="text-h2 mx-auto max-w-[70rem] font-light text-ink">
			{#each data.heading as line, i (i)}
				<span class="block"><RichText segments={line} /></span>
			{/each}
		</h2>

		<p class="mt-5 text-[17px] text-ink/80">{data.subhead}</p>

		<EmailCapture {source} tone="light" {form} class="mx-auto mt-8 max-w-[560px] text-left" />
	</div>
</section>
