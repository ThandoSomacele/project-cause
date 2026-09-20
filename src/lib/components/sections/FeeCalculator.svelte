<script lang="ts">
	import { calculator } from '$lib/data/content';
	import {
		MAX_INVOICE,
		MIN_INVOICE,
		QUICK_AMOUNTS,
		calculateFees,
		clampInvoice
	} from '$lib/utils/fees';
	import {
		formatPct,
		formatZar,
		formatZarTight,
		formatZarWholeTight,
		parseAmount
	} from '$lib/utils/format';

	// One source of truth; the slider, chips and text field all write to it.
	let amount = $state(10_000);
	// Kept separate so someone can type freely without the field fighting them.
	let typed = $state<string | null>(null);

	const fees = $derived(calculateFees(amount));
	const progress = $derived(((amount - MIN_INVOICE) / (MAX_INVOICE - MIN_INVOICE)) * 100);
	const fieldValue = $derived(typed ?? formatZar(amount));

	let scope = $state<HTMLElement | null>(null);

	// The slider fill reads --progress. It is written
	// through the CSSOM rather than a `style` attribute because a strict CSP
	// cannot allow-list inline style attributes — a nonce or hash only covers
	// style and script elements. CSSOM writes are not policed by CSP, so this
	// keeps the policy strict. The stylesheet below carries a 50% default,
	// matching the initial R10 000 of R20 000, so the server-rendered paint is
	// already correct before hydration.
	$effect(() => {
		scope?.style.setProperty('--progress', `${progress}%`);
	});

	function onSlider(event: Event) {
		amount = Number((event.currentTarget as HTMLInputElement).value);
		typed = null;
	}

	function onType(event: Event) {
		const raw = (event.currentTarget as HTMLInputElement).value;
		typed = raw;
		amount = clampInvoice(parseAmount(raw));
	}
</script>

