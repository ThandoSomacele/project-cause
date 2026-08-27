import { fail } from '@sveltejs/kit';
import { recordSignup } from '$lib/server/waitlist';
import type { Actions } from './$types';

// Deliberately permissive — the server is not the place to guess whether a
// deliverable address is "real", only whether it is shaped like an address.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const actions = {
	waitlist: async ({ request }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '').trim();
		const source = String(data.get('source') ?? 'unknown');
		const honeypot = String(data.get('company') ?? '');

		// A bot filled the hidden field. Report success and store nothing, so it
		// gets no signal that the submission was rejected.
		if (honeypot) return { success: true, source };

		if (!email) {
			return fail(400, { source, email, error: 'Enter your email address.' });
		}

		if (email.length > 254 || !EMAIL.test(email)) {
			return fail(400, { source, email, error: 'That doesn’t look like a valid email address.' });
		}

		await recordSignup({ email, source, at: new Date().toISOString() });

		return { success: true, source };
	}
} satisfies Actions;
