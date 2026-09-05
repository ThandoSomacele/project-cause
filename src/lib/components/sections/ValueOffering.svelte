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

<section data-section="value" class="relative overflow-hidden bg-surface py-16 lg:py-[104px]">
	<div class="container-page relative">
		<!-- Decorative rules that run off-canvas in the design. Large screens only:
		     below that they collide with the wrapped heading. -->
		<div
			class="pointer-events-none absolute top-[92px] left-[-50vw] hidden h-px w-[50vw] bg-ink lg:block"
			aria-hidden="true"
		>
			<span class="absolute -top-[3px] -right-1 h-2 w-2 rounded-full bg-ink"></span>
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
								<a
									href="#fees"
									class="inline-flex items-center gap-2 text-[15px] font-medium text-ink
									       underline-offset-4 hover:underline"
								>
									Learn more
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<path
											d="M5 12h14m0 0-6-6m6 6-6 6"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				{/snippet}
			</Tabs>
		</div>
	</div>
</section>
