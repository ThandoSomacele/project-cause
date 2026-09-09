/**
 * Platform fee model for the Service Provider fee estimator.
 *
 * The client supplied banded rates: the fee falls as the invoice grows, and the
 * quoted figures are EXCLUSIVE of VAT.
 *
 *   Micro    5.0%   up to R2 000
 *   Small    4.5%   up to R4 000
 *   Medium   4.0%   up to R11 000
 *   Large    3.0%   above that
 *
 * The brief described these as a `data-fee-tiers` JSON attribute read by a
 * standalone pricing-slider.js. That mechanism belongs to a different build;
 * here the equivalent single point of change is the FEE_TIERS array below.
 * Editing it changes every figure the estimator shows, and MAX_FEE_RATE_PCT
 * keeps the surrounding copy honest without anyone re-typing a percentage.
 */

export interface FeeTier {
	/** Shown against the band in the estimator's breakdown. */
	label: string;
	/**
	 * Inclusive upper bound of the band, in rand. Omitted on the last entry,
	 * which makes it the catch-all for anything above the previous bound.
	 */
	upTo?: number;
	/** Fee rate as a fraction, e.g. 0.05 for 5%. Excludes VAT. */
	rate: number;
}

export const FEE_TIERS: readonly FeeTier[] = [
	{ label: 'Micro', upTo: 2_000, rate: 0.05 },
	{ label: 'Small', upTo: 4_000, rate: 0.045 },
	{ label: 'Medium', upTo: 11_000, rate: 0.04 },
	{ label: 'Large', rate: 0.03 }
];

/** The highest rate any invoice can attract — drives the "up to X%" copy. */
export const MAX_FEE_RATE_PCT = Math.max(...FEE_TIERS.map((t) => t.rate)) * 100;

/** Bounds of the estimator slider, in rand. */
export const MIN_INVOICE = 0;
export const MAX_INVOICE = 20_000;

/** Quick-select amounts offered below the slider. */
export const QUICK_AMOUNTS = [1000, 3000, 7000, 15000] as const;

export interface FeeBreakdown {
	/** The invoice amount the estimate was calculated from. */
	invoice: number;
	/** Platform fee in rand, excluding VAT. */
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
