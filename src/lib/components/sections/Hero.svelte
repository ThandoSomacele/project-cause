<script lang="ts">
	import { hero } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import EmailCapture, { type WaitlistResult } from '$lib/components/ui/EmailCapture.svelte';

	let { form = null }: { form?: WaitlistResult | null } = $props();
</script>

<section data-section="hero" class="relative isolate overflow-hidden bg-ink text-white lg:min-h-[759px]">
	<!-- The design's backdrop is a mottled navy with soft circular washes.
	     Two radial gradients read the same at a fraction of the weight. -->
	<div
		class="hero-backdrop pointer-events-none absolute inset-0 -z-10"
		aria-hidden="true"
	></div>

	<div class="container-wide relative">
		<div class="relative z-10 max-w-[780px] pt-10 pb-12 lg:pt-[54px] lg:pb-24">
			<h1 class="text-hero font-light">
				{#each hero.headline as line, i (i)}
					<span class="block"><RichText segments={line} /></span>
				{/each}
			</h1>

			<p class="mt-10 text-[17px] leading-relaxed text-white/85 lg:mt-28">{hero.subhead}</p>

			<ul class="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
				{#each hero.chips as chip (chip.label)}
					<li class="flex items-center gap-2.5 text-[15px] text-white/90">
						<Icon name={chip.icon} class="h-5 w-5" width={20} height={20} />
						{chip.label}
					</li>
				{/each}
			</ul>

			<div id="waitlist" class="mt-7 max-w-[630px] scroll-mt-24">
				<EmailCapture source="hero" tone="dark" {form} />
			</div>
		</div>
		<!-- Device cluster. Absolute on large screens so the headline can run past
		     the column edge into it, the way it does in the design. Percentages
		     come from measuring the 1:1 Figma render. -->
		<div
			class="relative -mx-5 mt-4 md:-mx-8
			       lg:absolute lg:-top-6 lg:-right-[46px] lg:mx-0 lg:mt-0 lg:w-[717px]"
		>
			<div class="relative mx-auto aspect-[420/560] w-full max-w-[340px] sm:max-w-[380px] lg:aspect-[700/783] lg:max-w-none">
				<!-- Positioned so the bracket's arrowhead lands on the "t" of
				     "connects", as in the design. All percentages of the cluster box,
				     so the relationship holds as the hero scales. -->
				<img
					src="/icons/hero-frame.svg"
					alt=""
					aria-hidden="true"
					class="absolute top-[7%] left-[5.8%] hidden w-[93.4%] lg:block"
				/>
				<!-- The bracket exits its own artwork at 65.5% of the cluster height.
				     This continues that stroke to beyond the viewport so the line runs
				     off-screen instead of stopping in open canvas on wide displays. -->
				<span
					class="pointer-events-none absolute top-[65.5%] left-[96.4%] right-[-100vw] hidden h-[3px] bg-accent lg:block"
					aria-hidden="true"
				></span>
				<img
					src="/images/phone-profile.webp"
					alt=""
					aria-hidden="true"
					width="277"
					height="700"
					class="absolute top-[22.7%] left-[19.7%] hidden w-[23.1%] lg:block"
				/>
				<img
					src="/images/phone-results.webp"
					alt=""
					aria-hidden="true"
					width="274"
					height="700"
					class="absolute top-[21.1%] left-[69.3%] hidden w-[26.1%] lg:block"
				/>
				<img
					src="/images/phone-search.webp"
					alt="The Cause app, showing the screen for finding a service provider"
					width="347"
					height="700"
					fetchpriority="high"
					class="absolute top-[6%] left-1/2 w-[58%] -translate-x-1/2 lg:top-[10.9%] lg:left-[35.7%] lg:w-[40.7%] lg:translate-x-0"
				/>
				<!-- Mirrored: the exported artwork carries the pole on its right, but
				     the design places the pole on the mascot's left (measured at x753-764
				     against the 1:1 render). Unmirrored, the pole lands at x~1019 and is
				     hidden behind the phones. -->
				<img
					src="/images/mascot-pole.svg"
					alt=""
					aria-hidden="true"
					class="absolute top-[41.9%] left-[2.43%] hidden w-[41.8%] -scale-x-100 lg:block"
				/>
			</div>
		</div>

	</div>

	<!-- Mint rule closing the hero (Figma "Vector 24"): 5px, inset ~2.2% each
	     side, sitting on the section's bottom edge. -->
	<span
		class="pointer-events-none absolute right-[2.3%] bottom-0 left-[2.2%] h-[5px] bg-mint"
		aria-hidden="true"
	></span>
</section>
