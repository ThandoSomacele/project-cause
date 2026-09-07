<script lang="ts">
	import { valueOffering } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const images: Record<string, string> = {
		credits: '/images/tab-credits.webp',
		jobs: '/images/worker-phone.webp',
		support: '/images/electricians.webp'
	};
</script>

<section data-section="value" class="relative overflow-hidden bg-white py-16 lg:pt-[15.44vw] lg:pb-[104px]">
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
		<!-- Decorative rules either side of the heading, matching the design:
		     a navy rule running in from the left edge to a dot, and an orange one
		     running out past the right edge from the icon. -->
		<div
			class="pointer-events-none absolute top-[129px] right-[74.4%] left-[-50vw] hidden h-[2px] bg-ink lg:block"
			aria-hidden="true"
		>
			<span class="absolute -top-[3px] -right-[3px] h-2 w-2 rounded-full bg-ink"></span>
		</div>

		<img
			src="/icons/reach-clients.svg"
			alt=""
			aria-hidden="true"
			width="63"
			height="63"
			class="pointer-events-none absolute top-[136px] left-[83.6%] hidden w-[63px] lg:block"
		/>

		<div
			class="pointer-events-none absolute top-[209px] right-[-50vw] left-[85.5%] hidden h-[2px] bg-accent lg:block"
			aria-hidden="true"
		>
			<span class="absolute -top-[3px] -left-[3px] h-2 w-2 rounded-full bg-accent"></span>
		</div>

		<SectionHeading lines={valueOffering.heading} indents={['lg:pl-[0.6%]', 'lg:pl-[26.3%]', 'lg:pl-[51.4%]']} />

		<div class="mt-12 lg:mt-16">
			<Tabs tabs={valueOffering.tabs} label="What Cause gives you">
				{#snippet panel(id)}
					{@const tab = valueOffering.tabs.find((t) => t.id === id)!}
					<div
						class="mt-6 grid gap-8 rounded-[24px] bg-amber p-6 sm:p-10
						       lg:grid-cols-[43.6%_1fr] lg:gap-x-[6.6%] lg:p-[80px]"
					>
						<img
							src={images[id]}
							alt=""
							width="600"
							height="580"
							loading="lazy"
							class="aspect-[560/558] w-full rounded-2xl object-cover"
						/>

						<div class="flex flex-col">
							<h3 class="text-h3 font-normal text-ink">
								<RichText segments={tab.title} />
							</h3>
							<p class="mt-4 max-w-[460px] text-[15px] leading-7 text-ink/80">{tab.body}</p>

							<div class="mt-8 flex flex-wrap items-center gap-6 lg:mt-auto">
								<Button href="#waitlist" variant="dark">Join waitlist</Button>
							</div>
						</div>
					</div>
				{/snippet}
			</Tabs>
		</div>
	</div>
</section>
