<script lang="ts">
	import RichText from '$lib/components/ui/RichText.svelte';
	import type { Line } from '$lib/types';

	interface Props {
		/** One entry per rendered line. */
		lines: readonly Line[];
		/**
		 * Per-line left indent as a percentage of the container, matching the
		 * staggered headings in the design. Applied from `lg` up only — below that
		 * the lines sit flush so they stay readable when they wrap.
		 */
		indents?: readonly number[];
		class?: string;
		id?: string;
	}

	let { lines, indents = [], class: className = '', id }: Props = $props();
</script>

<h2 {id} class={['text-h2 font-light text-ink', className]}>
	{#each lines as line, i (i)}
		<span class="block lg:[padding-left:var(--indent)]" style="--indent:{indents[i] ?? 0}%">
			<RichText segments={line} />
		</span>
	{/each}
</h2>
