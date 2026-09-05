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
		class?: string;
		id?: string;
	}

	let { lines, indents = [], class: className = '', id }: Props = $props();
</script>

<h2 {id} class={['text-h2 font-light text-ink', className]}>
	{#each lines as line, i (i)}
		<span class={['block', indents[i]]}>
			<RichText segments={line} />
		</span>
	{/each}
</h2>
