/**
 * Platform fee model for the Service Provider fee estimator.
 *
 * The design states: "Payments on the platform have a maximum transaction fee
 * of 4.8% Inclusive of VAT." The rate lives here as a single named constant so
 * moving to a tiered or capped model later is a one-file change.
 */

export const PLATFORM_FEE_RATE = 0.048;

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
	/** The effective fee rate as a percentage, e.g. 4.8. */
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
	const fee = invoice * PLATFORM_FEE_RATE;

	return {
		invoice,
		fee,
		// The rate is flat today, but derive it from the fee so the display stays
		// truthful if the model later becomes tiered or capped.
		ratePct: invoice > 0 ? (fee / invoice) * 100 : 0,
		payout: invoice - fee
	};
}
