/**
 * All page copy, lifted from the Figma design (node 4612:24010).
 * Kept as data so wording changes never mean touching component markup.
 */

/**
 * The selector that opens the page (Figma node 4612:24601), measured off the
 * screenshot of that frame at 1425.
 *
 * It shares the hero's frame exactly: the 84px navbar, a 759px navy body, and
 * the mint rule on its base. Heading line 1 sits at y146, the same as the hero;
 * the subhead at y390 and the chips at y437. The orange runs on lines 2 and 3
 * were read off the pixels (x160..447 and x140..516 respectively).
 *
 * The design fills the right half with a photograph collage and drops the
 * mascot into the bottom-left. Those photographs are not in the asset pack, so
 * the collage is composed from the images the project already has.
 */
export const audience = {
	heading: [
		// Heavy in the design: ~11.9px stems against ~6.3px on the connective words.
		[{ text: 'A Marketplace', weight: 'strong' as const }],
		[
			{ text: 'to ' },
			{ text: 'connect', tone: 'accent' as const, weight: 'strong' as const },
			{ text: ' clients' }
		],
		[
			{ text: '& ' },
			{ text: 'vetted providers', tone: 'accent' as const, weight: 'strong' as const }
		]
	],
	subhead: 'Select your user option to continue',
	chips: [
		{ label: 'Secure', icon: 'check-circle' as const },
		{ label: 'Reliable', icon: 'check-circle' as const },
		{ label: 'Vetted', icon: 'check-circle' as const }
	],
	options: [
		{
			id: 'service-providers',
			title: 'Service Provider',
			// Read verbatim off the screenshot.
			body: 'Join a community where your talent is valued. Highlight your expertise and connect with clients seeking your skills.',
			href: '#service-providers'
		},
		{
			id: 'clients',
			title: 'Client',
			// Read off the supplied caption crop, upscaled and run through Vision
			// OCR three times for agreement — the crop is only 278x129.
			body: 'Join a marketplace where your peace of mind is valued. Connect with trusted, vetted service providers in your area',
			href: '#clients'
		}
	]
};

/**
 * The client-facing section that closes the page (Figma node 4612:24352).
 *
 * It is the service-provider hero mirrored for clients: the screenshot measures
 * the same 759px body under the navbar, the bracket rail at the same y113, the
 * same three device mockups and the same mint base rule at x28..1394. Only the
 * copy, the chips and the mascot pose differ, so it renders through the shared
 * AudienceHero. Copy read off the screenshot; heading line 3 carries the accent
 * run, matching the orange that starts at x429 on that line.
 */
export const clients = {
	heading: [
		[{ text: 'The simple way' }],
		[
			{ text: 'to ' },
			{ text: 'connect', tone: 'accent' as const, weight: 'strong' as const },
			{ text: ' with' }
		],
		// The design breaks the line after "with" and opens line 3 on "a". It also
		// leaves a stray "a" at the end of line 2, so it reads "with a / a verified"
		// — dropping that one, rather than line 3's, is what keeps the box and its
		// ellipsis on the connector's axis: the axis is placed for a line 3 that
		// starts with "a", and without it the whole run sits ~70px to the left.
		[
			{ text: 'a ' },
			{ text: 'verified', tone: 'accent' as const, weight: 'strong' as const },
			// The design rings this word: it is the one the reader swaps for their
			// own trade, so it is drawn as a field rather than just coloured. The
			// box carries the accent; the run inside stays the heading's own colour
			// and its own Light weight, and the ellipsis sits INSIDE the frame —
			// all three measured off Figma 4612:24477, where the box's nine glyphs
			// and three dots all fall within its x345..734 stroke.
			//
			// It reads "artisan" rather than a single trade because it is meant to
			// rotate: carpenter, plumber, electrician, painter, contractor. Nothing
			// cycles it yet — when that lands, this is the one run to drive, and the
			// box is already sized off its own text rather than a fixed width.
			{ text: 'artisan...', boxed: true }
		]
	],
	body: [
		[
			{ text: 'Find a service provider near you in ' },
			{ text: '3 steps', weight: 'strong' as const },
			{ text: '.' }
		],
		[{ text: 'Pick from qualified & experienced providers.' }],
		[{ text: 'Easily send a quote request from your phone.' }]
	],
	chips: [
		{ label: 'Experienced', icon: 'check-circle' as const },
		{ label: 'Qualified', icon: 'check-circle' as const },
		{ label: 'Vetted', icon: 'check-circle' as const }
	]
};

