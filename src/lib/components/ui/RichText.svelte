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
			segment.style === 'italic' && 'italic',
			segment.boxed &&
				'mx-[0.06em] inline-block rounded-[0.14em] border-[0.055em] border-current px-[0.14em] leading-[0.92]'
		]}>{segment.text}</span
	>{/each}
