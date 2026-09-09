/**
 * The six questions come from the design (node 4612:24300). Every row is
 * collapsed in the Figma frame, so the answers are NOT in the design — they are
 * drafted here from the claims the rest of the page makes (R95/mnth, no credit
 * system, banded rates topping out at 5% excl. VAT on instant EFT, cash
 * payments not charged).
 *
 * These need a review pass from whoever owns the product copy before launch.
 */

export interface FaqItem {
	question: string;
	answer: string;
}

export const faq = {
	heading: [{ text: 'Frequently Asked ' }, { text: 'Questions', tone: 'accent' as const }],
	subhead:
		'Everything you need to know about finding, hiring, and working with verified top-tier artisans on our platform.',
	footer: {
		text: 'Still have questions? We are here to help.',
		link: { label: 'Contact Support', href: 'mailto:support@causeafrica.co.za' }
	},
	items: [
		{
			question: 'Can I use Cause for free?',
			// Supplied verbatim by the client.
			answer:
				"Yes. You'll still appear in the search results with a free account, you just can't appear above people with more verified projects, higher client rating or paid membership."
		},
		{
			question: 'How do I register to join Cause?',
			answer:
				'Join the waitlist with your email address and we will send you a registration link before launch. Registration takes you through your profile, the services you offer, your working area, and verification.'
		},
		{
			question: 'Do I pay to chat to clients?',
			answer:
				'No. Messaging clients is included in your subscription. You are never charged per conversation, per quote, or per lead, so you can talk to as many clients as you like.'
		},
		{
			question: 'Do I get charged for cash payments?',
			answer:
				'No. If you and the client settle in cash, Cause takes nothing. The transaction fee of up to 5% excluding VAT applies only to instant EFT payments processed through the platform.'
		},
		{
			question: 'What do I need to register?',
			answer:
				'A valid South African ID or passport, your contact details, proof of the services you offer, and any trade qualifications or certifications you hold. Bank details are only needed if you want to receive instant EFT payments.'
		},
		{
			question: 'How long does registration take?',
			answer:
				'Creating your profile takes about ten minutes. Verification is usually completed within two business days, and you will be notified as soon as your profile goes live.'
		}
	] satisfies FaqItem[]
};
