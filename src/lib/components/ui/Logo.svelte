<script lang="ts">
	interface Props {
		/** Height in px; width follows the mark's 1.176 aspect ratio. */
		size?: number;
		/** Show the "cause" wordmark alongside the mark. */
		wordmark?: boolean;
		class?: string;
	}

	let { size = 42, wordmark = false, class: className = '' }: Props = $props();

	// The mark ships as a flat #0A1538 silhouette with transparent cut-outs, so
	// masking it lets one file take the surrounding text colour — navy in the
	// nav, near-white in the footer.
	const mask =
		'mask-image:url(/brand/logo-mark.png);mask-size:contain;mask-repeat:no-repeat;mask-position:center;' +
		'-webkit-mask-image:url(/brand/logo-mark.png);-webkit-mask-size:contain;-webkit-mask-repeat:no-repeat;-webkit-mask-position:center';

	const width = $derived(Math.round(size * 1.176));
</script>

<span class={['inline-flex items-center gap-3', className]}>
	<span
		class="block shrink-0 bg-current"
		style="{mask};height:{size}px;width:{width}px"
		aria-hidden="true"
	></span>
	{#if wordmark}
		<span
			class="font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] lowercase"
			>cause</span
		>
	{/if}
	<span class="sr-only">Cause</span>
</span>
