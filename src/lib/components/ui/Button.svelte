<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Renders an anchor when set, a button otherwise. */
		href?: string;
		type?: 'button' | 'submit';
		variant?: 'primary' | 'accent-ink' | 'dark' | 'white' | 'outline';
		size?: 'md' | 'lg' | 'form';
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
		// The get-paid CTA sets its label in ink on the orange, not white —
		// sampled #0A1538 on #FF8404 off the Figma render.
		'accent-ink': 'bg-accent text-ink hover:bg-accent-dark hover:text-white',
		dark: 'bg-ink text-white hover:bg-ink-800',
		white: 'bg-white text-ink hover:bg-cream',
		// The nav CTA is the one pill-shaped button in the design.
		outline: 'rounded-full border border-accent text-ink hover:bg-accent hover:text-white'
	};

	const sizes = {
		md: 'px-6 py-3 text-[15px]',
		lg: 'px-8 py-3.5 text-base',
		// The waitlist submit is taller and wider than a body button in every
		// frame that carries one — 153x56 against this md size's 135x47 — and it
		// has to match the field it sits beside.
		form: 'px-[33px] py-[16.5px] text-[15px]'
	};

	const classes = $derived([base, variants[variant], sizes[size], className]);
</script>

{#if href}
	<a {href} class={classes} aria-disabled={disabled || undefined}>{@render children()}</a>
{:else}
	<button {type} {disabled} class={classes}>{@render children()}</button>
{/if}
