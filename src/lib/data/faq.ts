/**
 * The six questions come from the design (node 4612:24300). Every row is
 * collapsed in the Figma frame, so the answers are NOT in the design. The ones
 * marked verbatim came from the client; the rest are drafted here from the
 * claims the rest of the page makes (R95/mnth, no credit system, a transaction
 * fee topping out at 4.8% inclusive of VAT on instant EFT, cash payments not
 * charged).
 *
 * The undrafted ones still need a review pass from whoever owns the product
 * copy before launch.
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
			// Supplied verbatim by the client.
			answer:
				'No, send unlimited messages to prospective and existing clients you connect with'
		},
		{
			question: 'Do I get charged for cash payments?',
			answer:
				'No. If you and the client settle in cash, Cause takes nothing. The transaction fee of up to 4.8% applies only to instant EFT payments processed through the platform.'
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

/**
 * The client half of the page closes with the same accordion. The design shows
 * six collapsed rows here too, so — as above — the questions follow the claims
 * the client sections make and the answers are drafted, not taken from Figma.
 * Both need the same review pass before launch.
 */
export const clientFaq = {
	heading: [{ text: 'Frequently Asked ' }, { text: 'Questions', tone: 'accent' as const }],
	subhead:
		'Everything you need to know about finding, booking, and paying a verified provider on our platform.',
	footer: faq.footer,
	items: [
		{
			question: 'How much does it cost to use Cause?',
			answer:
				'Nothing. Posting a job, comparing providers and requesting quotes are all free for clients. The platform fee is carried on the provider side.'
		},
		{
			question: 'How are providers vetted?',
			answer:
				'Every provider submits a valid South African ID or passport, proof of the services they offer, and any trade qualifications they hold. Nothing goes live until that has been checked.'
		},
		{
			question: 'How do I know what a job will cost?',
			answer:
				'You see a quote before any work starts. The provider sets it out against the job you described, so there is nothing to agree to on the day.'
		},
		{
			question: 'How do I pay for the work?',
			answer:
				'Cash directly to the provider, or instant EFT through the platform — whichever the two of you agree on. Paying through Cause keeps the transaction on record.'
		},
		{
			question: 'What if something goes wrong?',
			answer:
				'Raise it through the platform and our review process handles it openly and fairly. Because the job, the quote and the payment are all on record, there is something to work from.'
		},
		{
			question: 'How long does it take to get a quote?',
			answer:
				'Describe the job, choose from the providers who match, and requests go out immediately. Most clients hear back the same day.'
		}
	] satisfies FaqItem[]
};
