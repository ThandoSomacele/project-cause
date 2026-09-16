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

<section data-section="carousel" class="relative overflow-hidden bg-white py-16 lg:py-[min(7.3vw,104px)]">
	<div class="container-page relative">
		<div class="relative">
			<SectionHeading
				lines={carousel.heading}
				weight="font-medium"
				indents={['lg:pl-[7.5%]', 'lg:pl-[42.5%]', 'lg:pl-[52.3%]']}
			/>

			<!-- Rule running in from the page edge, stopping at "talk" with a dot.
			     Measured off the design at y443..445 against a line-3 baseline of
			     y431.6, so its centre sits 8.5px below that baseline. Line 3's
			     baseline is 2L + (L - 1.21em)/2 + 0.9688em = 2.9388em at L = 1.03em,
			     which puts the 3px rule's top at 2.9388em + 7px. Derived from the
			     heading's own token so it tracks the clamp instead of drifting. -->
			<div
				class="pointer-events-none absolute top-[calc(2.9388*var(--text-h2)_+_7px)] right-[48.2%] left-[-50vw] hidden h-[3px] bg-accent md:block"
				aria-hidden="true"
			>
				<span class="absolute -top-[5px] -right-[6px] h-3 w-3 rounded-full bg-accent"></span>
			</div>

			<!-- Circle closing the heading: sits after "clients" and rides above the
			     baseline so it reads as raised against the "s", not inline with it. -->
			<span
				class="pointer-events-none absolute top-[min(8.7vw,124px)] left-[92.5%] hidden h-[18px] w-[18px] rounded-full bg-accent lg:block"
				aria-hidden="true"
			>
				<!-- The disc carries the brand mark in white, not a flat fill: sampled
				     on the design it is 29x29 with 140 white pixels inside, about 17%
				     of its area, which puts the glyph's box at ~21% inset each side.
				     `.logo-mark` masks the mark with currentColor, so it takes the
				     white from this span rather than shipping a second asset. -->
				<span class="logo-mark absolute inset-[21%] text-white"></span>
			</span>
		</div>

		<div class="mt-12 lg:mt-20">
			<Carousel count={carousel.slides.length} label="How Cause works for service providers">
				{#snippet slide(i)}
					{@const item = carousel.slides[i]}
					<div class="relative grid overflow-hidden rounded-[16px] bg-ink lg:min-h-[min(41.61vw,593px)] lg:grid-cols-[45%_55%]">
						<div class="relative z-10 px-8 py-12 text-white sm:px-12 lg:py-[min(9.12vw,130px)] lg:pl-14">
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

						<div class="relative min-h-[min(16.84vw,240px)] bg-[#f1f1f3]">
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
							src="/images/mascot-wave.svg"
							alt=""
							aria-hidden="true"
							width="629"
							height="608"
							loading="lazy"
							class="pointer-events-none absolute top-[40.6%] left-[32.3%] hidden w-[37.5%] lg:block"
						/>
					</div>
				{/snippet}
			</Carousel>
		</div>
	</div>
</section>
