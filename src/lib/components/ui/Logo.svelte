<script lang="ts">
	interface Props {
		/**
		 * `mark` is the elephant silhouette on its own (the nav treatment).
		 * `lockup` is the full brand lockup — mark plus wordmark — supplied as
		 * vector artwork, so it is used rather than setting the wordmark in a
		 * substitute typeface.
		 */
		variant?: 'mark' | 'lockup';
		/** Lockup colourway. The mark takes the surrounding text colour instead. */
		tone?: 'navy' | 'white';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let { variant = 'mark', tone = 'navy', size = 'lg', class: className = '' }: Props = $props();

	// The mark's aspect ratio is 1.176:1.
	const marks = {
		sm: 'h-[36px] w-[42px]',
		md: 'h-[40px] w-[47px]',
		lg: 'h-[42px] w-[49px]'
	};

	// The lockup is 557.24 x 138.91 — a 4.01:1 ratio.
	const lockups = {
		sm: 'h-[30px] w-[120px]',
		md: 'h-[38px] w-[152px]',
		lg: 'h-[42px] w-[168px]'
	};
</script>

{#if variant === 'lockup'}
	<img
		src={tone === 'white' ? '/brand/logo-white.svg' : '/brand/logo-navy.svg'}
		alt="Cause"
		width="557"
		height="139"
		class={[lockups[size], 'block object-contain', className]}
	/>
{:else}
	<span class={['inline-flex items-center', className]}>
		<span class={['logo-mark block shrink-0', marks[size]]} aria-hidden="true"></span>
		<span class="sr-only">Cause</span>
	</span>
{/if}
