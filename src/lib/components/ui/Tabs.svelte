<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Tab {
		id: string;
		label: string;
	}

	interface Props {
		tabs: readonly Tab[];
		/** Rendered once per tab; receives the tab id. */
		panel: Snippet<[string]>;
		label: string;
	}

	let { tabs, panel, label }: Props = $props();

	// Null until the reader picks one, so the default tracks `tabs` rather than
	// capturing whatever the first entry happened to be at mount.
	let picked = $state<string | null>(null);
	const selected = $derived(picked ?? tabs[0].id);
	let buttons: HTMLButtonElement[] = $state([]);

	function select(index: number) {
		const next = tabs[(index + tabs.length) % tabs.length];
		picked = next.id;
		buttons[tabs.indexOf(next)]?.focus();
	}

	function onkeydown(event: KeyboardEvent, index: number) {
		const keys: Record<string, number> = {
			ArrowRight: index + 1,
			ArrowLeft: index - 1,
			Home: 0,
			End: tabs.length - 1
		};

		if (!(event.key in keys)) return;
		event.preventDefault();
		select(keys[event.key]);
	}
</script>

<div class="flex justify-center">
	<div
		role="tablist"
		aria-label={label}
		class="flex w-full max-w-[790px] gap-1 rounded-full bg-line-strong p-2 sm:gap-2"
	>
		{#each tabs as tab, i (tab.id)}
			<button
				bind:this={buttons[i]}
				type="button"
				role="tab"
				id="tab-{tab.id}"
				aria-selected={selected === tab.id}
				aria-controls="panel-{tab.id}"
				tabindex={selected === tab.id ? 0 : -1}
				onclick={() => (picked = tab.id)}
				onkeydown={(e) => onkeydown(e, i)}
				class={[
					'flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[15px]',
					'transition-colors sm:px-5 sm:text-[17px]',
					selected === tab.id
						? 'bg-ink font-medium text-white'
						: 'bg-white text-ink/70 hover:bg-white hover:text-ink'
				]}
			>
				<img
					src="/icons/{tab.id === 'credits' ? 'credits' : tab.id === 'jobs' ? 'jobs' : 'support'}.svg"
					alt=""
					aria-hidden="true"
					width="32"
					height="32"
					class={['hidden h-8 w-8 shrink-0 object-contain sm:block', selected === tab.id && 'invert']}
				/>
				{tab.label}
			</button>
		{/each}
	</div>
</div>

{#each tabs as tab (tab.id)}
	<div
		role="tabpanel"
		id="panel-{tab.id}"
		aria-labelledby="tab-{tab.id}"
		hidden={selected !== tab.id}
		tabindex="0"
	>
		{@render panel(tab.id)}
	</div>
{/each}
