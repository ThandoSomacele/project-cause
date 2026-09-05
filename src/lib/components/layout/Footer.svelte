<script lang="ts">
	import { footer } from '$lib/data/site';
	import Logo from '$lib/components/ui/Logo.svelte';

	const paths = {
		instagram:
			'M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.17.4.37 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.17-1 .37-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm8.5-11.3a1.56 1.56 0 1 1-3.13 0 1.56 1.56 0 0 1 3.13 0Z',
		facebook:
			'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z'
	};
</script>

<footer class="bg-ink text-white">
	<div class="container-page py-14">
		<div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
			<div class="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
				<Logo variant="lockup" tone="white" size="lg" />
				<p class="text-[14px] leading-[19.6px] font-light text-white/85">
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

				<p class="flex flex-wrap items-center justify-center gap-4 text-[14px] tracking-[0.05px] text-white/85 uppercase">
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
