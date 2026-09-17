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
			// The box is always the accent field, never the run's own colour: the
			// client hero rings "carpenter" in orange but leaves the word white.
			// Measured off Figma 4612:24477 — the stroke is a 1px hairline against
			// a ~77px face (0.013em) and the corner is 14.5px (0.19em). `max()`
			// keeps the hairline visible once the clamped heading drops below 77px.
			segment.boxed &&
				'mx-[0.06em] inline-block rounded-[0.19em] border-[max(1px,0.013em)] border-accent px-[0.14em] leading-[0.92]'
		]}>{segment.text}</span
	>{/each}
