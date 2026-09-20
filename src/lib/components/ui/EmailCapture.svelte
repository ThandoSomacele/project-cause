<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './Button.svelte';
	import { waitlist } from '$lib/data/content';

	export interface WaitlistResult {
		success?: boolean;
		source?: string;
		email?: string;
		error?: string;
	}

	interface Props {
		/** Distinguishes this form's result from the other waitlist form on the page. */
		source: string;
		/** `dark` sits on the navy hero, `light` on the amber CTA. */
		tone?: 'dark' | 'light';
		form?: WaitlistResult | null;
		class?: string;
		/** Overrides the shared example address — the client panel's frame sets a
		 *  shorter one than the hero's. */
		placeholder?: string;
	}

	let {
		source,
		tone = 'dark',
		form = null,
		class: className = '',
		placeholder = waitlist.placeholder
	}: Props = $props();

	let submitting = $state(false);

	// Both waitlist forms post to the same action, so only react to our own result.
	const mine = $derived(form?.source === source ? form : null);

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
</script>

<div class={className}>
	<form
		method="POST"
		action="?/waitlist"
		class="flex flex-col gap-3 sm:flex-row sm:items-center"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				submitting = false;
				await update();
			};
		}}
	>
		<input type="hidden" name="source" value={source} />

		<!-- Honeypot: off-screen rather than display:none so bots still fill it. -->
		<div class="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
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
			value={mine?.email ?? ''}
			aria-invalid={mine?.error ? 'true' : undefined}
			aria-describedby={mine ? messageId : undefined}
			class={input}
		/>

		<Button
			type="submit"
			size="form"
			variant={tone === 'dark' ? 'primary' : 'dark'}
			disabled={submitting}
		>
			{submitting ? 'Joining…' : waitlist.submit}
		</Button>
	</form>

	<p
		id={messageId}
		role={mine?.error ? 'alert' : 'status'}
		aria-live="polite"
		class={[
			'mt-2 min-h-5 text-sm',
			mine?.error ? 'text-accent' : tone === 'dark' ? 'text-mint' : 'text-ink'
		]}
	>
		{#if mine?.error}
			{mine.error}
		{:else if mine?.success}
			{waitlist.success}
		{/if}
	</p>
</div>
