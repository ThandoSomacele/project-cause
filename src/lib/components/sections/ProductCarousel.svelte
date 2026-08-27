<script lang="ts">
	import { carousel } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Carousel from '$lib/components/ui/Carousel.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const shots: Record<string, string> = {
		quotes: '/images/dashboard-quotes.webp',
		requests: '/images/dashboard-requests.webp',
		payouts: '/images/dashboard-quotes.webp'
	};
</script>

<section data-section="carousel" class="relative overflow-hidden bg-surface py-16 lg:py-[104px]">
	<div class="container-page relative">
		<div class="relative">
			<SectionHeading lines={carousel.heading} indents={[7.5, 42.5, 52.3]} />
			<div
				class="pointer-events-none absolute bottom-[26px] left-[-50vw] hidden h-px w-[50vw] bg-accent lg:block"
				aria-hidden="true"
			></div>
		</div>

		<div class="mt-12 lg:mt-20">
			<Carousel count={carousel.slides.length} label="How Cause works for service providers">
				{#snippet slide(i)}
					{@const item = carousel.slides[i]}
					<div class="relative grid overflow-hidden rounded-[16px] bg-ink lg:min-h-[593px] lg:grid-cols-[45%_55%]">
						<div class="relative z-10 px-8 py-12 text-white sm:px-12 lg:py-[130px] lg:pl-14">
							<h3 class="max-w-[28rem] text-[clamp(1.75rem,1.35rem+1.6vw,2.875rem)] leading-[1.12] font-normal">
								<RichText segments={item.title} accentClass="text-accent" />
							</h3>

							<ul class="mt-7 flex flex-col gap-3">
								{#each item.items as line (line)}
									<li class="flex items-start gap-3 text-[15px]">
										<svg
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											aria-hidden="true"
											class="mt-1 shrink-0 text-accent"
										>
											<circle cx="12" cy="12" r="11" fill="currentColor" />
											<path
												d="m7 12.5 3.2 3.2L17 9"
												stroke="#0a1538"
												stroke-width="2.2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
										{line}
									</li>
								{/each}
							</ul>

							<div class="mt-9">
								<Button href={item.cta.href} variant="white">{item.cta.label}</Button>
							</div>
						</div>

						<div class="relative min-h-[240px] bg-[#f1f1f3]">
							<img
								src={shots[item.image]}
								alt="The Cause dashboard"
								width="1600"
								height="830"
								loading="lazy"
								class="absolute inset-0 h-full w-full object-cover object-left"
							/>
						</div>

						<img
							src="/images/mascot-wave.webp"
							alt=""
							aria-hidden="true"
							width="412"
							height="380"
							loading="lazy"
							class="pointer-events-none absolute bottom-0 left-[36.6%] hidden w-[34.3%] lg:block"
						/>
					</div>
				{/snippet}
			</Carousel>
		</div>
	</div>
</section>
