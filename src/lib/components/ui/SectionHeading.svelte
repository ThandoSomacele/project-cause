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
		 * rows. Off by default, and gated at md rather than lg so the breaks
		 * come back at the same width the decorations do. A heading with a
		 * `ruleAfter` can take it: its rule and terminal drop out while the
		 * lines are flowing, since there is no end of a line for them to
		 * leave from.
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
				<!-- Flowing, the rule has to go: it runs off the right edge from the
				     end of a line, and there is no end of a line to leave from once
				     the heading is one wrapping sentence. It comes back with the row
				     at md, the width the breaks come back at. -->
				<span class={[flow ? 'md:flex' : 'flex', 'items-baseline']}>
					<span class="shrink-0"><RichText segments={line} /></span>
					<!-- Measured off the supplied artwork (Figma "Vector 21", 350x11): an
					     11px round terminal with a 2px stroke leaving from its centre. The
					     heading's own periods stop at three — the fourth mark the eye counts
					     in a render of this line is this terminal, which is what sent the
					     copy to four periods and back again.

					     The terminal hangs off the rule rather than sitting beside it in
					     the row: aligning two items to a shared baseline and then nudging
					     one onto the other's centre line left them 0.9px apart however the
					     margin was set, because a flex item with no text of its own aligns
					     by its bottom margin edge. Positioned inside, the two share a
					     centre by construction, and the rule leaves from the dot's centre
					     the way the artwork does.

					     Everything is in em so it tracks the heading as the type scales:
					     the 11px terminal against the 56px face is 0.196em, and the left
					     margin carries the gap plus the half-dot the rule now starts
					     inside of. -->
					<span
						class={[
							flow && 'hidden md:block',
							'relative -mr-[50vw] mb-[0.114em] ml-[0.288em] h-[2px] flex-1 -translate-y-[0.064em] bg-accent'
						]}
						aria-hidden="true"
					>
						<span
							class="absolute top-1/2 left-0 h-[0.196em] w-[0.196em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
						></span>
					</span>
				</span>
			{:else}
				<RichText segments={line} />{flow && i < lines.length - 1 ? ' ' : ''}
			{/if}
		</span>
	{/each}
</h2>
