<script lang="ts">
	import type { FaqItem } from '$lib/data/faq';

	let { items }: { items: readonly FaqItem[] } = $props();

	let open = $state<number | null>(null);

	// The page renders this component twice — once per audience — so the ids have
	// to be unique per instance. `$props.id()` gives each mount its own prefix and
	// stays stable across SSR and hydration, which a counter or a random value
	// would not.
	const uid = $props.id();
</script>

<ul class="rounded-[16px] bg-[#f7f6f2] px-6 py-2 sm:px-12">
	{#each items as item, i (item.question)}
		<li class={i > 0 ? 'border-t border-ink/10' : ''}>
			<h3>
				<button
					type="button"
					onclick={() => (open = open === i ? null : i)}
					aria-expanded={open === i}
					aria-controls="{uid}-panel-{i}"
					id="{uid}-button-{i}"
					class="flex w-full items-center justify-between gap-6 py-6 text-left"
				>
					<span class="text-[16px] font-medium text-ink">{item.question}</span>
					<span
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							aria-hidden="true"
							class={['transition-transform duration-200', open === i && 'rotate-90']}
						>
							<path
								d="m9 5 7 7-7 7"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
				</button>
			</h3>

			<div
				id="{uid}-panel-{i}"
				role="region"
				aria-labelledby="{uid}-button-{i}"
				hidden={open !== i}
				class="pb-6"
			>
				<p class="max-w-[52rem] text-[15px] leading-7 text-muted">{item.answer}</p>
			</div>
		</li>
	{/each}
</ul>
