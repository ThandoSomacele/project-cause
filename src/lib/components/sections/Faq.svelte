<script lang="ts">
	import { faq } from '$lib/data/faq';
	import RichText from '$lib/components/ui/RichText.svelte';
	import Accordion from '$lib/components/ui/Accordion.svelte';
</script>

<section data-section="faq" class="font-display bg-surface py-16 lg:py-[104px]">
	<div class="container-page">
		<div class="text-center">
			<h2 class="text-h2-alt font-semibold text-ink">
				<RichText segments={faq.heading} />
			</h2>
			<p class="mx-auto mt-4 max-w-[600px] text-[16px] leading-6 text-muted">{faq.subhead}</p>
		</div>

		<div class="mx-auto mt-14 max-w-[900px]">
			<Accordion items={faq.items} />
		</div>

		<p class="mt-14 text-center text-[14px] text-muted">
			{faq.footer.text}
			<a
				href={faq.footer.link.href}
				class="ml-2 font-medium text-accent-link underline underline-offset-4 hover:text-ink"
			>
				{faq.footer.link.label}
			</a>
		</p>
	</div>
</section>
