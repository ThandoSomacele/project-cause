<script lang="ts">
	import { comparison } from '$lib/data/content';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<section data-section="comparison" class="relative overflow-hidden bg-surface py-16 lg:py-[104px]">
	<div class="container-page relative">
		<div class="relative">
			<SectionHeading lines={comparison.heading} indents={['lg:pl-[10.4%]', 'lg:pl-[44%]']} />
			<!-- Rule running off the right edge, as in the design. -->
			<div
				class="pointer-events-none absolute right-[-50vw] bottom-[10px] hidden h-px w-[50vw] bg-accent lg:block"
				aria-hidden="true"
			></div>
		</div>

		<div class="relative mt-12 lg:mt-16">
			<div class="grid overflow-hidden rounded-[16px] lg:grid-cols-[42.9%_57.1%]">
				<!-- The alternatives -->
				<div class="bg-line p-8 sm:p-10 lg:min-h-[400px]">
					<div class="flex items-center gap-4">
						<img
							src="/icons/wrench.svg"
							alt=""
							aria-hidden="true"
							width="55"
							height="55"
							class="h-11 w-11 shrink-0 object-contain"
						/>
						<h3 class="text-h3 font-bold text-ink/70">{comparison.alternatives.title}</h3>
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
				<div class="relative bg-ink p-8 text-white sm:p-10 lg:min-h-[400px]">
					<div class="flex items-center gap-4">
						<img
							src="/icons/jobs.svg"
							alt=""
							aria-hidden="true"
							width="55"
							height="55"
							class="h-12 w-12 shrink-0 object-contain brightness-0 invert"
						/>
						<h3 class="text-h3 font-bold">{comparison.better.title}</h3>
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
				src="/images/mascot-thumbsup.webp"
				alt=""
				aria-hidden="true"
				width="320"
				height="320"
				loading="lazy"
				class="pointer-events-none absolute -top-[63px] right-[-6%] hidden w-[26.6%] lg:block"
			/>
		</div>
	</div>
</section>