/**
 * The "Process" section that follows the client section. Measured against its
 * screenshot at 1425: heading lines at y1094 / 1171 / 1248 on 77px leading, so
 * it runs at the hero's size; the "Process" label at y1376; the three step
 * columns starting at x143, x562 and x982. It reuses the value-offering
 * section's rule treatment — an ink rule in from the left edge ending in a dot
 * (y1217, x..406) and an orange one running out past the right (y1296,
 * x1162..1423). The accent runs are a best reading of where the orange falls.
 */
export const process = {
	heading: [
		// The design sets "Reliably" Bold and leaves its comma at the line's own
		// Regular — the comma's stem measures half the letters' beside it.
		[{ text: 'Reliably', weight: 'strong' as const }, { text: ',' }],
		[
			{ text: 'Hire ' },
			{ text: 'Vetted', tone: 'accent' as const, weight: 'strong' as const },
			{ text: ' Providers' }
		],
		[
			{ text: '& ' },
			{ text: 'Get It Done', tone: 'accent' as const, weight: 'strong' as const }
		]
	],
	label: 'Process',
	steps: [
		{
			step: 'STEP 1',
			title: [{ text: 'ENTER ', weight: 'strong' as const }, { text: 'Your Fix Details' }],
			body: 'Enter details to search for relevant vetted service providers in your area'
		},
		{
			step: 'STEP 2',
			title: [{ text: 'CHOOSE ', weight: 'strong' as const }, { text: 'A Service Provider' }],
			body: 'Select a service provider from your list of results to review their profile'
		},
		{
			step: 'STEP 3',
			title: [{ text: 'GET ', weight: 'strong' as const }, { text: 'A Quote' }],
			body: 'Request a quote from your chosen provider and pay to get started'
		}
	]
};

export const hero = {
	// Rendered as three lines; `accent` words are orange, `strong` is heavier.
	headline: [
		[{ text: 'The only platform', weight: 'strong' as const }],
		[
			{ text: 'that simply, ' },
			{ text: 'connects', tone: 'accent' as const, weight: 'strong' as const }
		],
		[
			{ text: 'you to potential ' },
			{ text: 'clients', tone: 'accent' as const, weight: 'strong' as const }
		]
	],
	// Title Case, as the frame sets it. The frame also spells it
	// "Opportunites"; corrected here.
	subhead: 'Gain Access to Leads & Unlimited Job Opportunities.',
	chips: [
		{ label: 'No Credits', icon: 'no-credits' as const },
		{ label: 'No Confusion', icon: 'no-confusion' as const },
		{ label: 'Just Convenience', icon: 'check-circle' as const }
	]
};

export const valueOffering = {
	heading: [
		[{ text: 'The ' }, { text: 'Most Affordable', weight: 'strong' as const }, { text: ' Way,' }],
		[
			{ text: 'To Reach ' },
			{ text: 'New', tone: 'accent' as const, weight: 'strong' as const },
			{ text: ' Clients' }
		],
		[
			{ text: '& Gain ' },
			{ text: 'Jobs', tone: 'accent' as const, weight: 'strong' as const }
		]
	],
	tabs: [
		{
			id: 'credits',
			// Lifted from the design screenshot, like the jobs icon: the selected
			// mark is two-tone (#DBDBDB over #A3A3A3), which the flat SVG is not.
			activeIcon: '/icons/credits-active.png',
			label: 'No Credits',
			title: [{ text: 'No Credits', weight: 'strong' as const }, { text: ' Required Here!' }],
			body: "Access job opportunities from a feed tailored to your profile. Once you're verified, we'll send leads your way, that simple.",
			image: 'credits'
		},
		{
			id: 'jobs',
			// Lifted from the design screenshot: the selected icon carries brand
			// orange the flat SVG set has no equivalent for.
			activeIcon: '/icons/jobs-active.png',
			label: 'Jobs',
			title: [
				{ text: 'Get Discovered through ' },
				{ text: 'Cause Search', weight: 'strong' as const }
			],
			// The frame sets a space before the semicolon ("move it ; but only").
			// Closed up here — everything else is the design's wording.
			body: 'Verified projects determine your tier and where you appear in the search results. Membership can move it; but only inside the band your verified projects have already earned.',
			image: 'jobs'
		},
		{
			id: 'support',
			// Lifted from the design screenshot: the selected mark carries brand
			// orange in its bubble, which the flat SVG has no equivalent for.
			activeIcon: '/icons/support-active.png',
			label: 'Support',
			title: [{ text: 'Support', weight: 'strong' as const }, { text: ' That Answers' }],
			body: 'Disputes and issues follow a published process with clear timelines, so both sides know where they stand from the start.',
			image: 'support'
		}
	]
};

