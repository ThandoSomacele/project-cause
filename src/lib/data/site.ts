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
	address: ['Address. City, Postal Code,', 'South Africa'],
	legal: '© ALL RIGHTS RESERVED 2026',
	privacy: { label: 'PRIVACY NOTE', href: '/privacy' },
	socials: [
		{ label: 'Cause on Instagram', href: 'https://instagram.com', icon: 'instagram' as const },
		{ label: 'Cause on LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' as const }
	]
};
