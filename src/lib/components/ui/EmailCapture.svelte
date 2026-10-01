<script lang="ts">
	import Button from './Button.svelte';
	import { waitlist } from '$lib/data/content';

	interface Props {
		/** Tags which form a signup came from, and namespaces this form's ids. */
		source: string;
		/** `dark` sits on the navy hero, `light` on the amber CTA. */
		tone?: 'dark' | 'light';
		class?: string;
		/** Overrides the shared example address — the client panel's frame sets a
		 *  shorter one than the hero's. */
		placeholder?: string;
	}

	let { source, tone = 'dark', class: className = '', placeholder = waitlist.placeholder }: Props =
		$props();

	/**
	 * The waitlist endpoint: static/waitlist.php, deployed beside index.html in
	 * public_html. It answers `{ "ok": true }` once the signup is saved.
	 */
	const ENDPOINT = '/waitlist.php';

	// Deliberately permissive: this checks that an address is shaped like one,
	// not that it is deliverable. Same rule the server action used to apply.
	const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

	// Each form keeps its own outcome, so submitting one never lights up another.
	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let error = $state('');

	const emailId = $derived(`${source}-email`);
	const messageId = $derived(`${source}-message`);

	const input = $derived(
		[
			'w-full rounded-[10px] border bg-transparent px-4 py-[15px] text-[15px]',
			'placeholder:italic focus:ring-0',
			tone === 'dark'
				? 'border-accent text-white placeholder:text-white/45'
				: 'border-ink/50 text-ink placeholder:text-ink/45'
		].join(' ')
	);

	/**
	 * Posts the form with fetch so the visitor stays on the page.
	 *
	 * Success is only what the endpoint says it is: `{ "ok": true }` in the body.
	 * A bare 200 is not enough — on a host that does not run the script, a POST
	 * can come back 200 with the homepage's HTML, and treating that as success
	 * told visitors they were signed up while the address went nowhere.
	 *
	 * Without JavaScript the same form still works: the browser posts it to the
	 * same endpoint, which answers with a plain confirmation page.
	 */
	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const email = String(data.get('email') ?? '').trim();

		// A bot filled the hidden field. Report success and send nothing, so it gets
		// no signal that the submission was rejected.
		if (data.get('company')) {
			status = 'success';
			return;
		}

		if (!email) {
			error = waitlist.errors.empty;
			status = 'error';
			return;
		}
		if (email.length > 254 || !EMAIL.test(email)) {
			error = waitlist.errors.invalid;
			status = 'error';
			return;
		}

		status = 'submitting';
		try {
			const response = await fetch(ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Accept: 'application/json'
				},
				body: new URLSearchParams([...data].map(([key, value]) => [key, String(value)])).toString()
			});
			const reply: unknown = await response.json().catch(() => null);
			const result = (reply ?? {}) as { ok?: unknown; error?: unknown };

			if (result.ok === true) {
				status = 'success';
				form.reset();
				return;
			}
			error =
				result.error === 'invalid'
					? waitlist.errors.invalid
					: result.error === 'rate'
						? waitlist.errors.rate
						: waitlist.errors.failed;
			status = 'error';
		} catch {
			error = waitlist.errors.failed;
			status = 'error';
		}
	}
</script>

<div class={className}>
	<form
		action={ENDPOINT}
		method="POST"
		class="flex flex-col gap-3 sm:flex-row sm:items-center"
		onsubmit={submit}
	>
		<input type="hidden" name="source" value={source} />

		<!-- Honeypot: off-screen rather than display:none so bots still fill it. -->
		<div class="absolute top-auto left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
			<label for="{source}-company">Company</label>
			<input id="{source}-company" name="company" type="text" tabindex="-1" autocomplete="off" />
		</div>

		<label class="sr-only" for={emailId}>{waitlist.label}</label>
		<input
			id={emailId}
			name="email"
			type="email"
			required
			autocomplete="email"
			{placeholder}
			aria-invalid={status === 'error' ? 'true' : undefined}
			aria-describedby={status === 'idle' ? undefined : messageId}
			class={input}
		/>

		<Button
			type="submit"
			size="form"
			variant={tone === 'dark' ? 'primary' : 'dark'}
			disabled={status === 'submitting'}
		>
			{status === 'submitting' ? 'Joining…' : waitlist.submit}
		</Button>
	</form>

	<p
		id={messageId}
		role={status === 'error' ? 'alert' : 'status'}
		aria-live="polite"
		class={[
			'mt-2 min-h-5 text-sm',
			status === 'error' ? 'text-accent' : tone === 'dark' ? 'text-mint' : 'text-ink'
		]}
	>
		{#if status === 'error'}
			{error}
		{:else if status === 'success'}
			{waitlist.success}
		{/if}
	</p>
</div>
