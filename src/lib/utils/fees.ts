/**
 * Platform fee model for the Service Provider fee estimator.
 *
 * The client's tier table: the rate falls as the invoice grows.
 *
 *   Micro    5.0%   up to R2 000
 *   Small    4.5%   up to R4 000
 *   Medium   4.0%   up to R11 000
 *   Large    3.0%   above that
 *
 * Tiers resolve top to bottom and the first whose `upTo` is greater than or
 * equal to the amount wins, so each tier owns its own upper bound and the next
 * rand crosses into the band below it. The last entry omits `upTo`, which makes
 * it the catch-all — the brief describes these as a `data-fee-tiers` JSON
 * attribute read by a standalone pricing-slider.js, where a missing `upTo`
 * stands in for the Infinity that JSON cannot express. That mechanism belongs
 * to a different build; here the equivalent single point of change is the
 * FEE_TIERS array below.
 *
 * MAX_FEE_RATE_PCT is the top tier's rate, which is what the surrounding copy
 * quotes — "a maximum transaction fee of 5%". It is derived rather than typed
 * so the sentence cannot drift from the table.
 *
 * Two readings of this have been wrong and are worth not repeating: a flat 5%
 * on everything, and a 5% held under a R200 ceiling, which pinned every invoice
 * over R4 000 to the same R200.
 */

export interface FeeTier {
	/** Shown against the band in the estimator's breakdown. */
	label: string;
	/**
	 * Inclusive upper bound of the band, in rand. Omitted on the last entry,
	 * which makes it the catch-all for anything above the previous bound.
	 */
	upTo?: number;
	/** Fee rate as a fraction, e.g. 0.05 for 5%. */
	rate: number;
}

export const FEE_TIERS: readonly FeeTier[] = [
	{ label: 'Micro', upTo: 2_000, rate: 0.05 },
	{ label: 'Small', upTo: 4_000, rate: 0.045 },
	{ label: 'Medium', upTo: 11_000, rate: 0.04 },
	{ label: 'Large', rate: 0.03 }
];

/** The highest rate any invoice can attract — drives the "maximum X%" copy. */
export const MAX_FEE_RATE_PCT = Math.max(...FEE_TIERS.map((t) => t.rate)) * 100;

/** Bounds of the estimator slider, in rand. */
export const MIN_INVOICE = 0;
export const MAX_INVOICE = 20_000;

/** Quick-select amounts offered below the slider. */
export const QUICK_AMOUNTS = [1000, 3000, 7000, 15000] as const;

export interface FeeBreakdown {
	/** The invoice amount the estimate was calculated from. */
	invoice: number;
	/** Platform fee in rand. */
	fee: number;
	/** The effective fee rate as a percentage, e.g. 4.5. */
	ratePct: number;
	/** What lands in the service provider's account. */
	payout: number;
	/** The band the invoice fell into. */
	tier: FeeTier;
}

/**
 * Clamp an arbitrary number into the estimator's supported range.
 * Non-finite input (NaN from an empty or malformed field) floors to the minimum.
 */
export function clampInvoice(amount: number): number {
	if (!Number.isFinite(amount)) return MIN_INVOICE;
	return Math.min(Math.max(amount, MIN_INVOICE), MAX_INVOICE);
}

/**
 * Resolve the band for an amount: the first tier whose `upTo` is greater than
 * or equal to it, falling through to the catch-all entry.
 */
export function tierFor(amount: number): FeeTier {
	return (
		FEE_TIERS.find((tier) => tier.upTo === undefined || amount <= tier.upTo) ??
		FEE_TIERS[FEE_TIERS.length - 1]
	);
}

export function calculateFees(amount: number): FeeBreakdown {
	const invoice = clampInvoice(amount);
	const tier = tierFor(invoice);
	const fee = invoice * tier.rate;

	return {
		invoice,
		fee,
		// Derived from the fee rather than quoted from the tier, so the displayed
		// rate stays truthful if the model ever gains a cap or a minimum.
		ratePct: invoice > 0 ? (fee / invoice) * 100 : 0,
		payout: invoice - fee,
		tier
	};
}