export const comparison = {
	heading: [
		[{ text: 'Don’t Pay for “Maybe?”,' }],
		[
			{ text: 'Just, ' },
			{ text: 'Get Paid!....', tone: 'accent' as const, weight: 'strong' as const }
		]
	],
	alternatives: {
		title: 'The Alternatives',
		items: [
			'Credits worth R 1000/pm for leads.',
			'Commissions which can eat into your margins',
			'Confusing review processes'
		]
	},
	better: {
		title: "How We're Better",
		items: [
			'No credit system',
			// Client consolidated "Single fixed fee" + "Transparent review process".
			'Transparent fees and review process',
			'Simple, intuitive platform'
		],
		cta: { label: 'Join waitlist', href: '#waitlist' }
	}
};

export const getPaid = {
	heading: [
		[{ text: 'Connect', weight: 'strong' as const }, { text: ' with a client,' }],
		[
			{ text: 'Choose', style: 'italic' as const },
			{ text: ' how you get ' },
			{ text: 'paid', weight: 'strong' as const }
		]
	],
	chips: [
		{ label: 'No Hidden Fees', icon: 'no-hidden-fees' as const },
		{ label: 'No Surprises', icon: 'no-surprises' as const },
		{ label: 'Just cha-ching!!!', icon: 'cha-ching' as const }
	],
	benefits: [
		{
			title: 'Predictable pricing, no surprises',
			body: 'Straightforward fixed fee pricing that works how things should, transparently, designed to keep your margins yours.',
			icon: 'pricing' as const
		},
		{
			title: 'Control how you engage leads',
			body: 'Built to put you in charge of your client interactions & schedule. Choose when, how, and which opportunities you pursue.',
			icon: 'control' as const
		},
		{
			title: 'Support you can rely on',
			body: 'Have peace of mind from our comprehensive processes that ensure issues are handled openly & fairly.',
			icon: 'support' as const
		}
	],
	cta: { label: 'Join waitlist', href: '#waitlist' }
};

/**
 * The client half of the page mirrors the service-provider half section for
 * section — same components, different copy — which is how the design lays it
 * out. Headings are read off the supplied full-page screenshot; the body copy
 * is adapted from the provider side into the client voice and needs a review
 * pass from whoever owns the product copy.
 */
export const clientComparison = {
	heading: [
		[{ text: 'From ' }, { text: 'repair headache', style: 'italic' as const }],
		[
			{ text: 'to, ' },
			{ text: 'peace of mind....', tone: 'accent' as const, weight: 'strong' as const }
		]
	],
	alternatives: {
		title: 'The Alternatives',
		items: [
			'Chasing quotes that never arrive',
			'Unvetted strangers turning up at your door',
			'No recourse when the work goes wrong'
		]
	},
	better: {
		title: "How We're Better",
		items: [
			'Every provider vetted before they list',
			'A clear quote before any work starts',
			'A review process that protects you'
		],
		cta: { label: 'Join waitlist', href: '#waitlist' }
	}
};

export const clientBenefits = {
	heading: [
		[{ text: 'From chaotic ' }, { text: 'guessing,', weight: 'strong' as const }],
		[{ text: 'to simple ' }, { text: 'convenience', weight: 'strong' as const }]
	],
	chips: [
		{ label: 'No Hidden Fees', icon: 'no-hidden-fees' as const },
		{ label: 'No Surprises', icon: 'no-surprises' as const },
		{ label: 'Just Done Right', icon: 'cha-ching' as const }
	],
	benefits: [
		{
			title: 'Predictable pricing, no surprises',
			body: 'See the fee before you commit. What you agree to is what you pay, with nothing added once the job is done.',
			icon: 'pricing' as const
		},
		{
			title: 'Control how you choose a provider',
			body: 'Compare profiles, ratings and vetted job history, then decide who comes to your door and when they arrive.',
			icon: 'control' as const
		},
		{
			title: 'Support you can rely on',
			body: 'Have peace of mind from our comprehensive processes that ensure issues are handled openly & fairly.',
			icon: 'support' as const
		}
	],
	cta: { label: 'Join waitlist', href: '#waitlist' }
};

export const clientCta = {
	heading: [
		[{ text: 'Risky DIY?... Or a trusted & vetted' }],
		[{ text: 'service provider?', weight: 'strong' as const }]
	],
	subhead: 'Join the waitlist and get early access to a new era'
};

