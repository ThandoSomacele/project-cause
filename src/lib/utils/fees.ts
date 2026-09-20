/**
 * Platform fee model for the Service Provider fee estimator.
 *
 * Two numbers set it, and the design states both. The estimator's own copy
 * quotes a MAXIMUM transaction fee of 4.8% inclusive of VAT, and the frame
 * shows a R20 000 invoice attracting R200.00 at an effective 1.0% — which is
 * that 4.8% held at a R200 ceiling. The ceiling starts binding at R4 166.67,
 * and above it the effective rate falls away, which is what makes "maximum"
 * the right word in the copy.
 *
 * An earlier build carried client-supplied bands here (5 / 4.5 / 4 / 3%,
 * quoted exclusive of VAT). The design supersedes them: under those bands
 * R20 000 would attract R600 at 3%, not the R200 the frame shows.
 *
 * FEE_RATE and FEE_CAP are the single point of change — editing either moves
 * every figure the estimator shows, and MAX_FEE_RATE_PCT keeps the surrounding
 * copy honest without anyone re-typing a percentage.
 */

/** Charged on every invoice up to the ceiling, inclusive of VAT. */
export const FEE_RATE = 0.048;

/** The fee stops climbing here, in rand. */
export const FEE_CAP = 200;

/** The highest rate any invoice can attract — drives the "maximum X%" copy. */
export const MAX_FEE_RATE_PCT = FEE_RATE * 100;

/** Invoice value at which the ceiling starts binding, in rand. */
export const FEE_CAP_FROM = FEE_CAP / FEE_RATE;

/** Bounds of the estimator slider, in rand. */
export const MIN_INVOICE = 0;
export const MAX_INVOICE = 20_000;

/** Quick-select amounts offered below the slider. */
export const QUICK_AMOUNTS = [1000, 3000, 7000, 15000] as const;

export interface FeeBreakdown {
	/** The invoice amount the estimate was calculated from. */
	invoice: number;
	/** Platform fee in rand, inclusive of VAT. */
	fee: number;
	/** The effective fee rate as a percentage, e.g. 1.0 once the cap binds. */
	ratePct: number;
	/** What lands in the service provider's account. */
	payout: number;
	/** Whether the ceiling, rather than the rate, set this fee. */
	capped: boolean;
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
	const uncapped = invoice * FEE_RATE;
	const fee = Math.min(uncapped, FEE_CAP);

	return {
		invoice,
		fee,
		// Derived from the fee rather than quoted from FEE_RATE, so the displayed
		// rate tells the truth once the ceiling takes over.
		ratePct: invoice > 0 ? (fee / invoice) * 100 : 0,
		payout: invoice - fee,
		capped: uncapped > FEE_CAP
	};
}
