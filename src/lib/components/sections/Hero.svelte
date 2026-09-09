<script lang="ts">
	import { hero } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import EmailCapture, { type WaitlistResult } from '$lib/components/ui/EmailCapture.svelte';

	let { form = null }: { form?: WaitlistResult | null } = $props();
</script>

<!-- The device cluster is absolutely positioned, so the section needs its own
     height. The Figma hero node measures 843 but sits at page y0 with the 84px
     navbar painted over its top, so the section's own height is 759. Measure
     against the full-page render, not the node export, or everything lands 84px
     low. That height tracks the cluster rather than the viewport: the cluster
     scales with the container, so a plain vw value drifts and overflows. -->
<section data-section="hero" class="relative isolate overflow-hidden bg-ink text-white lg:min-h-[min(calc(57.1vw-11px),759px)]">
	<!-- The design's backdrop is a mottled navy with soft circular washes.
	     Two radial gradients read the same at a fraction of the weight. -->
	<div
		class="hero-backdrop pointer-events-none absolute inset-0 -z-10"
		aria-hidden="true"
	></div>

	<div class="container-wide relative">
		<div class="relative z-10 max-w-[780px] pt-10 pb-12 lg:pt-[min(3.79vw,54px)] lg:pb-24">
			<!-- Light, and it must stay Light. The design's stems measure a shade
			     heavier than Inter Light, which tempts a bump to Regular — but the
			     design's face carries that weight on the SAME advance widths, so
			     Regular pushes every glyph right: the "d" of "leads" lands 12.7px
			     off and the pole no longer runs through it. Measured at 1425, the
			     d/s centres sit at 52.647/55.752% here against the design's
			     52.596/55.754%. Alignment follows advance width, not stem weight. -->
			<h1 class="text-hero font-light">
				{#each hero.headline as line, i (i)}
					<span class="block"><RichText segments={line} /></span>
				{/each}
			</h1>

			<p class="mt-10 text-[17px] leading-relaxed text-white/85 lg:mt-[min(7.228vw,103px)]">{hero.subhead}</p>

			<ul class="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 lg:mt-[min(0.842vw,12px)]">
				{#each hero.chips as chip (chip.label)}
					<li class="flex items-center gap-2.5 text-[15px] text-white/90">
						<Icon name={chip.icon} class="h-5 w-5" width={20} height={20} />
						{chip.label}
					</li>
				{/each}
			</ul>

			<div id="waitlist" class="mt-7 max-w-[630px] scroll-mt-24 lg:mt-[min(2.456vw,35px)]">
				<EmailCapture source="hero" tone="dark" {form} />
			</div>
		</div>
		<!-- Device cluster. Absolute on large screens so the headline can run past
		     the column edge into it, the way it does in the design. Percentages
		     come from measuring the 1:1 Figma render. -->
		<div
			class="relative -mx-5 mt-4 md:-mx-8
			       lg:absolute lg:-top-6 lg:-right-[min(3.23vw,46px)] lg:mx-0 lg:mt-0 lg:w-[min(50.32vw,717px)]"
		>
			<div class="relative mx-auto aspect-[420/560] w-full max-w-[340px] sm:max-w-[380px] lg:aspect-[700/783] lg:max-w-none">
				<!-- The bracket's vertical, its arrowhead and its terminating dot share
				     one axis in the design, and that axis is the exact ink centre of
				     the "t" of "connects" (x761 of 1425). Everything here is a
				     percentage of the cluster box, and the cluster is a percentage of
				     the viewport, so that axis holds at every width. -->
				<img
					src="/icons/hero-frame.svg"
					alt=""
					aria-hidden="true"
					class="absolute top-[6.75%] left-[5.8%] hidden w-[93.4%] lg:block"
				/>
				<!-- The bracket turns right and exits at SVG y457/730, which works out
				     to 63.56% of the cluster height, leaving the frame at its right
				     edge (5.8% + 93.4% = 99.2%). This continues that stroke past the
				     viewport so the line runs off-screen on displays wider than the
				     design, instead of stopping in open canvas. The vertical segment
				     itself keeps the design's 2.035%-of-width gap to the screen edge. -->
				<span
					class="pointer-events-none absolute top-[63.56%] left-[99.2%] right-[-100vw] hidden h-[3px] bg-accent lg:block"
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
				     the design places it on the mascot's left. The pipe runs its own
				     axis, 3px left of the bracket's — it centres 8.5px right of the
				     "d" ink centre at 1425, which is what puts it through the letter's
				     stem. Unmirrored the pole lands at x~1019, behind the phones. -->
				<img
					src="/images/mascot-pole.svg"
					alt=""
					aria-hidden="true"
					class="absolute top-[42.5%] left-[1.94%] hidden w-[41.8%] -scale-x-100 lg:block"
				/>
			</div>
		</div>

	</div>

	<!-- Mint rule closing the hero (Figma "Vector 24"): 5px, inset ~2.2% each
	     side, sitting on the section's bottom edge. -->
	<span
		class="pointer-events-none absolute right-[2.18%] bottom-0 left-[1.96%] h-[5px] bg-mint"
		aria-hidden="true"
	></span>
</section>
