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
			// Measured off Figma 4612:24477. The run inside the box is set SMALLER
			// than the heading around it — x-height 35.0 against 41.7, so 0.839em —
			// which is also what keeps the box inside the heading's 780px column
			// instead of wrapping. Everything else is in the box's own em: a 1px
			// hairline stroke, a 14.5px corner, and 20.4px of side padding, all
			// taken off the design's 390x78 frame. `max()` holds the hairline at a
			// visible pixel once the clamped heading drops below its design size.
			// The left margin carries the whole gap before the box — there is no
			// space character in front of it — because that gap is what puts the
			// middle dot of the ellipsis on the connector's axis, which is how the
			// design lines the two up. 0.2336em of the box's own face measures
			// 15.5px here, against the ~20.5px a plain space would set.
			segment.boxed &&
				'mr-[0.053em] ml-[0.4047em] inline-block rounded-[0.226em] border-[max(1px,0.0158em)] border-accent px-[0.44em] text-[0.839em] leading-[1.183]'
		]}>{segment.text}</span
	>{/each}
