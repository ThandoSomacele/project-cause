<script lang="ts">
	import { hero } from '$lib/data/content';
	import RichText from '$lib/components/ui/RichText.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import EmailCapture, { type WaitlistResult } from '$lib/components/ui/EmailCapture.svelte';

	let { form = null }: { form?: WaitlistResult | null } = $props();
</script>

<section data-section="hero" class="relative isolate overflow-hidden bg-ink text-white lg:min-h-[759px]">
	<!-- The design's backdrop is a mottled navy with soft circular washes.
	     Two radial gradients read the same at a fraction of the weight. -->
	<div
		class="hero-backdrop pointer-events-none absolute inset-0 -z-10"
		aria-hidden="true"
	></div>

	<div class="container-wide relative">
		<div class="relative z-10 max-w-[780px] pt-10 pb-12 lg:pt-[54px] lg:pb-24">
			<h1 class="text-hero font-light">
				{#each hero.headline as line, i (i)}
					<span class="block"><RichText segments={line} /></span>
				{/each}
			</h1>

			<p class="mt-10 text-[17px] leading-relaxed text-white/85 lg:mt-28">{hero.subhead}</p>

			<ul class="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
				{#each hero.chips as chip (chip.label)}
					<li class="flex items-center gap-2.5 text-[15px] text-white/90">
						<Icon name={chip.icon} class="h-5 w-5" width={20} height={20} />
						{chip.label}
					</li>
				{/each}
			</ul>

			<div id="waitlist" class="mt-7 max-w-[630px] scroll-mt-24">
				<EmailCapture source="hero" tone="dark" {form} />
			</div>
		</div>
		<!-- Device cluster. Absolute on large screens so the headline can run past
		     the column edge into it, the way it does in the design. Percentages
		     come from measuring the 1:1 Figma render. -->
		<div
			class="relative -mx-5 mt-4 md:-mx-8
			       lg:absolute lg:-top-6 lg:-right-[46px] lg:mx-0 lg:mt-0 lg:w-[717px]"
		>
			<div class="relative mx-auto aspect-[700/783] w-full max-w-[560px] lg:max-w-none">
				<img
					src="/icons/hero-frame.svg"
					alt=""
					aria-hidden="true"
					class="absolute top-[7%] left-[9.3%] hidden w-[90.7%] lg:block"
				/>
				<img
					src="/images/phone-profile.webp"
					alt=""
					aria-hidden="true"
					width="277"
					height="700"
					class="absolute top-[22.7%] left-[19.7%] w-[23.1%]"
				/>
				<img
					src="/images/phone-results.webp"
					alt=""
					aria-hidden="true"
					width="274"
					height="700"
					class="absolute top-[21.1%] left-[69.3%] w-[26.1%]"
				/>
				<img
					src="/images/phone-search.webp"
					alt="The Cause app, showing the screen for finding a service provider"
					width="347"
					height="700"
					fetchpriority="high"
					class="absolute top-[10.9%] left-[35.7%] w-[40.7%]"
				/>
				<img
					src="/images/mascot-pole.svg"
					alt=""
					aria-hidden="true"
					class="absolute top-[43.4%] left-[2.9%] w-[44.3%]"
				/>
			</div>
		</div>

	</div>
</section>
