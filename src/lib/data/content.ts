/**
 * All page copy, lifted from the Figma design (node 4612:24010).
 * Kept as data so wording changes never mean touching component markup.
 */

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
			{ text: 'leads', tone: 'accent' as const, weight: 'strong' as const }
		]
	],
	subhead: 'Gain access to leads & unlimited job opportunities.',
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
			label: 'Credits',
			title: [{ text: 'No Credits', weight: 'strong' as const }, { text: ' Required Here!' }],
			body: "Access job opportunities from a feed tailored to your profile. Once you're verified, we'll send leads your way, that simple.",
			image: 'credits'
		},
		{
			id: 'jobs',
			label: 'Jobs',
			title: [{ text: 'Real Jobs', weight: 'strong' as const }, { text: ', Not Just Enquiries' }],
			body: 'Every lead comes from a client who has described the work and is ready to hire. Review the brief, then decide whether to quote.',
			image: 'jobs'
		},
		{
			id: 'support',
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
			'Single fixed fee',
			'Transparent review process',
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

export const subscription = {
	price: 'R95',
	period: '/mnth',
	title: [
		{ text: 'A subscription that puts' },
		{ text: 'control back in your hands', weight: 'strong' as const }
	],
	items: [
		'Get found through search by clients',
		'Receive your project payments as cash OR',
		'Receive your payments as instant EFT *'
	],
	note: 'Instant EFT payments will have a 4.8% transaction cost, inclusive of VAT, refer to calculator.*'
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
	quickSelectLabel: 'Quick select',
	exactLabel: 'Enter exact invoice amount',
	feesTitle: 'Platform fees',
	feesBody:
		'Payments on the platform have a maximum transaction fee of 4.8% Inclusive of VAT.',
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
