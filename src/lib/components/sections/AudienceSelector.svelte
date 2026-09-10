<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import RichText from '$lib/components/ui/RichText.svelte';
	import { audience } from '$lib/data/content';

	/** Left margins for chips 2 and 3. The design's chip row is not evenly
	 *  spaced — the gaps measure 121.4px and 99.2px at the 1425 frame — so the
	 *  row can't be a single flex `gap`. Expressed in vw so they track the rest
	 *  of the layout, capped at the design value. */
	const chipLead = ['', 'lg:ms-[min(8.519vw,121.4px)]', 'lg:ms-[min(6.961vw,99.2px)]'];
</script>

<!--
	The page's opening section. It shares the hero's frame exactly — 84px navbar
	above, a 759px navy body, the mint rule on its base.

	Every measurement below is section-relative at the 1425 design width, read off
	the supplied 1:1 screenshot (calibrated on the mint rule's 28px left inset):

	  heading line 1 cap top   y62.8      baselines  y117.8 / y192.8 / y265.6
	  subhead cap top          y304.2     baseline   y318.5
	  chip icons               y349.2, 20px square, at x73.5 / x277.0 / x465.6
	  mascot ink               x214.2..712.6, top y352.7, clipped by the section base

	It carries the page's h1; the service-provider headline below is an h2, so the
	document keeps a single top-level heading.

	Both options are plain anchors targeting ids on this page, which the
	stylesheet's `scroll-behavior: smooth` animates and the `prefers-reduced-motion`
	block turns off — so the jump needs no scripting and survives the strict CSP.
-->
<section
	data-section="audience"
	class="relative isolate overflow-hidden bg-ink text-white lg:min-h-[min(calc(57.1vw-11px),759px)]"
>
	<div class="hero-backdrop pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>

	<div class="container-wide relative">
		<div class="relative z-10 max-w-[780px] pt-10 pb-12 lg:pt-[min(3.72vw,53px)] lg:pb-24">
			<!-- Unlike the service-provider hero, this headline is heavy: the stems
			     measure ~11.9px against ~6.3px on the connective words, so "A
			     Marketplace" and both accent runs carry `weight: 'strong'` in the
			     content while "to", "clients" and "&" stay Light. Leading is 73.9px
			     against a 75.6px face — tighter than the shared token's 1.02. -->
			<h1 class="text-hero font-light lg:leading-[0.9775] lg:tracking-[-0.019em]">
				{#each audience.heading as line, i (i)}
					<span class="block"><RichText segments={line} /></span>
				{/each}
			</h1>

			<p class="mt-10 text-[17px] leading-relaxed text-white/85 lg:mt-[min(1.44vw,20.5px)] lg:text-[19.6px]">
				{audience.subhead}
			</p>

			<ul class="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 lg:mt-[min(1.24vw,17.7px)] lg:gap-x-0">
				{#each audience.chips as chip, i (chip.label)}
					<li class={['flex items-center gap-2 text-[16px] font-semibold text-white/90', chipLead[i]]}>
						<Icon name={chip.icon} class="h-5 w-5" width={20} height={20} />
						{chip.label}
					</li>
				{/each}
			</ul>
		</div>

		<!-- The right half is a photograph panel with a centred caption beneath —
		     no card, no border: the navy runs uninterrupted behind it (sampled
		     #0C142F either side of the caption). Two tall portraits side by side,
		     not a grid: there is a single 9px navy gutter and no horizontal one.
		     The exports carry their own rounded corners in the alpha channel, so
		     no CSS radius is applied over them. Panel and caption are one link:
		     the service-provider option. -->
		<a
			href={audience.options[0].href}
			class="group relative z-10 mt-8 block lg:absolute lg:top-[min(5.12vw,73px)] lg:left-[53.53%] lg:mt-0 lg:w-[40.12%]"
		>
			<span class="grid grid-cols-2 gap-3 lg:gap-[min(0.63vw,9px)]" aria-hidden="true">
				{#each ['/images/select-provider-a.webp', '/images/select-provider-b.webp'] as src (src)}
					<img
						{src}
						alt=""
						width="266"
						height="529"
						loading="eager"
						class="aspect-[266/529] w-full object-cover transition-opacity group-hover:opacity-90"
					/>
				{/each}
			</span>

			<span class="mt-2 block text-center lg:mt-[min(2.035vw,29px)]">
				<span class="block text-[17px] font-bold group-hover:text-accent">
					{audience.options[0].title}
				</span>
				<!-- Measure capped at `lg` so the copy sits under the middle of the
				     panel rather than running its full width; below that the panel is
				     already narrow, so the text takes the full width and wraps
				     naturally rather than into a column of two-word lines. -->
				<span
					class="mx-auto mt-0 block max-w-full pb-8 text-[13px] leading-[1.65] text-white/75 lg:max-w-[74.6%] lg:pb-8"
				>
					{audience.options[0].body}
				</span>
			</span>
		</a>

		<!-- The design's frame shows only the service-provider option, but the
		     client half of the page still has to be reachable from here — the
		     brief asks for both the selector and the nav to jump to it. It sits
		     as a plain link on the chip row's baseline rather than as an invented
		     second panel. -->
		<a
			href={audience.options[1].href}
			class="relative z-10 mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-accent hover:underline lg:mt-0"
		>
			Looking for a provider? Go to {audience.options[1].title}s
		</a>
	</div>

	<!-- Full-figure mascot, not the cropped `mascot-wave` variant: the design
	     runs the legs past the section's base and lets `overflow-hidden` cut
	     them off. The artwork's ink sits at x268..893 of a 1300-wide render on
	     an 815-tall canvas, which is what turns the design's ink box
	     (x214.2..712.6, top y352.7) into the box below. `translate-y` resolves
	     against the image's own height, so the overhang scales with it.

	     It rides its own full-height copy of the container so its percentages
	     resolve against the section, not against the text column's flow height. -->
	<div class="container-wide pointer-events-none absolute inset-0" aria-hidden="true">
		<img
			src="/images/mascot-greet.svg"
			alt=""
			class="absolute bottom-0 left-[-3.358%] hidden w-[76.895%] translate-y-[23.94%] lg:block"
		/>
	</div>

	<!-- Mint rule on the base, the same 5px at x28..1394 the hero and the client
	     section both carry. -->
	<span
		class="pointer-events-none absolute right-[2.18%] bottom-0 left-[1.96%] h-[5px] bg-mint"
		aria-hidden="true"
	></span>
</section>
