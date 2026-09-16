<script lang="ts">
	import { getPaid } from '$lib/data/content';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	/** Same composition on both halves of the page; only the copy and the photo
	 *  change, so both arrive as props. */
	let {
		data = getPaid,
		name = 'get-paid',
		photo = '/images/worker-phone.webp',
		indents = ['lg:pl-[8%]', 'lg:pl-[42.8%]'],
		ruleStop = 'right-[58%]'
	}: {
		data?: typeof getPaid;
		name?: string;
		photo?: string;
		indents?: [string, string];
		ruleStop?: string;
	} = $props();

	// Icons for this section, taken from the Figma render rather than reused from
	// elsewhere: the earlier 'jobs' and headset 'support' stand-ins belong to the
	// tab bar. The eye and the burst are lifted from the 1:1 render at 2x for
	// their 26px slot — they are too intricate to redraw faithfully by hand, and
	// the file's SVG export is rate-limited. Values include the extension.
	const icons: Record<string, string> = {
		'no-hidden-fees': 'fees-eye.png',
		'no-surprises': 'no-surprises.png',
		'cha-ching': 'banknote.svg',
		pricing: 'banknote.svg',
		control: 'control-panel.svg',
		support: 'chat-smile.svg'
	};
</script>

<section data-section={name} class="bg-steel pt-16 pb-16 lg:pt-[min(7.3vw,104px)] lg:pb-16">
	<div class="container-page relative">
		<!-- Navy rule running in from the left screen edge to its dot, sitting on
		     the baseline of the heading's second line — measured off the design,
		     where the rule occupies y341..344 against a line-2 baseline of y349.

		     The top is derived from the heading rather than fixed in vw, the same
		     way the value-offering rule is: for a line box of `line-height` L over
		     a 1.21em content area, the second baseline falls at

		       L + (L - 1.21em)/2 + 0.9688em  =  1.9088em   (L = 1.03em)

		     so a 2px rule's top is calc(1.9088 x --text-h2 - 2px). Reading the same
		     token the heading does keeps the two locked together through the clamp;
		     the old min(9.4vw,134px) sat 33px low at the design width and drifted
		     at every other. -->
		<div
			class="pointer-events-none absolute top-[calc(1.9088*var(--text-h2)_-_2px)] {ruleStop} left-[-50vw] hidden h-[2px] bg-ink md:block"
			aria-hidden="true"
		>
			<span class="absolute -top-[3px] -right-[3px] h-2 w-2 rounded-full bg-ink"></span>
		</div>

		<SectionHeading
			lines={data.heading}
			weight="font-normal"
			{indents}
		/>

		<!-- Sized off the design rather than by eye: the chip cap height runs 45.5%
		     of the heading's and each icon is ~2.5x that cap, which at the 56px
		     heading works out to a 25px face with 46px icons. Fluid so the row keeps
		     that relationship below the design width, with a smaller mobile base. -->
		<ul class="mt-7 flex flex-wrap items-center gap-x-10 gap-y-3 lg:gap-x-[min(1.965vw,28px)] lg:justify-center">
			{#each data.chips as chip (chip.label)}
				<li class="flex items-center gap-2.5 text-[17px] text-ink lg:text-[min(1.754vw,25px)]">
					<img
						src="/icons/{icons[chip.icon]}"
						alt=""
						aria-hidden="true"
						width="46"
						height="46"
						class="h-[26px] w-[26px] shrink-0 object-contain lg:h-[min(3.228vw,46px)] lg:w-[min(3.228vw,46px)]"
					/>
					{chip.label}
				</li>
			{/each}
		</ul>

		<div class="mt-12 grid items-center gap-10 lg:mt-20 lg:grid-cols-[minmax(0,48%)_minmax(0,40%)] lg:justify-between lg:gap-16">
			<div>
				<ul class="flex flex-col gap-7">
					{#each data.benefits as benefit (benefit.title)}
						<li class="flex gap-5">
							<img
								src="/icons/{icons[benefit.icon]}"
								alt=""
								aria-hidden="true"
								width="34"
								height="34"
								class="mt-0.5 h-[34px] w-[34px] shrink-0 object-contain lg:h-10 lg:w-10"
							/>
							<div>
								<h3 class="text-[17px] font-bold text-ink">{benefit.title}</h3>
								<p class="mt-1.5 text-[13.5px] leading-6 text-ink">{benefit.body}</p>
							</div>
						</li>
					{/each}
				</ul>

				<div class="mt-9">
					<Button href={data.cta.href} variant="accent-ink">{data.cta.label}</Button>
				</div>
			</div>

			<img
				src={photo}
				alt="A service provider checking job leads on his phone"
				width="1400"
				height="1050"
				loading="lazy"
				class="aspect-[482/603] w-full rounded-[10px] object-cover"
			/>
		</div>
	</div>
</section>
