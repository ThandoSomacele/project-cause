<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		count: number;
		label: string;
		slide: Snippet<[number]>;
	}

	let { count, label, slide }: Props = $props();

	let index = $state(0);
	let dots: HTMLButtonElement[] = $state([]);

	function go(next: number, focus = false) {
		index = (next + count) % count;
		if (focus) dots[index]?.focus();
	}

	// Arrow keys live on the dots, which are real buttons — attaching them to the
	// wrapper would put keyboard behaviour on a non-interactive element.
	function onkeydown(event: KeyboardEvent) {
		const moves: Record<string, number> = {
			ArrowRight: index + 1,
			ArrowLeft: index - 1,
			Home: 0,
			End: count - 1
		};
		if (!(event.key in moves)) return;
		event.preventDefault();
		go(moves[event.key], true);
	}
</script>

<div role="group" aria-roledescription="carousel" aria-label={label}>
	<div aria-live="polite">
		{#each { length: count } as _, i (i)}
			<div
				role="group"
				aria-roledescription="slide"
				aria-label="Slide {i + 1} of {count}"
				hidden={i !== index}
			>
				{@render slide(i)}
			</div>
		{/each}
	</div>

	<div class="mt-8 flex items-center justify-center gap-3">
		{#each { length: count } as _, i (i)}
			<button
				bind:this={dots[i]}
				type="button"
				onclick={() => go(i)}
				{onkeydown}
				aria-label="Show slide {i + 1}"
				aria-current={i === index}
				class={[
					'h-4 w-4 rounded-full border-2 border-ink transition-colors',
					i === index ? 'bg-ink' : 'bg-transparent hover:bg-ink/20'
				]}
			></button>
		{/each}
	</div>
</div>
