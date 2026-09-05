<script lang="ts">
	import { nav } from '$lib/data/site';
	import Button from '$lib/components/ui/Button.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import MobileNav from './MobileNav.svelte';

	let open = $state(false);
</script>

<header class="sticky top-0 z-30 bg-white">
	<div class="container-wide flex h-[84px] items-center gap-10">
		<a href="/" class="text-ink" aria-label="Cause — home">
			<Logo size="lg" />
		</a>

		<nav aria-label="Primary" class="hidden lg:block">
			<ul class="flex items-center gap-9">
				{#each nav as item (item.href)}
					<li>
						<a
							href={item.href}
							class="text-[15px] text-ink transition-colors hover:text-accent-dark"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="ml-auto flex items-center gap-3">
			<Button href="#waitlist" variant="outline" class="hidden sm:inline-flex">Book Demo</Button>

			<button
				type="button"
				class="-mr-2 rounded-lg p-2 text-ink lg:hidden"
				aria-expanded={open}
				aria-haspopup="dialog"
				onclick={() => (open = true)}
			>
				<span class="sr-only">Open menu</span>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M4 7h16M4 12h16M4 17h16"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
			</button>
		</div>
	</div>
</header>

<MobileNav {open} onclose={() => (open = false)} />
