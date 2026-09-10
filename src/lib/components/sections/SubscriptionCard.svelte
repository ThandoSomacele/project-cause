<script lang="ts">
	import { pricing } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
</script>

<section data-section="subscription" class="relative overflow-hidden bg-steel pb-16 lg:pb-[min(7.3vw,104px)]">
	<!-- Scattered tools in the section's bottom-left corner, behind the card and
	     bleeding off the left edge. A transparent asset in the design, not the
	     opaque flatlay used higher up the page; the file's own export is
	     rate-limited, so it is keyed out of the current node render. Taken from
	     that render specifically because the older page export still carried the
	     mascot in this corner. Starts 185px below the card top. -->
	<img
		src="/images/tools-corner.webp"
		alt=""
		aria-hidden="true"
		width="322"
		height="515"
		loading="lazy"
		class="pointer-events-none absolute top-[min(12.98vw,185px)] left-0 hidden w-[min(25.26vw,360px)] max-w-none lg:block"
	/>

	<div class="relative mx-auto w-full max-w-[1228px] px-5 md:px-8 lg:max-w-[min(86.18vw,1228px)] lg:px-0">
		<!-- 643 / 585 of a 1228px row, measured on the current Figma node. -->
		<div class="grid overflow-hidden rounded-[16px] lg:grid-cols-[52.4%_47.6%]">
			{#each pricing.tiers as tier (tier.id)}
				<div
					class={[
						'relative px-8 py-12 sm:px-12 lg:pt-[min(4.07vw,58px)] lg:pb-[min(2.88vw,41px)]',
						tier.id === 'paid'
							? 'bg-ink text-white lg:pr-10 lg:pl-[min(6.74vw,96px)]'
							: 'bg-line text-ink lg:pr-[min(4.21vw,60px)] lg:pl-[min(2.95vw,42px)]'
					]}
				>
					<p
						class={[
							'relative text-[clamp(3rem,1.775rem+5.024vw,6.25rem)] leading-none font-bold',
							tier.id === 'free' && 'text-ink'
						]}
					>
						{tier.price}
					</p>
					<p
						class={[
							'relative mt-3 text-[22px]',
							tier.id === 'paid' ? 'text-mint' : 'text-ink'
						]}
					>
						{tier.period}
					</p>

					<div
						class={[
							'relative',
							tier.id === 'paid' ? 'lg:pl-[min(6.88vw,98px)]' : 'lg:pl-[min(7.23vw,103px)]'
						]}
					>
						<h3 class="mt-8 text-[clamp(1.375rem,1.1rem+1.1vw,1.875rem)] leading-tight font-normal lg:mt-2">
							<RichText segments={tier.title} />
						</h3>

						<ul class="mt-7 flex flex-col gap-4 lg:-ml-[37px]">
							{#each tier.items as item, i (i)}
								<!-- Same outlined mint check the How We're Better panel uses,
								     at the 22px the design measures here against its 24px. -->
								<li class="flex items-start gap-4 text-[15px] leading-6 font-semibold">
									<img
										src="/icons/better-check.svg"
										alt=""
										aria-hidden="true"
										width="24"
										height="24"
										class="mt-0.5 h-[22px] w-[22px] shrink-0"
									/>
									<span><RichText segments={item} /></span>
								</li>
							{/each}
						</ul>

						{#if tier.note}
							<p
								class={[
									'mt-14 max-w-[20rem] text-[11px] leading-5 italic lg:mt-[min(11.3vw,161px)]',
									tier.id === 'paid' ? 'text-white/70' : 'text-ink/70'
								]}
							>
								<span class="font-bold not-italic">Disclaimer:</span>
								{tier.note}
							</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
