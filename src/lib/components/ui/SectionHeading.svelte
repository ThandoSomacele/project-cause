<script lang="ts">
	import RichText from '$lib/components/ui/RichText.svelte';
	import type { Line } from '$lib/types';

	interface Props {
		/** One entry per rendered line. */
		lines: readonly Line[];
		/**
		 * Per-line indent class, matching the staggered headings in the design.
		 * Passed as literal Tailwind classes (rather than numbers fed into a
		 * `style` attribute) so the stagger survives a strict CSP — and so
		 * Tailwind can see the arbitrary values at build time. Prefix them with
		 * `lg:` at the call site; below that the lines sit flush so they stay
		 * readable when they wrap.
		 */
		indents?: readonly string[];
		/**
		 * Index of the line that carries a rule running from the end of its text
		 * out past the right edge. It flows from the text rather than being
		 * positioned, so it always starts exactly where the words stop however
		 * the heading reflows.
		 */
		ruleAfter?: number;
		/**
		 * Base weight for the heading. The design is not uniform: measured off
		 * the 1:1 render, the hero, value-offering and get-paid headings run at
		 * Light, the carousel at Regular and the comparison at SemiBold. Stem
		 * widths at 56px were 5px, 6px and 8px respectively. The runs a heading
		 * emphasises go a step above whatever this sets, so setting it to Bold
		 * leaves them nothing to climb to — which is why the comparison headings
		 * read flat against their frames.
		 */
		weight?: string;
		/** Line-height override. The design is not uniform here either: the
		 *  carousel's heading runs a 66px pitch on a 56px face — 1.176em —
		 *  against the 1.03 the token sets for everything else. */
		leading?: string;
		/**
		 * Size override, replacing the `text-h2` token rather than sitting beside
		 * it — two font-size utilities on one element resolve by stylesheet order,
		 * not by class order, so the loser is not predictable. A caller setting
		 * this owns the tracking and the leading with it, since the token carried
		 * both.
		 */
		size?: string;
		/**
		 * Runs the lines inline below md so the heading reads as one sentence and
		 * wraps where it falls. The frames' line breaks are a desktop
		 * composition: in a narrow column they land on top of the wrapping the
		 * width already forces, which turns one sentence into several ragged
		 * rows. Off by default — a heading with a `ruleAfter` cannot take it,
		 * since its rule would end up mid-sentence — and gated at md rather than
		 * lg so the breaks come back at the same width the decorations do.
		 */
		flow?: boolean;
		class?: string;
		id?: string;
	}

	let {
		lines,
		indents = [],
		ruleAfter,
		weight = 'font-light',
		leading = '',
		size = 'text-h2',
		flow = false,
		class: className = '',
		id
	}: Props = $props();
</script>

<h2 {id} class={[size, 'text-ink', weight, leading, className]}>
	{#each lines as line, i (i)}
		<span class={[flow ? 'md:block' : 'block', indents[i]]}>
			{#if ruleAfter === i}
				<span class="flex items-baseline">
					<span class="shrink-0"><RichText segments={line} /></span>
					<!-- The rule is headed by its own round terminal, the way the
					     carousel's is: the frame sets three periods, then clear space, then
					     a dot about twice their size, and the stroke leaves from that dot's
					     centre. It used to be a bare stroke butted against a fourth period,
					     which is what that dot had been read as.

					     Both sit on the periods' centre line rather than the baseline —
					     0.205em above it — which is what `mb` buys in a baseline-aligned
					     row. Everything is in em so it tracks the heading as the type
					     scales. -->
					<span
						class="mb-[0.08em] ml-[0.19em] h-[0.25em] w-[0.25em] shrink-0 rounded-full bg-accent"
						aria-hidden="true"
					></span>
					<span
						class="-mr-[50vw] -ml-[0.125em] mb-[0.114em] h-[3px] flex-1 -translate-y-[0.064em] bg-accent"
						aria-hidden="true"
					></span>
				</span>
			{:else}
				<RichText segments={line} />{flow && i < lines.length - 1 ? ' ' : ''}
			{/if}
		</span>
	{/each}
</h2>