export const pricing = {
	/**
	 * The revised Figma (node 4679:13736) splits this into two panels — 643px
	 * and 585px of a 1228px row — with the right one holding the free tier.
	 *
	 * Titles and list items are segment arrays because the design emphasises one
	 * run in each: the panel copy sits at semibold with the differentiating word
	 * — "ranking", "Prioritized", "Basic" — a step heavier.
	 */
	tiers: [
		{
			id: 'paid',
			price: 'R95',
			period: '/mnth',
			title: [
				{ text: 'Stand out in the results ' },
				{ text: 'ranking', weight: 'strong' as const }
			],
			items: [
				[
					{ text: 'Get found through ' },
					{ text: 'Prioritized', weight: 'strong' as const },
					{ text: ' search rank' }
				],
				[{ text: 'Receive your project payments as cash OR' }],
				[{ text: 'Receive your payments as instant EFT *' }]
			],
			// Verbatim from the frame. The 5% here is the all-in ceiling — it covers
			// the payment gateway's cut as well as VAT — which is why it sits above
			// the 4.8% the estimator quotes for the platform's own fee.
			note: 'Payments on the platform have a maximum transaction fee of 5% inclusive of VAT and payment gateway costs, refer to calculator.*'
		},
		{
			id: 'free',
			price: 'Free',
			period: '/mnth',
			title: [
				{ text: 'Get discovered by ' },
				{ text: 'new clients', weight: 'strong' as const }
			],
			items: [
				[
					{ text: 'Appear in search with ' },
					{ text: 'Basic', weight: 'strong' as const },
					{ text: ' rank' }
				],
				[{ text: 'Receive your project payments as cash OR' }],
				[{ text: 'Receive your payments as instant EFT *' }]
			],
			note: null
		}
	]
};
export const carousel = {
	heading: [
		[{ text: 'A platform that simply,' }],
		[{ text: 'lets you', style: 'italic' as const, weight: 'strong' as const }, { text: ',' }],
		[{ text: 'talk to your ' }, { text: 'clients', weight: 'strong' as const }]
	],
	slides: [
		{
			id: 'find-work',
			title: [
				{ text: 'Shift', style: 'italic' as const },
				{ text: ' to a New Standard for How You ' },
				{ text: 'Find Work', tone: 'accent' as const, weight: 'strong' as const }
			],
			items: [
				'Predictable, simple pricing',
				'Built around your business growth',
				'Transparent and fair processes.'
			],
			cta: { label: 'Switch to Cause', href: '#waitlist' },
			image: 'quotes'
		},
		{
			id: 'quote',
			title: [
				{ text: 'Quote', style: 'italic' as const },
				{ text: ' Directly, Without a ' },
				{ text: 'Middleman', tone: 'accent' as const, weight: 'strong' as const }
			],
			items: [
				'See the full brief before you quote',
				'Message the client on the platform',
				'Agree scope and price in one place.'
			],
			cta: { label: 'Switch to Cause', href: '#waitlist' },
			image: 'requests'
		},
		{
			id: 'get-paid',
			title: [
				{ text: 'Get Paid', style: 'italic' as const },
				{ text: ' the Way That ' },
				{ text: 'Suits You', tone: 'accent' as const, weight: 'strong' as const }
			],
			items: [
				'Take payment as cash on completion',
				'Or receive instant EFT to your account',
				'No commission taken off the top.'
			],
			cta: { label: 'Switch to Cause', href: '#waitlist' },
			image: 'payouts'
		}
	]
};

export const calculator = {
	title: 'Fee Estimate Slider',
	// The design shows no caption over the quick-select row, but the row is a
	// group of controls and needs a name, so this is read out rather than drawn.
	quickSelectLabel: 'Quick select',
	exactLabel: 'Enter exact invoice amount',
	feesTitle: 'Platform fees',
	feesBody:
		'Payments on the platform have a maximum transaction fee of 4.8% inclusive of VAT.',
	labels: {
		feeEstimate: 'PLATFORM FEE ESTIMATE',
		deduction: 'DEDUCTION ESTIMATE',
		invoice: 'your invoice estimate',
		payout: 'paid out to you'
	}
};

export const finalCta = {
	heading: [
		[
			{ text: '‘Cause', weight: 'strong' as const },
			{ text: ', chasing leads, should breakeven.' }
		],
		[{ text: 'Not break your bank.' }]
	],
	subhead: 'Join the waitlist and get early access to a new era'
};

export const waitlist = {
	placeholder: 'nomsa.ngewu@example.com',
	submit: 'Join Waitlist',
	success: "You're on the list. We'll be in touch before launch.",
	label: 'Email address'
};
