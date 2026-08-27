/** A run of text within a heading. The design mixes weight, colour and style
 *  mid-sentence, so headings are modelled as segment arrays rather than strings. */
export interface Segment {
	text: string;
	/** `accent` renders the run in brand orange. */
	tone?: 'accent';
	/** `strong` renders the run at the heavier weight used in the design. */
	weight?: 'strong';
	/** `italic` matches the design's italic runs ("Choose", "Shift", "lets you"). */
	style?: 'italic';
}

export type Line = readonly Segment[];
