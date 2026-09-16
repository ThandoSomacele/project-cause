<script lang="ts">
	import { process } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
</script>

<!--
	Follows the client section. Same decorative grammar as the value offering: an
	ink rule running in from the left screen edge to a dot, level with the second
	heading line, and an orange rule starting level with the third and running out
	past the right edge. Positions are percentages of the container so they hold
	as the page scales, and the rules only appear from md up — below that the
	heading wraps and they would cut through it.
-->
<section
	data-section="process"
	class="relative isolate overflow-hidden bg-white py-16 lg:pt-[min(16.70vw,238px)] lg:pb-[min(7.3vw,104px)]"
>
	<!-- The supplied band, used as-is. Its 1422x659 canvas is effectively the
	     1425 design frame's width, opaque along the top and transparent toward
	     the bottom, so it is a top piece: full-bleed at top-0 with the artwork
	     running off both side edges the way the design has it. Behind the
	     content, and hidden below lg where the heading wraps under it. -->
	<img
		src="/images/tools-band.webp"
		alt=""
		aria-hidden="true"
		width="1422"
		height="659"
		loading="lazy"
		class="pointer-events-none absolute top-0 left-0 -z-10 hidden h-[min(21vw,300px)] w-full max-w-none object-cover object-top lg:block"
	/>

	<!-- The right-edge piece, used as supplied. Its 374x939 canvas carries the ink
	     flush to its own right edge (margins L170 T68 R0 B63), so right-0 puts the
	     tools against the screen edge the way the reference does, starting about
	     17% down the section. -->
	<img
		src="/images/tools-right.webp"
		alt=""
		aria-hidden="true"
		width="374"
		height="939"
		loading="lazy"
		class="pointer-events-none absolute top-[17.3%] right-0 -z-10 hidden w-[min(26.25vw,374px)] max-w-none lg:block"
	/>

	<div class="container-page relative">
		<!-- Ink rule in from the left edge, ending in a 10px dot just before the
		     second line begins (x406 of 1425 in the design). -->
		<div
			class="pointer-events-none absolute top-[calc(1.8938*var(--text-hero)_-_2px)] right-[74.25%] left-[-50vw] hidden h-[2px] bg-ink md:block"
			aria-hidden="true"
		>
			<span class="absolute -top-[4px] -right-[3px] h-[10px] w-[10px] rounded-full bg-ink"></span>
		</div>

		<!-- Orange rule level with the third line, running off the right edge. -->
		<div
			class="pointer-events-none absolute top-[calc(3.079*var(--text-hero)_-_1.5px)] right-[-50vw] left-[85.56%] hidden h-[3px] bg-accent md:block"
			aria-hidden="true"
		></div>

		<h2 class="text-hero font-light text-ink">
			{#each process.heading as line, i (i)}
				<span class={['block', ['lg:pl-[18.5%]', 'lg:pl-[26.5%]', 'lg:pl-[52%]'][i]]}>
					<RichText segments={line} />
				</span>
			{/each}
		</h2>

		<p class="mt-[min(6.6vw,94px)] text-[clamp(1.75rem,1.4rem+1.4vw,2.94rem)] leading-none font-light text-ink">
			{process.label}
		</p>

		<!-- Three columns in the design, starting at x143, x562 and x982 of 1425 —
		     an even thirds split of the 1200 content box. -->
		<ol class="mt-[min(5.7vw,81px)] grid gap-10 lg:grid-cols-3 lg:gap-[min(5.5vw,78px)]">
			{#each process.steps as item (item.step)}
				<li>
					<p class="text-[13px] tracking-[0.08em] text-ink/55">{item.step}</p>
					<h3 class="mt-[min(3.3vw,47px)] max-w-[15ch] text-[clamp(1.375rem,1.15rem+0.9vw,1.75rem)] leading-tight font-light text-ink">
						<RichText segments={item.title} />
					</h3>
					<p class="mt-[min(2.7vw,38px)] max-w-[34ch] text-[15px] leading-6 text-ink/75">
						{item.body}
					</p>
				</li>
			{/each}
		</ol>
	</div>
</section>
