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
		/** One entry per rendered line, each a run of segments so a phrase inside
		 *  a line can carry its own weight — the client section bolds "3 steps".
		 *  The hero runs a single line, the client section three. */
		body: readonly Line[];
		chips: readonly Chip[];
		/** Distinguishes this waitlist form's result, and namespaces its ids. */
		source: string;
		form?: WaitlistResult | null;
		/** Mascot artwork; both variants carry the pole on the mascot's left. */
		mascot?: string;
		/**
		 * Bracket artwork. The two variants differ only in how far the rail runs
		 * before its pointer: the hero's stops between heading lines 1 and 2, the
		 * client section's one line lower, between 2 and 3, so it lands just above
		 * the ringed word. Both now clear the ink below them by 20px — they sat at
		 * 9px and 11px, close enough to the letterforms to read as touching them,
		 * and close enough to each other to look unintentional rather than equal.
		 */
		frame?: string;
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
		frame = '/icons/hero-frame.svg',
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
			<!-- Regular, not Light. This ran Light for a long time on the argument
			     that the design's face carries its extra weight on the SAME advance
			     widths, so matching advances mattered more than matching stems.
			     Measuring three sections settles it the other way: stem/x-height is
			     0.153 on the provider hero, 0.144 on the client section and 0.141 on
			     the final CTA, against 0.113 for Inter Light and 0.161 for Regular —
			     every one of them interpolates to ~384. Regular is the nearest step.
			     It does push every glyph right, so the frame's axis is re-measured
			     against the letterforms below rather than held at its old x. -->
			<!-- The design's line breaks are a desktop composition: at 390 the
			     column is narrow enough that line 2 and line 3 each wrap again, so
			     forcing the breaks as well turned one sentence into five ragged
			     rows. Below lg the lines run inline and the heading wraps where it
			     naturally falls. The separator is an explicit space rather than the
			     markup's own whitespace, which Svelte collapses away — without it
			     the heading read "The only platformthat simply". It costs nothing
			     at lg, where a trailing space in a block box is ignored. -->
			<h2 class="text-hero font-normal">
				{#each heading as line, i (i)}
					<span class="lg:block"
						><RichText segments={line} />{i < heading.length - 1 ? ' ' : ''}</span
					>
				{/each}
			</h2>

			<p class={['mt-10 text-[17px] leading-relaxed text-white/85', bodyGap]}>
				{#each body as line (line)}
					<span class="block"><RichText segments={line} /></span>
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
				<!-- The bracket's vertical, its arrowhead, the dot below the heading
				     and the short stem under that dot all share one axis. Sized off
				     the hero-wrapper export rather than from the heading's letterforms,
				     which is what the earlier "ink centre of the t of connects" note
				     was doing and why this sat 36px right: measured at a 1354-wide
				     hero, the export puts the left axis at x690 and the right rail at
				     x1326, and the build had them at x726 and x1325. Holding the right
				     rail and widening to match moves the left axis onto x690 and, on
				     the same 6.1%, drops the arrowhead's base from y124 onto the
				     export's y130 - one scale correcting both, which is what says the
				     frame was undersized rather than mispositioned.

				     The dot (16px at y283.5) and its 3px stem (y292..y316) live in the
				     SVG, not in the markup, so they inherit that axis for free instead
				     of needing their own percentages to track it. -->
				<img
					src={frame}
					alt=""
					aria-hidden="true"
					class="absolute top-[6.75%] left-[0.364%] hidden w-[99.09%] lg:block"
				/>
				<!-- The bracket's exit runs off the right edge of the screen. The
				     artwork's own stub stops at x673.16 of its 674.66 viewBox, which
				     lands on the viewport edge only while the container is at its
				     94.456vw cap; past ~1425 the container stops growing and the stub
				     ends well inside the navy, which is what this continues.

				     Anchored to the cluster box, not the viewport: 99.23% of it is
				     where the stub's own end falls, and 68.99% down is the stub's
				     centre line — the artwork sits at top 6.75% and keeps its natural
				     674.66:730 aspect, so the stub's 474/730 lands there. The section
				     clips it, so -50vw simply means "past the edge". An earlier version
				     of this ran off the TOP horizontal instead, which is why a stray
				     orange line used to show beside the phones. -->
				<span
					class="pointer-events-none absolute top-[68.99%] right-[-50vw] left-[99.23%] hidden h-[3px] -translate-y-1/2 bg-accent lg:block"
					aria-hidden="true"
				></span>
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
				<!-- Placed off the hero-wrapper export by isolating the pole as its own
				     connected orange region. Scanned row by row in a narrow band, the
				     export's pole starts at y320 on axis x686.75; the build's started
				     at y349 on x683.75. Widths agree at 12-13px, so this is a straight
				     +3px, -29px move and not a scale, which through the cluster box is
				     left -3.33%, top 44.575%.

				     The -29px is what closes the gap under the dot: the pole has to
				     meet the stem the frame now draws, and at the old top the two were
				     a third of the dot's height apart.

				     Measuring the pole as a region rather than scanning for rules is
				     what makes this reliable: earlier passes kept locking onto the
				     waitlist input's border instead.

				     Mirrored: the exported artwork carries the pole on its right, but
				     the design places it on the mascot's left. The pipe runs its own
				     axis, 3px left of the bracket's — it centres 8.5px right of the
				     "d" ink centre at 1425, which is what puts it through the letter's
				     stem. Unmirrored the pole lands at x~1019, behind the phones. -->
				<img
					src={mascot}
					alt=""
					aria-hidden="true"
					class="absolute top-[44.575%] left-[3.362%] hidden w-[44.02%] -scale-x-100 lg:block"
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
