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
			<!-- Inline below lg so the sentence runs on and wraps where it falls,
			     rather than carrying the desktop composition's breaks on top of
			     the wrapping the narrow column already forces. -->
			<h1 class="text-hero font-light lg:leading-[0.9775] lg:tracking-[-0.019em]">
				{#each audience.heading as line, i (i)}
					<span class="lg:block"
						><RichText segments={line} />{i < audience.heading.length - 1 ? ' ' : ''}</span
					>
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

		<!-- The right half is the audience selector proper: two photographs, one
		     per option, with a caption and a pair of dots beneath. No card and no
		     border — the navy runs uninterrupted behind them (sampled #0C142F
		     either side of the caption). The 11px radius was fitted, not derived:
		     a corner's first pixel row samples half a pixel below the tangent, so
		     reading the inset off the design understates it. Rendering 8/10/11/12
		     and matching the inset profile against the design's 8,5,4,3,2,1,1,1,1
		     lands on 11. It has to be a CSS radius rather than the one baked into
		     the exports' alpha, because object-cover crops those corners away as
		     soon as the tile is taller than the photograph.

		     At rest both photographs sit equal and untouched. Hovering or focusing
		     either one starts the motion — it takes the wider column while the
		     other narrows, shortens, blurs and fades — and the client tile also
		     swaps the caption and dots to its own. Clicking either jumps to that
		     audience's half of the page. The motion lives in `.option-pair` /
		     `.option-group` in layout.css, driven by `:has()` so it needs no
		     scripting. -->
		<div
			class="option-group relative z-10 mt-8 lg:absolute lg:top-[min(5.12vw,73px)] lg:left-[53.53%] lg:mt-0 lg:w-[40.12%]"
		>
			<div
				class="option-pair grid grid-cols-2 gap-3 lg:flex lg:h-[min(37.12vw,529px)] lg:items-start lg:gap-[min(0.63vw,9px)]"
			>
				{#each audience.options as option, i (option.id)}
					<a
						href={option.href}
						class="option block overflow-hidden rounded-[11px]"
					>
						<img
							src={i === 0 ? '/images/select-provider-a.webp' : '/images/select-provider-b.webp'}
							alt=""
							width="266"
							height="529"
							loading="eager"
							class="aspect-[266/529] w-full object-cover lg:h-full lg:aspect-auto"
						/>
						<span class="sr-only">{option.title}</span>
					</a>
				{/each}
			</div>

			<!-- Which option is active. Indicators, not controls: the tiles above
			     are the real controls, and a dot that looked clickable but did
			     nothing would be worse than none. Desktop only — the swap they
			     track is a hover state, and below lg both captions are on screen
			     at once, so a dot marking one of them would be telling the truth
			     about nothing. -->
			<div class="mt-4 hidden items-center justify-center gap-2 lg:flex" aria-hidden="true">
				<span class="option-dot h-2 w-2 rounded-full bg-accent"></span>
				<span class="option-dot h-2 w-2 rounded-full bg-mint/35"></span>
			</div>

			<!-- From lg the two captions share ONE grid cell and fade between each
			     other, so the swap cannot shift anything below. Below lg there is
			     no hover to swap on, and the rules that hide the inactive one live
			     in the 64rem query, so both would paint into that single cell on
			     top of each other. Each takes its own column there instead, on the
			     same two-column track and gap as the tiles, so a caption sits
			     under the photograph it belongs to.

			     Each caption is a link to the same place its tile goes: on a
			     narrow screen the tiles are small and the words under them are the
			     larger target. At lg the inactive one is faded out, so the
			     stylesheet takes its pointer events with it — an invisible link
			     over the visible one would swallow the clicks. -->
			<div class="mt-3 grid grid-cols-2 gap-x-3 text-left lg:grid-cols-1 lg:text-center">
				{#each audience.options as option (option.id)}
					<a href={option.href} class="option-caption block lg:col-start-1 lg:row-start-1">
						<span class="block text-[17px] font-bold">{option.title}</span>
						<span
							class="mt-2.5 block max-w-full pr-3 pb-8 text-[13px] leading-[1.75] text-white/75 lg:mx-auto lg:mt-1.5 lg:max-w-[74.6%] lg:pr-0 lg:leading-[1.65]"
						>
							{option.body}
						</span>
					</a>
				{/each}
			</div>
		</div>

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
