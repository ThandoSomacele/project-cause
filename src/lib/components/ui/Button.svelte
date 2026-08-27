<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Renders an anchor when set, a button otherwise. */
		href?: string;
		type?: 'button' | 'submit';
		variant?: 'primary' | 'dark' | 'white' | 'outline';
		size?: 'md' | 'lg';
		disabled?: boolean;
		class?: string;
		children: Snippet;
	}

	let {
		href,
		type = 'button',
		variant = 'primary',
		size = 'md',
		disabled = false,
		class: className = '',
		children
	}: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] font-medium ' +
		'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60';

	const variants = {
		primary: 'bg-accent text-white hover:bg-accent-dark',
		dark: 'bg-ink text-white hover:bg-ink-800',
		white: 'bg-white text-ink hover:bg-cream',
		// The nav CTA is the one pill-shaped button in the design.
		outline: 'rounded-full border border-accent text-ink hover:bg-accent hover:text-white'
	};

	const sizes = {
		md: 'px-6 py-3 text-[15px]',
		lg: 'px-8 py-3.5 text-base'
	};

	const classes = $derived([base, variants[variant], sizes[size], className]);
</script>

{#if href}
	<a {href} class={classes} aria-disabled={disabled || undefined}>{@render children()}</a>
{:else}
	<button {type} {disabled} class={classes}>{@render children()}</button>
{/if}
