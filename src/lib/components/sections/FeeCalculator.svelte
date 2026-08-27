<script lang="ts">
	import { calculator } from '$lib/data/content';
	import {
		MAX_INVOICE,
		MIN_INVOICE,
		QUICK_AMOUNTS,
		calculateFees,
		clampInvoice
	} from '$lib/utils/fees';
	import { formatPct, formatZar, formatZarWhole, parseAmount } from '$lib/utils/format';

	// One source of truth; the slider, chips and text field all write to it.
	let amount = $state(10_000);
	// Kept separate so someone can type freely without the field fighting them.
	let typed = $state<string | null>(null);

	const fees = $derived(calculateFees(amount));
	const progress = $derived(((amount - MIN_INVOICE) / (MAX_INVOICE - MIN_INVOICE)) * 100);
	const fieldValue = $derived(typed ?? formatZar(amount));

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

<section id="fees" class="scroll-mt-24 bg-surface py-16 lg:py-[104px]">
	<div class="container-wide">
		<div class="font-display rounded-[24px] bg-ink px-6 py-10 text-white sm:px-10 lg:px-[119px] lg:py-[77px]">
			<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_324px] lg:gap-0">
				<!-- Controls -->
				<div class="lg:pr-16">
					<h2 class="text-[clamp(1.375rem,1.2rem+0.7vw,1.8125rem)] font-medium">
						{calculator.title}
					</h2>

					<div class="mt-8">
						<!-- Value bubble tracks the handle. -->
						<div class="relative h-10">
							<span
								class="absolute -translate-x-1/2 rounded-lg bg-ink-600 px-4 py-2 text-[15px] whitespace-nowrap"
								style="left:clamp(6rem, {progress}%, calc(100% - 6rem))"
							>
								Current: {formatZar(amount)}
							</span>
						</div>

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
							style="--progress:{progress}%"
						/>

						<div class="mt-3 flex justify-between text-[15px]">
							<span>{formatZarWhole(MIN_INVOICE)}</span>
							<span>{formatZar(MAX_INVOICE)}</span>
						</div>
					</div>

					<fieldset class="mt-9">
						<legend class="text-[13px] text-white/60">{calculator.quickSelectLabel}</legend>
						<div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
											: 'border-white/25 hover:border-white/60'
									]}
								>
									{formatZarWhole(value)}
								</button>
							{/each}
						</div>
					</fieldset>

					<div class="mt-7">
						<label for="fee-exact" class="text-[13px] text-white/60">{calculator.exactLabel}</label>
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

					<div class="mt-7 flex flex-wrap gap-4">
						<p class="flex items-center gap-4 rounded-lg bg-cream py-4 pr-8 pl-5 text-ink">
							<span class="h-10 w-1 shrink-0 rounded bg-accent"></span>
							<span>
								<span class="block text-[22px] font-medium">{formatPct(fees.ratePct)} %</span>
								<span class="block text-[11px] tracking-[0.14em] text-ink/70">
									{calculator.labels.feeEstimate}
								</span>
							</span>
						</p>
						<p class="flex items-center gap-4 rounded-lg bg-white py-4 pr-8 pl-5 text-ink">
							<span class="h-10 w-1 shrink-0 rounded bg-ink"></span>
							<span>
								<span class="block text-[22px] font-medium">{formatZar(fees.fee)}</span>
								<span class="block text-[11px] tracking-[0.14em] text-ink/70">
									{calculator.labels.deduction}
								</span>
							</span>
						</p>
					</div>
				</div>

				<!-- Results -->
				<div class="flex flex-col gap-10 lg:border-l lg:border-white/20 lg:pl-14">
					<div>
						<p class="text-stat font-medium">{formatZar(fees.invoice)}</p>
						<p class="mt-3 text-[15px] text-white/70">{calculator.labels.invoice}</p>
					</div>
					<div class="lg:mt-14">
						<p class="text-stat font-medium">{formatZar(fees.payout)}</p>
						<p class="mt-3 text-[15px] text-white/70">{calculator.labels.payout}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
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
			var(--color-ink-500) var(--progress) 100%
		);
	}

	.fee-slider::-moz-range-track {
		height: var(--track);
		border-radius: 999px;
		background: var(--color-ink-500);
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
