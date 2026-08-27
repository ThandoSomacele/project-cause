<script lang="ts">
	import { finalCta } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
	import EmailCapture, { type WaitlistResult } from '$lib/components/ui/EmailCapture.svelte';

	let { form = null }: { form?: WaitlistResult | null } = $props();
</script>

<!-- The tools artwork puts its hardware along the top edge and sides, leaving the
     lower half clear. Showing it at its natural 2.157:1 aspect and seating the
     copy in that clear band keeps the text legible; centring it instead lands
     the headline straight on the tape roll and hammer. -->
<section
	data-section="cta"
	class="relative isolate flex items-end overflow-hidden bg-amber lg:min-h-[660px]"
>
	<!-- Tools sit on a transparent ground in the source art, so the amber comes
	     from the section itself. -->
	<img
		src="/images/tools-flatlay.webp"
		alt=""
		aria-hidden="true"
		width="2200"
		height="1020"
		loading="lazy"
		class="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
	/>

	<!-- The art is laid out for a wide band. On narrow viewports object-cover
	     zooms into the middle of it and the tools swamp the copy, so soften the
	     ground behind the text until there is room for the full composition. -->
	<div class="pointer-events-none absolute inset-0 -z-10 bg-amber/80 md:hidden" aria-hidden="true"></div>

	<div class="container-page w-full py-20 text-center lg:pt-0 lg:pb-16">
		<h2 class="text-h2 mx-auto max-w-[70rem] font-light text-ink">
			{#each finalCta.heading as line, i (i)}
				<span class="block"><RichText segments={line} /></span>
			{/each}
		</h2>

		<p class="mt-5 text-[17px] text-ink/80">{finalCta.subhead}</p>

		<EmailCapture source="cta" tone="light" {form} class="mx-auto mt-8 max-w-[560px] text-left" />
	</div>
</section>
