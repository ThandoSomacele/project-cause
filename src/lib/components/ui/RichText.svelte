<script lang="ts">
	import type { Segment } from '$lib/types';

	let {
		segments,
		accentClass = 'text-accent'
	}: {
		segments: readonly Segment[];
		/** Overridable so accent runs can be re-toned on dark panels. */
		accentClass?: string;
	} = $props();
</script>

{#each segments as segment (segment.text)}<span
		class={[
			segment.tone === 'accent' && accentClass,
			segment.weight === 'strong' && 'font-bold',
			segment.style === 'italic' && 'italic'
		]}>{segment.text}</span
	>{/each}
