<script lang="ts">
	import { pricing } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
</script>

<section data-section="subscription" class="relative overflow-hidden bg-steel pb-16 lg:pb-[104px]">
	<!-- Tools artwork sitting in the section's bottom-left corner, mostly
	     off-canvas, as in the design. -->
	<img
		src="/images/tools-flatlay.webp"
		alt=""
		aria-hidden="true"
		width="2200"
		height="1020"
		loading="lazy"
		class="pointer-events-none absolute -bottom-[6vw] -left-[38vw] hidden w-[55vw] max-w-none lg:block"
	/>

	<div class="container-page relative">
		<!-- 643 / 585 of a 1228px row in the design. -->
		<div class="grid overflow-hidden rounded-[16px] lg:grid-cols-[52.4%_47.6%]">
			{#each pricing.tiers as tier (tier.id)}
				<div
					class={[
						'relative px-8 py-12 sm:px-12 lg:py-[70px]',
						tier.id === 'paid'
							? 'bg-ink text-white lg:pr-10 lg:pl-[76px]'
							: 'bg-cream text-ink lg:px-[60px]'
					]}
				>
					{#if tier.id === 'paid'}
						<!-- Mascot climbs the card's left edge, clipped by the card. -->
						<img
							src="/images/mascot-pole.svg"
							alt=""
							aria-hidden="true"
							class="pointer-events-none absolute -bottom-10 -left-1 hidden w-[160px] lg:block"
						/>
					{/if}

					<p
						class={[
							'relative text-[clamp(3rem,2.3rem+2.9vw,5rem)] leading-none font-bold',
							tier.id === 'free' && 'text-ink'
						]}
					>
						{tier.price}
					</p>
					<p
						class={[
							'relative mt-3 text-[22px]',
							tier.id === 'paid' ? 'text-mint' : 'text-accent-dark'
						]}
					>
						{tier.period}
					</p>

					<div class={['relative', tier.id === 'paid' && 'lg:pl-[52px]']}>
						<h3 class="mt-8 text-[clamp(1.375rem,1.1rem+1.1vw,1.875rem)] leading-tight font-normal">
							{#each tier.title as segment, i (i)}
								<span class="block"><RichText segments={[segment]} /></span>
							{/each}
						</h3>

						<ul class="mt-7 flex flex-col gap-4">
							{#each tier.items as item (item)}
								<li class="flex items-start gap-4 text-[15px] leading-6">
									<img
										src="/icons/check-circle.svg"
										alt=""
										aria-hidden="true"
										width="21"
										height="21"
										class="mt-0.5 h-[21px] w-[21px] shrink-0"
									/>
									{item}
								</li>
							{/each}
						</ul>

						{#if tier.note}
							<p
								class={[
									'mt-14 max-w-[20rem] text-[11px] leading-5 italic',
									tier.id === 'paid' ? 'text-white/70 lg:ml-12' : 'text-ink/70'
								]}
							>
								<span class="font-bold not-italic">please note:</span>
								{tier.note}
							</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
