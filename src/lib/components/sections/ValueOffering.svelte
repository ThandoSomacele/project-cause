<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import RichText from '$lib/components/ui/RichText.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import { valueOffering } from '$lib/data/content';

	const images: Record<string, string> = {
		credits: '/images/tab-credits.webp',
		jobs: '/images/worker-phone.webp',
		support: '/images/electricians.webp'
	};
</script>

<section data-section="value" class="relative overflow-hidden bg-white pt-[15.44vw] pb-0">
	<!-- The tools artwork spans the page behind the hero and only its lower band
	     shows here. 100vw wide at its natural 2.157:1, offset so its top lands
	     where the design places it (y549) while this section starts at y843 —
	     the hero covers the rest. Everything in vw so the band scales. -->
	<img
		src="/images/tools-flatlay.webp"
		alt=""
		aria-hidden="true"
		width="2200"
		height="1020"
		class="pointer-events-none absolute top-[-20.6vw] left-1/2 w-screen max-w-none -translate-x-1/2"
	/>
	<div class="container-page relative z-10">
		<!-- Decorative rules that run off-canvas in the design. Large screens only:
		     below that they collide with the wrapped heading. -->
		<!-- Decorative rules either side of the heading, matching the design: a
		     navy rule running in from the left screen edge and ending in a 10px
		     dot, and an orange one starting at a 16px dot directly beneath the
		     icon and running out past the right edge. The two dots are different
		     sizes in the design — measured at 10px and 16px on the 1:1 render. -->
		<!-- The navy rule no longer runs to the screen edge: it starts a quarter of
		     the way in from it. The dot stays put at `right: 74.4%`, so the gap has
		     to be derived from where the dot lands rather than set as a flat inset.

		       dot_x  = container_left + 0.256W,  container_left = 50vw - W/2
		       left_x = 0.25 x dot_x
		       left   = left_x - container_left = 0.439W - 37.5vw

		     which is calc(43.9% - 37.5vw), since 100% here is the container width.
		     Checked at 1024/1425/1920: the gap is 72.6 / 101.0 / 162.9px against
		     dots at 290.4 / 404.1 / 651.6 — a quarter of the run at every width. -->
		<div
			class="pointer-events-none absolute top-[min(9.05vw,129px)] right-[74.4%] left-[calc(43.9%_-_37.5vw)] hidden h-[2px] bg-ink md:block"
			aria-hidden="true"
		>
			<span class="absolute -top-[4px] -right-[3px] h-[10px] w-[10px] rounded-full bg-ink"></span>
		</div>

		<img
			src="/icons/reach-clients.svg"
			alt=""
			aria-hidden="true"
			width="63"
			height="63"
			class="pointer-events-none absolute top-[min(9.54vw,136px)] left-[83.6%] hidden w-[63px] lg:block"
		/>

		<div
			class="pointer-events-none absolute top-[min(14.67vw,209px)] right-[-50vw] left-[85.5%] hidden h-[2px] bg-accent md:block"
			aria-hidden="true"
		>
			<span class="absolute -top-[7px] left-0 h-4 w-4 rounded-full bg-accent"></span>
		</div>

		<SectionHeading
			lines={valueOffering.heading}
			weight="font-normal"
			indents={['lg:pl-[0.6%]', 'lg:pl-[26.3%]', 'lg:pl-[51.4%]']}
		/>

		<div class="mt-12 lg:mt-16">
			<Tabs tabs={valueOffering.tabs} label="What Cause gives you">
				{#snippet panel(id)}
					{@const tab = valueOffering.tabs.find((t) => t.id === id)!}
					<!-- From `lg` the amber panel bleeds off the right screen edge while
					     its contents stay put. `calc(50% - 50vw)` is exactly the
					     container's side offset — the padding cancels, since 50% of the
					     content box is W/2 - pad and the offset is 50vw - W/2 + pad — so
					     the margin lands the edge on the viewport at any width. The same
					     distance goes back on as inline-end padding, and the right
					     corners square off because a radius sitting on the screen edge
					     reads as a notch. -->
					<div
						class="mt-6 grid gap-8 rounded-[24px] bg-amber p-6 sm:p-10
						       lg:grid-cols-[43.6%_1fr] lg:gap-x-[6.6%] lg:rounded-r-none lg:p-[min(5.61vw,80px)]
						       lg:me-[calc(50%_-_50vw)] lg:pe-[calc(50vw_-_50%_+_min(5.61vw,80px))]"
					>
						<img
							src={images[id]}
							alt=""
							width="600"
							height="580"
							loading="lazy"
							class="aspect-[560/558] w-full rounded-2xl object-cover"
						/>

						<!-- From `lg` the copy and the CTA sit space-around in the column rather
						     than the CTA being pinned to the bottom. The 40% gap resolves
						     against the column height, which the image sets, so it tracks the
						     card instead of being a fixed drop. -->
						<div class="flex flex-col lg:justify-around lg:gap-[8%]">
							<!-- Heading and body are one flex child so the column has a single
							     gap rather than two — at 8% of the column height the gap is modest, but two gaps
							     overrun the card. The column's height comes from the image
							     beside it, so the gap tracks the card rather than being a
							     fixed drop. -->
							<div>
								<h3 class="text-h3 font-normal text-ink">
									<RichText segments={tab.title} />
								</h3>
								<p class="mt-4 max-w-[460px] text-[15px] leading-7 text-ink/80">{tab.body}</p>
							</div>

							<div class="mt-8 flex flex-wrap items-center gap-6 lg:mt-0">
								<Button href="#waitlist" variant="dark">Join waitlist</Button>
							</div>
						</div>
					</div>
				{/snippet}
			</Tabs>
		</div>
	</div>
</section>