<section id="fees" class="relative scroll-mt-24 bg-white py-16 lg:pt-[min(15.65vw,223px)] lg:pb-[min(7.3vw,104px)]">
	<!-- The connector the design draws between the carousel and this card
	     (Figma "Vector 22"): a dot, down, across to the left, then down into the
	     card. Drawn rather than shipped as an asset so it stays crisp and takes
	     the ink token. Desktop only — below lg the sections stack too tightly for
	     it to read.

	     Placed off the reference rather than by eye. Two things fix it: the dot
	     sits on the container's centre line — the same axis the carousel's own
	     dots are centred on, which is what makes it read as leaving that
	     section — and it hangs 96px under the card's base. The dot is 297 of the
	     305-unit viewBox, so left = centre - 297; the section is 1425 at the
	     design width, which puts that at 29.19%, and 63px above this section's
	     top edge. The height then follows: the foot has to keep running 8px into
	     this card, so the last leg is whatever closes that gap.

	     It sat at 46.3% and 107px for a long time, which put the dot a quarter
	     of the width right of the axis it belongs on, floating in the white. -->
	<svg
		class="pointer-events-none absolute -top-[min(4.42vw,63px)] left-[29.19%] hidden w-[min(21.4vw,305px)] overflow-visible lg:block"
		viewBox="0 0 305 294"
		fill="none"
		aria-hidden="true"
	>
		<path
			d="M297 14v67a16 16 0 0 1-16 16H19A16 16 0 0 0 3 113v181"
			stroke="var(--color-ink)"
			stroke-width="3"
		/>
		<circle cx="297" cy="7" r="7" fill="var(--color-ink)" />
	</svg>

	<div class="container-wide">
		<div class="font-display rounded-[24px] bg-ink px-6 py-10 text-white sm:px-10 lg:px-[min(8.35vw,119px)] lg:py-[min(5.4vw,77px)]">
			<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_324px] lg:gap-0">
				<!-- Controls -->
				<div class="lg:pr-16">
					<h2 class="text-[clamp(1.375rem,1.2rem+0.7vw,1.8125rem)] font-medium">
						{calculator.title}
					</h2>

					<div class="fee-scope mt-8" bind:this={scope}>
						<!-- The design carries no value bubble over the handle: the amount is
						     already on the field below and in the results column, and the
						     bubble put a third copy of it on screen. The handle still
						     announces itself through aria-valuetext. -->
						<label class="sr-only" for="fee-slider">Invoice amount</label>
						<input
							id="fee-slider"
							type="range"
							min={MIN_INVOICE}
							max={MAX_INVOICE}
							step="100"
							value={amount}
							oninput={onSlider}
							aria-valuetext={formatZar(amount)}
							class="fee-slider"
						/>

						<div class="mt-3 flex justify-between text-[15px]">
							<span>{formatZarWholeTight(MIN_INVOICE)}</span>
							<span>{formatZarTight(MAX_INVOICE)}</span>
						</div>
					</div>

					<fieldset class="mt-9">
						<legend class="sr-only">{calculator.quickSelectLabel}</legend>
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
							{#each QUICK_AMOUNTS as value (value)}
								<button
									type="button"
									onclick={() => {
										amount = value;
										typed = null;
									}}
									aria-pressed={amount === value}
									class={[
										'rounded-full border px-4 py-2.5 text-[14px] transition-colors',
										amount === value
											? 'border-accent bg-accent text-white'
											: 'border-white/15 hover:border-white/45'
									]}
								>
									{formatZarWholeTight(value)}
								</button>
							{/each}
						</div>
					</fieldset>

					<div class="mt-7">
						<label for="fee-exact" class="text-[13px] font-semibold text-[#94a3b8]">{calculator.exactLabel}</label>
						<input
							id="fee-exact"
							type="text"
							inputmode="decimal"
							value={fieldValue}
							oninput={onType}
							onblur={() => (typed = null)}
							class="mt-3 w-full rounded-[10px] border border-white/15 bg-ink-700 px-4 py-3.5
							       text-[16px] text-white focus:border-accent focus:ring-0"
						/>
					</div>

					<h3 class="mt-12 text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-medium">
						{calculator.feesTitle}
					</h3>
					<p class="mt-2 max-w-[38rem] text-[15px] text-white/75">{calculator.feesBody}</p>

					<!-- Two equal plates rather than two content-width ones: the figures
					     inside them are different lengths, so packed they came out
					     visibly mismatched. Half a narrow screen is not much room for
					     "R200.00" beside a rule and a label, so the padding and the
					     figure both come in a step below sm. -->
					<div class="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
						<p class="flex items-center gap-3 rounded-lg bg-cream px-4 py-4 text-ink sm:gap-4 sm:pr-8 sm:pl-5">
							<span class="h-10 w-1 shrink-0 rounded bg-accent"></span>
							<span>
								<span class="block text-[20px] font-semibold sm:text-[24px]">{formatPct(fees.ratePct)} %</span>
								<span class="font-mono block text-[11px] tracking-[0.1em] text-muted">
									{calculator.labels.feeEstimate}
								</span>
							</span>
						</p>
						<p class="flex items-center gap-3 rounded-lg bg-white px-4 py-4 text-ink sm:gap-4 sm:pr-8 sm:pl-5">
							<span class="h-10 w-1 shrink-0 rounded bg-ink"></span>
							<span>
								<span class="block text-[20px] font-semibold sm:text-[24px]">{formatZarTight(fees.fee)}</span>
								<span class="font-mono block text-[11px] tracking-[0.1em] text-muted">
									{calculator.labels.deduction}
								</span>
							</span>
						</p>
					</div>
				</div>

				<!-- Results. The design rules the two figures apart as well as ruling
				     the column off from the controls. -->
				<div class="flex flex-col gap-10 lg:border-l lg:border-white/20 lg:pl-14">
					<div>
						<p class="text-[clamp(2.25rem,1.9rem+1.4vw,2.8125rem)] leading-none font-semibold tracking-[-0.06em] text-[#f7f4ee]">{formatZarTight(fees.invoice)}</p>
						<p class="mt-3 text-[14px] text-[#f4f2ec]/70">{calculator.labels.invoice}</p>
					</div>
					<div class="border-t border-white/20 pt-10 lg:mt-4">
						<p class="text-[clamp(2.5rem,2rem+2vw,3.75rem)] leading-none font-semibold tracking-[-0.045em] text-[#f7f4ee]">{formatZarTight(fees.payout)}</p>
						<p class="mt-3 text-[14px] text-[#f4f2ec]/70">{calculator.labels.payout}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Default matches the initial amount (R10 000 of R20 000) so the server-
	   rendered markup paints correctly before hydration sets the real value. */
	.fee-scope {
		--progress: 50%;
	}

	/* The forms plugin strips the native control, so the track and handle are
	   rebuilt here. The filled portion is a gradient driven by --progress. */
	.fee-slider {
		--track: 8px;
		--thumb: 40px;
		appearance: none;
		width: 100%;
		height: var(--thumb);
		background: transparent;
		cursor: pointer;
	}

	.fee-slider::-webkit-slider-runnable-track {
		height: var(--track);
		border-radius: 999px;
		background: linear-gradient(
			to right,
			var(--color-mint) 0 var(--progress),
			rgb(255 255 255 / 0.14) var(--progress) 100%
		);
	}

	.fee-slider::-moz-range-track {
		height: var(--track);
		border-radius: 999px;
		background: rgb(255 255 255 / 0.14);
	}

	.fee-slider::-moz-range-progress {
		height: var(--track);
		border-radius: 999px;
		background: var(--color-mint);
	}

	.fee-slider::-webkit-slider-thumb {
		appearance: none;
		width: var(--thumb);
		height: var(--thumb);
		margin-top: calc((var(--track) - var(--thumb)) / 2);
		border-radius: 999px;
		background: var(--color-accent);
		border: none;
	}

	.fee-slider::-moz-range-thumb {
		width: var(--thumb);
		height: var(--thumb);
		border-radius: 999px;
		background: var(--color-accent);
		border: none;
	}
</style>
