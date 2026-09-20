const NBSP = ' ';

const zar = new Intl.NumberFormat('en-ZA', {
	style: 'currency',
	currency: 'ZAR',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

const zarWhole = new Intl.NumberFormat('en-ZA', {
	style: 'currency',
	currency: 'ZAR',
	maximumFractionDigits: 0
});

/**
 * en-ZA formats ZAR as "R<nbsp>10<nbsp>000,00" — non-breaking-space grouping
 * with a comma decimal. The design uses a dot decimal ("R 20 000.00"), so swap
 * the decimal mark while keeping the locale's non-breaking grouping, which also
 * stops amounts wrapping mid-number.
 */
function toDesignConvention(value: string): string {
	return value.replace(/,/g, '.');
}

/** e.g. 10000 -> "R 10 000.00" */
export function formatZar(amount: number): string {
	return toDesignConvention(zar.format(amount));
}

/** e.g. 20000 -> "R 20 000" — the slider end labels. */
export function formatZarWhole(amount: number): string {
	return toDesignConvention(zarWhole.format(amount));
}

/**
 * The design sets amounts tight against the R — "R20 000.00", "R200.00" — in
 * every place but the exact-amount field, which keeps the locale's space. Only
 * the first non-breaking space is dropped; the ones grouping the digits stay,
 * so the number still will not wrap mid-way.
 */
export function formatZarTight(amount: number): string {
	return formatZar(amount).replace(NBSP, '');
}

/** e.g. 1000 -> "R1 000" — the quick-select chips and the slider's floor. */
export function formatZarWholeTight(amount: number): string {
	return formatZarWhole(amount).replace(NBSP, '');
}

/** e.g. 4.8 -> "4.8" */
export function formatPct(value: number): string {
	return value.toFixed(1);
}

/**
 * Parse what someone might type into the exact-amount field.
 * Following the design's own convention, spaces and commas group digits and
 * the dot is the decimal separator, so "R 20 000.00" and "10,000.50" both work.
 */
export function parseAmount(input: string): number {
	const cleaned = input.replace(/[^\d.]/g, '');
	if (cleaned === '') return 0;

	const parts = cleaned.split('.');
	if (parts.length <= 1) return Number(cleaned);

	const decimals = parts.pop() as string;
	return Number(`${parts.join('')}.${decimals}`);
}

export { NBSP };
