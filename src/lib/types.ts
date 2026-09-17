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
	/** `boxed` draws the design's rectangular outline around a run, always in
	 *  the accent colour regardless of the run's own tone — the client
	 *  hero rings "carpenter" to mark it as the interchangeable trade. */
	boxed?: boolean;
}

export type Line = readonly Segment[];
