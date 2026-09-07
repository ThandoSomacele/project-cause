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
		class?: string;
		id?: string;
	}

	let { lines, indents = [], ruleAfter, class: className = '', id }: Props = $props();
</script>

<h2 {id} class={['text-h2 font-light text-ink', className]}>
	{#each lines as line, i (i)}
		<span class={['block', indents[i]]}>
			{#if ruleAfter === i}
				<span class="flex items-baseline">
					<span class="shrink-0"><RichText segments={line} /></span>
					<!-- Sits on the baseline and runs off-canvas, as in the design. -->
					<span class="-mr-[50vw] h-[2px] flex-1 bg-accent" aria-hidden="true"
					></span>
				</span>
			{:else}
				<RichText segments={line} />
			{/if}
		</span>
	{/each}
</h2>
