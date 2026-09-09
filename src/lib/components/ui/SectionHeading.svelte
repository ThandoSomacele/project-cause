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
		 * widths at 56px were 5px, 6px and 8px respectively.
		 */
		weight?: string;
		class?: string;
		id?: string;
	}

	let {
		lines,
		indents = [],
		ruleAfter,
		weight = 'font-light',
		class: className = '',
		id
	}: Props = $props();
</script>

<h2 {id} class={['text-h2 text-ink', weight, className]}>
	{#each lines as line, i (i)}
		<span class={['block', indents[i]]}>
			{#if ruleAfter === i}
				<span class="flex items-baseline">
					<span class="shrink-0"><RichText segments={line} /></span>
					<!-- Runs off-canvas, and is centred on the trailing dots rather than
					     sitting on the baseline: in the design the rule and the four
					     periods share a centre line (y2344 on the 1:1 render), which puts
					     it about half a dot above the baseline. The offset is in em so it
					     tracks the heading as the type scales. -->
					<span class="-mr-[50vw] mb-[0.114em] h-[3px] flex-1 bg-accent" aria-hidden="true"
					></span>
				</span>
			{:else}
				<RichText segments={line} />
			{/if}
		</span>
	{/each}
</h2>
