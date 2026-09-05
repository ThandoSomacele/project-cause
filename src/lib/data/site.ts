export const site = {
	name: 'Cause',
	tagline: 'The only platform that simply connects you to potential leads',
	description:
		'Cause connects South African service providers to client leads with no credit system — one fixed monthly fee, transparent processes, and payments on your terms.',
	url: 'https://cause.co.za'
};

export const nav = [
	{ label: 'Service Providers', href: '/' },
	{ label: 'Clients', href: '/clients' },
	{ label: 'About Cause', href: '/about' }
];

export const footer = {
	// Real company details, from the revised Figma footer (node 4680:13932).
	address: ['Khowa, Elliot,', 'Eastern Cape', '5460', 'South Africa'],
	legal: '© All rights reserved 2026',
	privacy: { label: 'Privacy NOTE', href: '/privacy' },
	// The design carries Facebook and Instagram. The handles themselves are not
	// in the file — these point at the bare platforms until the real URLs land.
	socials: [
		{ label: 'Cause on Facebook', href: 'https://facebook.com', icon: 'facebook' as const },
		{ label: 'Cause on Instagram', href: 'https://instagram.com', icon: 'instagram' as const }
	]
};
