<script lang="ts">
	import { footer } from '$lib/data/site';
	import Logo from '$lib/components/ui/Logo.svelte';

	const paths = {
		instagram:
			'M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.17.4.37 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.17-1 .37-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm8.5-11.3a1.56 1.56 0 1 1-3.13 0 1.56 1.56 0 0 1 3.13 0Z',
		linkedin:
			'M6.94 8.5v10.9H3.56V8.5h3.38ZM5.25 3.1a1.96 1.96 0 1 1 0 3.92 1.96 1.96 0 0 1 0-3.92ZM20.44 19.4h-3.37v-5.3c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92v5.4H9.75V8.5h3.23v1.49h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17v6Z'
	};
</script>

<footer class="bg-ink text-white">
	<div class="container-page py-14">
		<div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
			<div class="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
				<Logo size="md" wordmark class="text-[#e8e8ee]" />
				<p class="text-sm leading-6 text-white/65">
					{#each footer.address as line (line)}
						{line}<br />
					{/each}
				</p>
			</div>

			<div class="flex flex-col items-center gap-6 md:items-end">
				<ul class="flex items-center gap-3">
					{#each footer.socials as social (social.href)}
						<li>
							<a
								href={social.href}
								rel="noopener noreferrer"
								target="_blank"
								class="flex h-10 w-10 items-center justify-center rounded-lg border border-white/25
								       text-white/80 transition-colors hover:border-white hover:text-white"
							>
								<span class="sr-only">{social.label}</span>
								<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d={paths[social.icon]} />
								</svg>
							</a>
						</li>
					{/each}
				</ul>

				<p class="flex flex-wrap items-center justify-center gap-4 text-xs tracking-[0.08em] text-white/60">
					<span>{footer.legal}</span>
					<span aria-hidden="true">—</span>
					<a href={footer.privacy.href} class="underline-offset-4 hover:text-white hover:underline">
						{footer.privacy.label}
					</a>
				</p>
			</div>
		</div>
	</div>
</footer>
