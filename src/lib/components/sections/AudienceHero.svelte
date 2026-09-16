<script lang="ts">
	import EmailCapture, { type WaitlistResult } from '$lib/components/ui/EmailCapture.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import RichText from '$lib/components/ui/RichText.svelte';
	import type { Line } from '$lib/types';

	interface Chip {
		label: string;
		icon: string;
	}

	interface Props {
		/** Value for data-section, and the anchor id when one is given. */
		name: string;
		id?: string;
		heading: readonly Line[];
		/** One entry per rendered line. The hero runs a single line, the client
		 *  section three. */
		body: readonly string[];
		chips: readonly Chip[];
		/** Distinguishes this waitlist form's result, and namespaces its ids. */
		source: string;
		form?: WaitlistResult | null;
		/** Mascot artwork; both variants carry the pole on the mascot's left. */
		mascot?: string;
		/**
		 * Top margin on the body block. The two variants anchor it differently:
		 * the hero's single line and the client section's third line both finish
		 * just above the chips, so the block's start moves with its line count.
		 */
		bodyGap?: string;
		/** Extra classes on the waitlist wrapper — the hero carries #waitlist. */
		waitlistId?: string;
	}

	let {
		name,
		id,
		heading,
		body,
		chips,
		source,
		form = null,
		mascot = '/images/mascot-pole.svg',
		bodyGap = 'lg:mt-[min(7.228vw,103px)]',
		waitlistId
	}: Props = $props();
</script>

<!--
	The shared audience hero. The service-provider hero and the client section are
	the same composition in the Figma file — same 759px body under the 84px
	navbar, same bracket rail at y113, same three device mockups, same mascot and
	pole, same mint rule inset 1.96%/2.18% at the base — differing only in copy,
	chips and mascot pose. Building them from one component is what keeps them
	uniform; every measurement below was taken off the 1:1 render of the hero and
	verified against the client section's screenshot.
-->
<section
	data-section={name}
	{id}
	class={[
		'relative isolate overflow-hidden bg-ink text-white lg:min-h-[min(calc(57.1vw-11px),759px)]',
		id && 'scroll-mt-[84px]'
	]}
>
	<!-- The design's backdrop is a mottled navy with soft circular washes.
	     Two radial gradients read the same at a fraction of the weight. -->
	<div class="hero-backdrop pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>

	<div class="container-wide relative">
		<div class="relative z-10 max-w-[780px] pt-10 pb-12 lg:pt-[min(3.79vw,54px)] lg:pb-24">
			<!-- Light, and it must stay Light. The design's stems measure a shade
			     heavier than Inter Light, which tempts a bump to Regular — but the
			     design's face carries that weight on the SAME advance widths, so
			     Regular pushes every glyph right: the "d" of "leads" lands 12.7px
			     off and the pole no longer runs through it. Measured at 1425, the
			     d/s centres sit at 52.647/55.752% here against the design's
			     52.596/55.754%. Alignment follows advance width, not stem weight. -->
			<h2 class="text-hero font-light">
				{#each heading as line, i (i)}
					<span class="block"><RichText segments={line} /></span>
				{/each}
			</h2>

			<p class={['mt-10 text-[17px] leading-relaxed text-white/85', bodyGap]}>
				{#each body as line (line)}
					<span class="block">{line}</span>
				{/each}
			</p>

			<ul class="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 lg:mt-[min(0.842vw,12px)]">
				{#each chips as chip (chip.label)}
					<li class="flex items-center gap-2.5 text-[15px] text-white/90">
						<Icon name={chip.icon} class="h-5 w-5" width={20} height={20} />
						{chip.label}
					</li>
				{/each}
			</ul>

			<div
				id={waitlistId}
				class="mt-7 max-w-[630px] scroll-mt-24 lg:mt-[min(2.456vw,35px)]"
			>
				<EmailCapture {source} tone="dark" {form} />
			</div>
		</div>

		<!-- Device cluster. Absolute on large screens so the headline can run past
		     the column edge into it, the way it does in the design. Percentages
		     come from measuring the 1:1 Figma render. -->
		<div
			class="relative -mx-5 mt-4 md:-mx-8
			       lg:absolute lg:-top-6 lg:-right-[min(3.23vw,46px)] lg:mx-0 lg:mt-0 lg:w-[min(50.32vw,717px)]"
		>
			<div
				class="relative mx-auto aspect-[420/560] w-full max-w-[340px] sm:max-w-[380px] lg:aspect-[700/783] lg:max-w-none"
			>
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
				<!-- The bracket's horizontal exit stops at the artwork's own edge. It
				     used to carry a `-100vw` continuation so the stroke ran off-screen,
				     but the design turns the line down into the frame's right vertical
				     instead of bleeding: measured on the reference, the horizontal ends
				     at x2511 and the vertical picks up at x2522, with navy continuing
				     ~79px past it to the viewport edge. The continuation was the thin
				     orange line still showing to the right of the phones. -->
				<!-- The three mockups move as one unit: the wrapper fills the cluster
				     box, so every child's percentage still resolves against the same
				     rectangle it did before, and the group shifts together. 2.789% of
				     the cluster is 20px at the 1425 design width, so the leftward nudge scales
				     with everything else instead of drifting at other breakpoints. -->
				<div class="absolute inset-0 lg:-translate-x-[2.789%]">
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
				</div>
				<!-- Mirrored: the exported artwork carries the pole on its right, but
				     the design places it on the mascot's left. The pipe runs its own
				     axis, 3px left of the bracket's — it centres 8.5px right of the
				     "d" ink centre at 1425, which is what puts it through the letter's
				     stem. Unmirrored the pole lands at x~1019, behind the phones. -->
				<img
					src={mascot}
					alt=""
					aria-hidden="true"
					class="absolute top-[42.5%] left-[1.94%] hidden w-[41.8%] -scale-x-100 lg:block"
				/>
			</div>
		</div>
	</div>

	<!-- Mint rule closing the section (Figma "Vector 24"): 5px, inset ~2% each
	     side, sitting on the bottom edge. Measured at x28..1394 of 1425 on both
	     the hero and the client section. -->
	<span
		class="pointer-events-none absolute right-[2.18%] bottom-0 left-[1.96%] h-[5px] bg-mint"
		aria-hidden="true"
	></span>
</section>
