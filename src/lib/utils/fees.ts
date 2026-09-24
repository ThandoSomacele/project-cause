/**
 * Platform fee model for the Service Provider fee estimator.
 *
 * One number sets it: the rate the estimator's own copy quotes, straight off
 * the frame (node 4612:24101) — "Payments on the platform have a maximum
 * transaction fee of 5%."
 *
 * It is flat. A previous reading of this put a R200 ceiling on the fee, taken
 * from a frame that showed R20 000 attracting R200.00 at an effective 1.0%;
 * the ceiling was wrong, and it made every invoice over R4 000 quote the same
 * R200 however large it got. Before that the file carried client-supplied
 * bands (5 / 4.5 / 4 / 3%). Neither survives.
 *
 * FEE_RATE is the single point of change — editing it moves every figure the
 * estimator shows, and MAX_FEE_RATE_PCT keeps the surrounding copy honest
 * without anyone re-typing a percentage.
 */

/** Charged on every invoice, whatever its size. */
export const FEE_RATE = 0.05;

/** The rate any invoice attracts — drives the "maximum X%" copy. */
export const MAX_FEE_RATE_PCT = FEE_RATE * 100;

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
	/** The fee rate as a percentage, e.g. 5.0. */
	ratePct: number;
	/** What lands in the service provider's account. */
	payout: number;
}

/**
 * Clamp an arbitrary number into the estimator's supported range.
 * Non-finite input (NaN from an empty or malformed field) floors to the minimum.
 */
export function clampInvoice(amount: number): number {
	if (!Number.isFinite(amount)) return MIN_INVOICE;
	return Math.min(Math.max(amount, MIN_INVOICE), MAX_INVOICE);
}

export function calculateFees(amount: number): FeeBreakdown {
	const invoice = clampInvoice(amount);
	const fee = invoice * FEE_RATE;

	return {
		invoice,
		fee,
		// Derived from the fee rather than quoted from FEE_RATE, so the displayed
		// rate still tells the truth if the model ever gains a floor or a cap.
		ratePct: invoice > 0 ? (fee / invoice) * 100 : 0,
		payout: invoice - fee
	};
}
