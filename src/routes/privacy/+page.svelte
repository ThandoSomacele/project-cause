<script lang="ts">
	import { site } from '$lib/data/site';
	import { faq } from '$lib/data/faq';

	/**
	 * The four documents the design offers, in its own order: privacy and terms
	 * on the top row, PAIA and payments below. Each card is body copy over a
	 * download button — the frame draws no card titles, so none are invented.
	 *
	 * `file` points at /documents/, which is not populated yet. The PDFs have to
	 * be supplied before this page ships, otherwise every button 404s.
	 */
	const documents = [
		{
			body: 'See how Cause handles your information, keeps it safe, and respects your privacy',
			label: 'Download Privacy Policy',
			file: '/documents/cause-privacy-policy.pdf'
		},
		{
			body: 'The ground rules for using Cause, working with clients, and getting the most from the platform.',
			label: 'Download Terms of Service',
			file: '/documents/cause-terms-of-service.pdf'
		},
		{
			body: 'Find out what information Cause keeps, how to request access, and what your rights are.',
			label: 'Download PAIA Manual',
			file: '/documents/cause-paia-manual.pdf'
		},
		{
			body: "Know how payments work, when refunds apply, and what to expect when things don't go to plan.",
			label: 'Download Payment & Refund Policy',
			file: '/documents/cause-payment-refund-policy.pdf'
		}
	];
</script>

<svelte:head>
	<title>Terms and Conditions — {site.name}</title>
	<meta
		name="description"
		content="How Cause handles your information, the terms of using the platform, and the policies that govern payments and access to records."
	/>
</svelte:head>

<!--
	Figma node 4928:14495, a 1425x1998 frame. Read straight off the render rather
	than a screen capture, so the values below are the file's own:

	  amber band   y84..450   #FECA6E      page ground  y450..1734  #FCFCFC
	  cards        #EFEFEE, two columns at x273..636 and x784..1147
	  footer       y1734+     #0A1538  (the shared Footer component)

	The band's #FECA6E is set locally rather than through --color-amber, because
	that token currently reads #F7CD7C — see the note in the handover; the two
	disagree and the token should not be moved on the strength of this page alone.
-->
	<section data-section="privacy-intro" class="bg-[#FECA6E] py-16 lg:py-[min(7.3vw,104px)]">
		<div class="container-page text-center">
			<h1 class="text-h2 font-bold text-ink">Cause Terms and Conditions</h1>
			<p class="mx-auto mt-6 max-w-[56rem] text-[17px] leading-7 text-ink/85">
				By using the Cause platform, as either a client or a service provider, you acknowledge your
				acceptance of all the terms below
			</p>
		</div>
	</section>

	<section data-section="privacy-documents" class="bg-[#FCFCFC] py-16 lg:py-[min(8.4vw,120px)]">
		<div class="container-page">
			<h2 class="text-h2 mx-auto max-w-[60rem] text-center font-normal text-ink">
				Cause in an online marketplace for
				<span class="block font-bold">vetted service providers to connect with clients</span>
			</h2>
			<p class="mx-auto mt-6 max-w-[46rem] text-center text-[15px] leading-6 text-muted">
				Everything you need to know about finding, hiring, and working with verified artisans on our
				platform.
			</p>

			<!-- Two columns from `sm` up, matching the design's 2x2. Each card is a
			     fixed-height flex column so the buttons line up across a row even
			     when the copy wraps to different line counts. -->
			<ul class="mx-auto mt-12 grid max-w-[62rem] gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
				{#each documents as doc (doc.label)}
					<li class="flex flex-col rounded-[16px] bg-[#EFEFEE] p-8 lg:p-10">
						<p class="flex-1 text-[15px] leading-7 text-ink/80">{doc.body}</p>
						<!-- The design draws these as navy text with a trailing arrow, not
						     filled pills: the whole crop carries only ~340 navy pixels, and
						     mapping the label's region shows no fill and no border — just
						     the words and an arrowhead about 20px past them. -->
						<div class="mt-8">
							<a
								href={doc.file}
								class="group inline-flex items-center gap-3 text-[17px] font-medium text-ink
								       underline-offset-4 hover:underline"
							>
								{doc.label}
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									aria-hidden="true"
									class="transition-transform group-hover:translate-x-0.5"
								>
									<path
										d="M4 12h15m0 0-6-6m6 6-6 6"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</a>
						</div>
					</li>
				{/each}
			</ul>

			<p class="mt-14 text-center text-[15px] text-muted">
				Still have questions? We are here to help.
				<!-- Same support address the FAQ footer uses, rather than a second
				     copy of it that could drift. -->
				<a
					href={faq.footer.link.href}
					class="font-medium text-accent-dark underline underline-offset-4 hover:text-ink"
				>
					{faq.footer.link.label}
				</a>
			</p>
		</div>
	</section>
