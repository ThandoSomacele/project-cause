<script lang="ts">
	import { getPaid } from '$lib/data/content';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const icons: Record<string, string> = {
		'no-hidden-fees': 'banknote',
		'no-surprises': 'no-confusion',
		'cha-ching': 'banknote',
		pricing: 'banknote',
		control: 'jobs',
		support: 'support'
	};
</script>

<section data-section="get-paid" class="bg-surface pt-16 lg:pt-[104px]">
	<div class="container-page">
		<SectionHeading lines={getPaid.heading} indents={['lg:pl-[8%]', 'lg:pl-[42.8%]']} />

		<ul class="mt-7 flex flex-wrap items-center gap-x-10 gap-y-3 lg:justify-center">
			{#each getPaid.chips as chip (chip.label)}
				<li class="flex items-center gap-2.5 text-[17px] text-ink/85">
					<img
						src="/icons/{icons[chip.icon]}.svg"
						alt=""
						aria-hidden="true"
						width="26"
						height="26"
						class="h-[26px] w-[26px] shrink-0 object-contain"
					/>
					{chip.label}
				</li>
			{/each}
		</ul>

		<div class="mt-12 grid items-center gap-10 lg:mt-20 lg:mb-16 lg:grid-cols-[minmax(0,48%)_minmax(0,40%)] lg:justify-between lg:gap-16">
			<div>
				<ul class="flex flex-col gap-7">
					{#each getPaid.benefits as benefit (benefit.title)}
						<li class="flex gap-5">
							<img
								src="/icons/{icons[benefit.icon]}.svg"
								alt=""
								aria-hidden="true"
								width="34"
								height="34"
								class="mt-0.5 h-[34px] w-[34px] shrink-0 object-contain"
							/>
							<div>
								<h3 class="text-[17px] font-bold text-ink">{benefit.title}</h3>
								<p class="mt-1.5 text-[13.5px] leading-6 text-ink/70">{benefit.body}</p>
							</div>
						</li>
					{/each}
				</ul>

				<div class="mt-9">
					<Button href={getPaid.cta.href}>{getPaid.cta.label}</Button>
				</div>
			</div>

			<img
				src="/images/worker-phone.webp"
				alt="A service provider checking job leads on his phone"
				width="1400"
				height="1050"
				loading="lazy"
				class="aspect-[482/603] w-full rounded-[10px] object-cover"
			/>
		</div>
	</div>
</section>
