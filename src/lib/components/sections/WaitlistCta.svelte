<script lang="ts">
	import { finalCta } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
	import EmailCapture, { type WaitlistResult } from '$lib/components/ui/EmailCapture.svelte';

	let { form = null }: { form?: WaitlistResult | null } = $props();
</script>

<section
	data-section="cta"
	class="relative isolate overflow-hidden bg-amber lg:min-h-[min(43.86vw,625px)]"
>
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
		class="pointer-events-none absolute top-[-20.6vw] left-0 -z-10 w-screen max-w-none"
	/>

	<!-- On narrow viewports the band is short and the tools crowd the copy. -->
	<div
		class="pointer-events-none absolute inset-0 -z-10 bg-amber/80 md:hidden"
		aria-hidden="true"
	></div>

	<div class="container-page w-full py-20 text-center lg:pt-[min(11.58vw,165px)] lg:pb-16">
		<h2 class="text-h2 mx-auto max-w-[70rem] font-light text-ink">
			{#each finalCta.heading as line, i (i)}
				<span class="block"><RichText segments={line} /></span>
			{/each}
		</h2>

		<p class="mt-5 text-[17px] text-ink/80">{finalCta.subhead}</p>

		<EmailCapture source="cta" tone="light" {form} class="mx-auto mt-8 max-w-[560px] text-left" />
	</div>
</section>
