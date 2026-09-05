<script lang="ts">
	import { subscription } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
</script>

<section data-section="subscription" class="bg-surface pb-16 lg:pb-[104px]">
	<div class="container-page">
		<div class="relative grid overflow-hidden rounded-[16px] lg:grid-cols-[52.4%_47.6%]">
			<div class="relative bg-ink px-8 py-12 text-white sm:px-12 lg:py-[70px] lg:pr-10 lg:pl-[95px]">

				<p class="relative text-[clamp(3rem,2.3rem+2.9vw,5rem)] leading-none font-bold">
					{subscription.price}
				</p>
				<p class="relative mt-3 text-[22px] text-mint">{subscription.period}</p>

				<div class="relative">
					<h3 class="mt-8 text-[clamp(1.375rem,1.1rem+1.1vw,1.875rem)] leading-tight font-normal">
						{#each subscription.title as segment, i (i)}
							<span class="block"><RichText segments={[segment]} /></span>
						{/each}
					</h3>

					<ul class="mt-7 flex flex-col gap-4">
						{#each subscription.items as item (item)}
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

					<p class="mt-14 max-w-[20rem] text-[11px] leading-5 text-white/70 italic">
						<span class="font-bold not-italic">please note:</span>
						{subscription.note}
					</p>
				</div>
			</div>

			<!-- The photo carries a strong teal duotone in the design. -->
			<div class="relative min-h-[280px] bg-mint">
				<img
					src="/images/kitchen-consult.webp"
					alt="A client and a service provider discussing work in a kitchen"
					width="1400"
					height="930"
					loading="lazy"
					class="photo-duotone absolute inset-0 h-full w-full object-cover"
				/>
				<div class="absolute inset-0 bg-mint/35" aria-hidden="true"></div>
			</div>
		</div>
	</div>
</section>
