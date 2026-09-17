<script lang="ts">
	import { process } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
</script>

<!--
	Follows the client section. Every number below is read off
	design/incoming/process-ref.png, which is a 1008px-wide render of the whole
	1425 design frame starting at this section's own top edge — so ref px convert
	to design px at 1425/1008 = 1.4137. Two independent checks pin that scale: the
	step body sets 15.1px and the "STEP n" label 13.0px under it, which is exactly
	what the build already ships. The section runs 878.6 design px from its top
	edge to the grey of the comparison band below.
-->
<section
	data-section="process"
	class="relative overflow-hidden bg-white py-16 lg:pt-[min(16.70vw,238px)] lg:pb-[min(5.71vw,81px)]"
>
	<!-- The supplied band at its natural scale: 1422x659 over a 1425 frame, so it
	     is full-bleed at width 100% with the aspect left alone — no object-cover,
	     which was scaling it up and cropping the hard hat. The design hangs it
	     265px above the section's top edge, which the section's own overflow
	     clips; that lands the hat's lower tip 13px under the heading's cap line,
	     where the reference has it. It sits in front of the section's white
	     ground (it used to carry -z-10 inside an `isolate` section, which buried
	     it behind that ground and made it invisible) and behind the content,
	     which the positioned container below takes care of by document order. -->
	<img
		src="/images/tools-band.webp"
		alt=""
		aria-hidden="true"
		width="1422"
		height="659"
		loading="lazy"
		class="pointer-events-none absolute -top-[min(18.60vw,265px)] left-0 hidden w-full max-w-none lg:block"
	/>

	<!-- The right-edge piece, flush to the screen edge at its natural 374px. Its
	     crossed nails are the only part the design shows here: they start 631px
	     down and the section's base cuts the rest off. -->
	<img
		src="/images/tools-right.webp"
		alt=""
		aria-hidden="true"
		width="374"
		height="939"
		loading="lazy"
		class="pointer-events-none absolute top-[min(44.28vw,631px)] right-0 hidden w-[min(26.25vw,374px)] max-w-none lg:block"
	/>

	<div class="container-page relative">
		<!--
			60px over the 1425 frame, not the 75.6px the shared hero token sets:
			"Reliably," measures 244.6 design px wide against the 244.5 Inter puts
			at 60px with this tracking, and the other two lines agree to within a
			point. Expressed against the token so it keeps the same clamp on the
			way down. The face is Regular — the sub-pixel stem of the "i" in
			"Hire" runs 0.155 of its x-height, against 0.113 for Light and 0.161
			for Regular — with "Reliably" alone set Bold.

			The design draws each line as its own layer, so the leading is not
			uniform: 67.9px from line 2 to line 3 but 76.3px from line 1 to line 2.
			The base line-height takes the former and line 2 carries the 8.4px
			(0.14em) difference as a margin.
		-->
		<h2
			class="text-[calc(0.794*var(--text-hero))] leading-[1.131] font-normal tracking-[-0.01em] text-ink"
		>
			{#each process.heading as line, i (i)}
				<span
					class={[
						'block',
						['lg:pl-[18.5%]', 'mt-[0.14em] lg:pl-[26.5%]', 'lg:pl-[52%]'][i]
					]}
				>
					{#if i === 1}
						<!-- The ink rule runs in from the left screen edge and stops in a
						     10px dot 0.483em short of where line 2's first letter starts,
						     which is why it hangs off an inline-block wrapped around the
						     line rather than off a percentage of the container: `right-full`
						     is the glyph edge itself. Its centre sits on line 2's baseline —
						     the bottom of "Hire", as the reference has it — which is
						     0.907em below the line box top at this size and leading. -->
						<span class="relative inline-block">
							<RichText segments={line} />
							<span
								class="pointer-events-none absolute top-[0.907em] right-full left-[-50vw] mr-[0.483em] hidden h-[2px] -translate-y-1/2 bg-ink lg:block"
								aria-hidden="true"
							>
								<span
									class="absolute top-1/2 -right-[5px] h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-ink"
								></span>
							</span>
						</span>
					{:else if i === 2}
						<RichText segments={line} />
						<!-- The crew mark closes the line: 65x64.5 design px with its base on
						     line 3's baseline and 0.33em of air after "Done". The box it sits
						     in is zero-height and the mark hangs out of it: an inline box 65px
						     tall is taller than the line's own 55.8px of ascent, so leaving it
						     in flow pushed line 3's baseline — and everything under the
						     heading — 9.5px down. A zero-height inline-flex advances the line
						     by the mark's width, keeps its bottom margin edge on the baseline
						     and contributes no height. The orange dot and the rule out to the
						     right edge hang off the same box, on its axis, 0.177em (10.6px)
						     below that baseline. -->
						<span
							class="relative ml-[0.33em] inline-flex h-0 w-[1.094em] align-baseline"
						>
							<img
								src="/icons/process-crew.svg"
								alt=""
								aria-hidden="true"
								width="46"
								height="45"
								class="absolute bottom-0 left-0 h-[1.075em] w-full"
							/>
							<span
								class="pointer-events-none absolute top-[0.177em] right-[-50vw] left-1/2 hidden h-[3px] -translate-y-1/2 bg-accent lg:block"
								aria-hidden="true"
							></span>
							<span
								class="pointer-events-none absolute top-[0.177em] left-1/2 hidden h-[0.26em] w-[0.26em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent lg:block"
								aria-hidden="true"
							></span>
						</span>
					{:else}
						<RichText segments={line} />
					{/if}
				</span>
			{/each}
		</h2>

		<!-- 53.3px Bold in the design, near enough the heading's own size — it ran
		     at 42px Light here. -->
		<p
			class="mt-[min(5.01vw,71px)] text-[calc(0.705*var(--text-hero))] leading-none font-bold text-ink"
		>
			{process.label}
		</p>

		<!-- Three columns in the design, starting at x142, x562 and x984 of 1425 —
		     an even thirds split. The step rail is one rule running from the first
		     dot out past the right screen edge, with a dot on each column's left
		     edge; step 3's is orange and larger, the way the design marks the end
		     of the run. The rail sits 34px below the row's top: the labels are a
		     fixed 13px set solid, so the offsets below are fixed pixels too. -->
		<ol
			class="relative mt-[min(2.11vw,30px)] grid gap-10 lg:grid-cols-3 lg:gap-x-[min(5.5vw,78px)]"
		>
			<div
				class="pointer-events-none absolute top-[34px] right-[-50vw] left-[-5px] hidden h-[2px] bg-ink lg:block"
				aria-hidden="true"
			></div>

			{#each process.steps as item, i (item.step)}
				<li class="relative">
					<p class="text-[13px] leading-none tracking-[0.08em] text-ink/55">{item.step}</p>
					<span
						class={[
							'pointer-events-none absolute hidden rounded-full lg:block',
							i === process.steps.length - 1
								? 'top-[27.5px] -left-[7.5px] h-[15px] w-[15px] bg-accent'
								: 'top-[30px] -left-[5px] h-[10px] w-[10px] bg-ink'
						]}
						aria-hidden="true"
					></span>
					<!-- Two title lines in the design; the one-line third step centres
					     against them rather than sitting on their first line, which is
					     what keeps all three bodies on one row. The 41px above it is the
					     room the rail needs, so the stacked layout, which has no rail,
					     closes back up. -->
					<h3
						class="mt-[18px] max-w-[15ch] text-[clamp(1.375rem,1.15rem+0.9vw,1.75rem)] leading-tight font-normal text-ink lg:mt-[41px] lg:flex lg:min-h-[70px] lg:items-center"
					>
						<!-- One block child, not the runs themselves: a flex container turns
						     each run into its own item and drops the space between them. -->
						<span class="block"><RichText segments={item.title} /></span>
					</h3>
					<p class="mt-[14px] max-w-[34ch] text-[15px] leading-6 text-ink/75">
						{item.body}
					</p>
				</li>
			{/each}
		</ol>
	</div>
</section>
