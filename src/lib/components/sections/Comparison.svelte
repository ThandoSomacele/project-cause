<script lang="ts">
	import { comparison } from '$lib/data/content';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<section data-section="comparison" class="relative overflow-hidden bg-surface py-16 lg:pt-[min(9.05vw,129px)] lg:pb-[min(7.3vw,104px)]">
	<div class="container-page relative">
		<div class="relative">
			<SectionHeading
				lines={comparison.heading}
				indents={['lg:pl-[10.4%]', 'lg:pl-[44%]']}
				ruleAfter={1}
			/>
		</div>

		<div class="relative mt-12 lg:mt-[min(6.53vw,93px)]">
			<div class="grid overflow-hidden rounded-[16px] lg:grid-cols-[42.9%_57.1%]">
				<!-- The alternatives -->
				<div class="bg-line p-8 sm:p-10 lg:min-h-[min(28.07vw,400px)]">
					<div class="flex items-center gap-4">
						<!-- A list mark, matching the design. Inline so it takes the panel's
						     muted ink rather than shipping another flat asset. -->
						<svg
							width="44"
							height="44"
							viewBox="0 0 24 24"
							fill="none"
							aria-hidden="true"
							class="h-11 w-11 shrink-0 text-ink/55"
						>
							<rect x="2.5" y="3.5" width="19" height="17" rx="3" stroke="currentColor" stroke-width="1.6" />
							<circle cx="7.2" cy="8.6" r="1.25" fill="currentColor" />
							<circle cx="7.2" cy="12" r="1.25" fill="currentColor" />
							<circle cx="7.2" cy="15.4" r="1.25" fill="currentColor" />
							<path d="M10.8 8.6h6.4M10.8 12h6.4M10.8 15.4h6.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
						</svg>
						<h3 class="text-h3 font-bold text-muted-dark">{comparison.alternatives.title}</h3>
					</div>

					<ul class="mt-8 flex flex-col gap-4 lg:pl-14">
						{#each comparison.alternatives.items as item (item)}
							<li class="flex items-start gap-4 text-[15px] leading-6 text-ink/70">
								<svg
									width="25"
									height="25"
									viewBox="0 0 24 24"
									fill="none"
									aria-hidden="true"
									class="mt-0.5 shrink-0"
								>
									<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
									<path
										d="M12 7v6m0 3.5v.5"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
									/>
								</svg>
								<span class="max-w-[16rem]">{item}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- How we're better -->
				<div class="relative bg-ink p-8 text-white sm:p-10 lg:min-h-[min(28.07vw,400px)]">
					<div class="flex items-center gap-4">
						<!-- Trophy, per the design. Inline and in brand orange: the flat
						     asset had to be inverted to show on navy, which flattened it to a
						     white blob and lost all its detail. -->
						<svg
							width="48"
							height="48"
							viewBox="0 0 24 24"
							fill="none"
							aria-hidden="true"
							class="h-12 w-12 shrink-0 text-accent"
						>
							<path d="M7 4h10v6a5 5 0 0 1-10 0V4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
							<path d="M7 5.5H4.6v1.6A3.4 3.4 0 0 0 7 10.4M17 5.5h2.4v1.6a3.4 3.4 0 0 1-2.4 3.3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
							<path d="M12 15v3M8.5 20h7M9.5 18h5l.6 2h-6.2l.6-2Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
							<path d="m12 6.2.85 1.72 1.9.28-1.37 1.34.32 1.89L12 10.54l-1.7.89.33-1.89-1.38-1.34 1.9-.28L12 6.2Z" fill="currentColor" />
						</svg>
						<h3 class="text-h3 font-bold text-accent-dark">{comparison.better.title}</h3>
					</div>

					<ul class="mt-7 flex flex-col gap-3.5 lg:pl-14">
						{#each comparison.better.items as item (item)}
							<li class="flex items-center gap-3.5 text-[15px]">
								<img
									src="/icons/check-circle.svg"
									alt=""
									aria-hidden="true"
									width="22"
									height="22"
									class="h-[22px] w-[22px] shrink-0"
								/>
								{item}
							</li>
						{/each}
					</ul>

					<div class="mt-8 lg:pl-14">
						<Button href={comparison.better.cta.href}>{comparison.better.cta.label}</Button>
					</div>
				</div>
			</div>

			<!-- Mascot straddles the panel edge in the design; decorative only. -->
			<img
				src="/images/mascot-thumbsup.svg"
				alt=""
				aria-hidden="true"
				width="505"
				height="489"
				loading="lazy"
				class="pointer-events-none absolute -top-[min(3.93vw,56px)] left-[79.2%] hidden w-[28.3%] lg:block"
			/>
		</div>
	</div>
</section>
