<script lang="ts">
	import { nav } from '$lib/data/site';
	import Button from '$lib/components/ui/Button.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';

	interface Props {
		open: boolean;
		onclose: () => void;
	}

	let { open, onclose }: Props = $props();

	let panel = $state<HTMLElement | null>(null);

	// Lock the page behind the drawer, and restore the scrollbar gutter so the
	// page underneath doesn't shift when it opens.
	$effect(() => {
		if (!open) return;

		const { body } = document;
		const gutter = window.innerWidth - document.documentElement.clientWidth;
		const previous = { overflow: body.style.overflow, padding: body.style.paddingRight };

		body.style.overflow = 'hidden';
		if (gutter > 0) body.style.paddingRight = `${gutter}px`;

		return () => {
			body.style.overflow = previous.overflow;
			body.style.paddingRight = previous.padding;
		};
	});

	// Move focus into the drawer when it opens.
	$effect(() => {
		if (open && panel) {
			panel.querySelector<HTMLElement>('a, button')?.focus();
		}
	});

	function focusables(): HTMLElement[] {
		if (!panel) return [];
		return [...panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onclose();
			return;
		}

		if (event.key !== 'Tab') return;

		const items = focusables();
		if (items.length === 0) return;

		const first = items[0];
		const last = items[items.length - 1];
		const active = document.activeElement;

		if (event.shiftKey && active === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && active === last) {
			event.preventDefault();
			first.focus();
		}
	}
</script>

<svelte:window onkeydown={open ? onkeydown : undefined} />

{#if open}
	<!-- Scrim. The drawer itself carries the dialog semantics. -->
	<button
		type="button"
		class="fixed inset-0 z-40 bg-ink/60 lg:hidden"
		aria-label="Close menu"
		onclick={onclose}
	></button>

	<div
		bind:this={panel}
		role="dialog"
		aria-modal="true"
		aria-label="Site menu"
		class="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col gap-8 bg-white
		       px-6 py-6 shadow-2xl lg:hidden"
	>
		<div class="flex items-center justify-between">
			<Logo size="sm" class="text-ink" />
			<button
				type="button"
				onclick={onclose}
				class="-mr-2 rounded-lg p-2 text-ink"
				aria-label="Close menu"
			>
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M6 6l12 12M18 6L6 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
			</button>
		</div>

		<nav aria-label="Primary">
			<ul class="flex flex-col gap-1">
				{#each nav as item (item.href)}
					<li>
						<a
							href={item.href}
							onclick={onclose}
							class="block rounded-lg px-2 py-3 text-lg text-ink hover:bg-surface"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<Button href="/#waitlist" variant="outline" class="w-full">Book Demo</Button>
	</div>
{/if}
