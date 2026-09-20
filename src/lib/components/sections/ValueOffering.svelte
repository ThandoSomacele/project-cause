<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import RichText from '$lib/components/ui/RichText.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import { valueOffering } from '$lib/data/content';

	const images: Record<string, string> = {
		credits: '/images/tab-credits.webp',
		jobs: '/images/tab-jobs.webp',
		support: '/images/tab-support.webp'
	};
</script>

<section data-section="value" class="relative overflow-hidden bg-white pt-[15.44vw] pb-0">
	<!-- The tools artwork spans the page behind the hero and only its lower band
	     shows here. 100vw wide at its natural 2.157:1, offset so its top lands
	     where the design places it (y549) while this section starts at y843 —
	     the hero covers the rest. Everything in vw so the band scales. -->
	<img
		src="/images/tools-flatlay.webp"
		alt=""
		aria-hidden="true"
		width="2200"
		height="1020"
		class="pointer-events-none absolute top-[-20.6vw] left-1/2 w-screen max-w-none -translate-x-1/2"
	/>
	<div class="container-page relative z-10">
		<!-- Decorative rules that run off-canvas in the design. Large screens only:
		     below that they collide with the wrapped heading. -->
		<!-- Decorative rules either side of the heading, matching the design: a
		     navy rule running in from the left screen edge and ending in a 10px
		     dot, and an orange one starting at a 16px dot directly beneath the
		     icon and running out past the right edge. The two dots are different
		     sizes in the design — measured at 10px and 16px on the 1:1 render. -->
		<!-- The navy rule runs from the left screen edge to its dot, and sits on
		     the baseline of the heading's second line, which is where the design
		     puts it — measured off the screenshot, where the rule's lower edge
		     meets the bottom of "To Reach New Clients".

		     The top is derived from the heading rather than guessed in vw. For a
		     line box of `line-height` L and a font whose ascent/descent give a
		     content area of 1.21em, the second baseline sits at

		       L + (L - 1.21em)/2 + 0.9688em  =  1.9088em   (L = 1.03em here)

		     so the rule's top is that baseline less its own 2px. Because it reads
		     the same token the heading does, the rule tracks it through the clamp
		     at every width instead of drifting.

		     This heading runs 1.098x the token on a 1.275 leading, so its second
		     baseline lands at 2.5 x --text-h2 rather than the 1.9088 the token's
		     own 1.03 would put it at. -->
		<div
			class="pointer-events-none absolute top-[calc(2.5*var(--text-h2)_-_2px)] right-[74.4%] left-[-50vw] hidden h-[2px] bg-ink md:block"
			aria-hidden="true"
		>
			<span class="absolute -top-[4px] -right-[3px] h-[10px] w-[10px] rounded-full bg-ink"></span>
		</div>

		<!-- The same crew mark the process section closes on, off the same trace —
		     this used to carry its own, older copy of the artwork, whose heads and
		     stroke weights did not match it or the frame. Anchored the way that
		     one is: the mark's base on the heading's third baseline, which lands
		     at 3.9 x --text-h2, and the rule 10.6px under it. -->
		<img
			src="/icons/process-crew.svg"
			alt=""
			aria-hidden="true"
			width="100"
			height="101"
			class="pointer-events-none absolute top-[calc(2.811*var(--text-h2))] left-[83.2%] hidden h-[calc(1.089*var(--text-h2))] w-auto lg:block"
		/>

		<div
			class="pointer-events-none absolute top-[calc(4.089*var(--text-h2)_-_1px)] right-[-50vw] left-[83.6%] hidden h-[2px] bg-accent md:block"
			aria-hidden="true"
		>
			<span class="absolute -top-[7px] left-0 h-4 w-4 rounded-full bg-accent"></span>
		</div>

		<!-- This frame sets its heading larger and much looser than the shared
		     token: the three lines fit 61.5px rather than 56 — each of them
		     independently, and the indents confirm the scale — on a 78.4px pitch,
		     which is 1.275 against the token's 1.03. Expressed against the token
		     so it keeps the same clamp on the way down; the tracking comes with
		     it, since overriding the size drops what the token carried. -->
		<SectionHeading
			lines={valueOffering.heading}
			weight="font-normal"
			size="text-[calc(1.098*var(--text-h2))] tracking-[-0.02em]"
			leading="leading-[1.275]"
			indents={['lg:pl-[0.6%]', 'lg:pl-[26.3%]', 'lg:pl-[51.4%]']}
			flow
		/>

		<div class="mt-12 lg:mt-16">
			<Tabs tabs={valueOffering.tabs} label="What Cause gives you">
				{#snippet panel(id)}
					{@const tab = valueOffering.tabs.find((t) => t.id === id)!}
					<!-- From `lg` the amber panel bleeds off the right screen edge while
					     its contents stay put. `calc(50% - 50vw)` is exactly the
					     container's side offset — the padding cancels, since 50% of the
					     content box is W/2 - pad and the offset is 50vw - W/2 + pad — so
					     the margin lands the edge on the viewport at any width. The same
					     distance goes back on as inline-end padding, and the right
					     corners square off because a radius sitting on the screen edge
					     reads as a notch. -->
					<div
						class="mt-6 grid gap-8 rounded-[24px] bg-amber p-6 sm:p-10
						       lg:grid-cols-[43.6%_1fr] lg:gap-x-[6.6%] lg:rounded-r-none lg:p-[min(5.61vw,80px)]
						       lg:me-[calc(50%_-_50vw)] lg:pe-[calc(50vw_-_50%_+_min(5.61vw,80px))]"
					>
						<img
							src={images[id]}
							alt=""
							width="600"
							height="580"
							loading="lazy"
							class="aspect-[560/558] w-full rounded-2xl object-cover"
						/>

						<!-- From `lg` the copy and the CTA sit space-around in the column rather
						     than the CTA being pinned to the bottom. The 40% gap resolves
						     against the column height, which the image sets, so it tracks the
						     card instead of being a fixed drop. -->
						<div class="flex flex-col lg:justify-around lg:gap-[8%]">
							<!-- Heading and body are one flex child so the column has a single
							     gap rather than two — at 8% of the column height the gap is modest, but two gaps
							     overrun the card. The column's height comes from the image
							     beside it, so the gap tracks the card rather than being a
							     fixed drop. -->
							<div>
								<h3 class="text-h3 font-normal text-ink">
									<RichText segments={tab.title} />
								</h3>
								<p class="mt-4 max-w-[460px] text-[15px] leading-7 text-ink/80">{tab.body}</p>
							</div>

							<div class="mt-8 flex flex-wrap items-center gap-6 lg:mt-0">
								<Button href="#waitlist" variant="dark">Join waitlist</Button>
							</div>
						</div>
					</div>
				{/snippet}
			</Tabs>
		</div>
	</div>
</section>
