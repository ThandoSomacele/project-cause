<script lang="ts">
	interface Props {
		/** Fixed sizes rather than a number, so the dimensions can live in classes
		 *  instead of a `style` attribute the CSP would have to allow. */
		size?: 'sm' | 'md' | 'lg';
		/** Show the "cause" wordmark alongside the mark. */
		wordmark?: boolean;
		class?: string;
	}

	let { size = 'lg', wordmark = false, class: className = '' }: Props = $props();

	// The mark's aspect ratio is 1.176:1.
	const marks = {
		sm: 'h-[36px] w-[42px]',
		md: 'h-[40px] w-[47px]',
		lg: 'h-[42px] w-[49px]'
	};
</script>

<span class={['inline-flex items-center gap-3', className]}>
	<span class={['logo-mark block shrink-0', marks[size]]} aria-hidden="true"></span>
	{#if wordmark}
		<span class="font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] lowercase"
			>cause</span
		>
	{/if}
	<span class="sr-only">Cause</span>
</span>
