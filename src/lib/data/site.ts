export const site = {
	name: 'Cause',
	tagline: 'The only platform that simply connects you to potential clients',
	description:
		'Cause connects South African service providers to client leads with no credit system — one fixed monthly fee, transparent processes, and payments on your terms.',
	url: 'https://cause.co.za'
};

export const nav = [
	// Jumps to the service-provider block on the landing page rather than
	// loading a route. Rooted at "/" so it still resolves from other pages.
	{ label: 'Service Providers', href: '/#service-providers' },
	{ label: 'Clients', href: '/#clients' },
	{ label: 'About Cause', href: '/about' }
];

export const footer = {
	// Real company details, from the revised Figma footer (node 4680:13932).
	address: ['Khowa, Elliot,', 'Eastern Cape', '5460', 'South Africa'],
	legal: '© All rights reserved 2026',
	// Rendered uppercase by the footer's own styling.
	privacy: { label: 'Legal & Privacy', href: '/privacy' },
	// Instagram is held back until the account is live — the design carries it,
	// so it is commented out rather than deleted, ready to switch back on.
	socials: [
		{
			label: 'Cause on Facebook',
			href: 'https://www.facebook.com/profile.php?id=61592719810744',
			icon: 'facebook' as const
		}
		// { label: 'Cause on Instagram', href: '…', icon: 'instagram' as const }
	]
};
