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
		<!-- The supplied connector, used as-is rather than drawn from three spans:
		     308x197 with the knob at its top-right and the path dropping, turning
		     left and falling away. Anchored so the knob's top meets the submit
		     button's base — the knob centres 8.5px in from the asset's right edge,
		     which puts that edge at x941.5 of the 1425 frame, and its top at y408.
		     Percentages of the section, so it holds as the panel scales. -->
		<img
			src="/images/cta-connector.png"
			alt=""
			aria-hidden="true"
			width="308"
			height="197"
			loading="lazy"
			class="pointer-events-none absolute top-[65.28%] left-[44.46%] hidden w-[min(21.61vw,308px)] max-w-none lg:block"
		/>
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
