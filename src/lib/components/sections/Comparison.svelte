<script lang="ts">
	import { comparison } from '$lib/data/content';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	/** The client half of the page renders this same composition with its own
	 *  copy, so the content comes in as a prop rather than being imported here. */
	let {
		data = comparison,
		name = 'comparison',
		indents = ['lg:pl-[10.4%]', 'lg:pl-[44%]']
	}: {
		data?: typeof comparison;
		name?: string;
		indents?: [string, string];
	} = $props();
</script>

<section data-section={name} class="relative overflow-hidden bg-surface py-16 lg:pt-[min(9.05vw,129px)] lg:pb-[min(7.3vw,104px)]">
	<div class="container-page relative">
		<div class="relative">
			<SectionHeading
				lines={data.heading}
				weight="font-bold"
				{indents}
				ruleAfter={1}
			/>
		</div>

		<div class="relative mt-12 lg:mt-[min(6.53vw,93px)]">
			<div class="grid overflow-hidden rounded-[16px] lg:grid-cols-[42.9%_57.1%]">
				<!-- The alternatives -->
				<div class="bg-line p-8 sm:p-10 lg:min-h-[min(32.28vw,460px)]">
					<div class="flex items-center gap-4">
						<img
							src="/icons/alternative-list.svg"
							alt=""
							aria-hidden="true"
							width="55"
							height="55"
							class="h-[55px] w-[55px] shrink-0"
						/>
						<h3 class="text-h3 font-bold text-muted-dark">{data.alternatives.title}</h3>
					</div>

					<ul class="mt-8 flex flex-col gap-4 lg:pl-[15px]">
						{#each data.alternatives.items as item (item)}
							<li class="flex items-start gap-4 text-[15px] leading-6 text-ink/70">
								<img
									src="/icons/alternative-caution.svg"
									alt=""
									aria-hidden="true"
									width="25"
									height="24"
									class="mt-0.5 h-6 w-[25px] shrink-0"
								/>
								<span class="max-w-[16rem]">{item}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- How we're better -->
				<div
					class="relative flex flex-col bg-ink p-8 text-white sm:p-10 lg:min-h-[min(32.28vw,460px)] lg:gap-[25.5%]"
				>
					<!-- The list icons are centred under the heading mark and the button
					     sits on their left edge, which is how the design lines the panel up:
					     indent = (mark width - list icon width) / 2, so 20px here for the
					     64px trophy over a 24px check, and 15px opposite for the 55px list
					     mark over a 25px caution. The old flat pl-14 matched neither.

					     Heading and list are one flex child so the column carries a single
					     gap rather than two. 25.5% of the panel's content height is the
					     96.8px the design leaves between the last check and the button, in a
					     460px panel. The list's own 24px spacing and that panel height come
					     from the same screenshot — at the old 400px/14px the button had
					     nowhere to sit. -->
					<div>
						<div class="flex items-center gap-4">
							<img
								src="/icons/better-trophy.svg"
								alt=""
								aria-hidden="true"
								width="64"
								height="71"
								class="w-[64px] shrink-0"
							/>
							<h3 class="text-h3 font-bold text-accent-dark">{data.better.title}</h3>
						</div>

						<ul class="mt-7 flex flex-col gap-3.5 lg:gap-6 lg:pl-5">
							{#each data.better.items as item (item)}
								<li class="flex items-center gap-3.5 text-[15px]">
									<img
										src="/icons/better-check.svg"
										alt=""
										aria-hidden="true"
										width="24"
										height="24"
										class="h-6 w-6 shrink-0"
									/>
									{item}
								</li>
							{/each}
						</ul>
					</div>

					<div class="mt-8 lg:mt-0 lg:pl-5">
						<Button href={data.better.cta.href}>{data.better.cta.label}</Button>
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
