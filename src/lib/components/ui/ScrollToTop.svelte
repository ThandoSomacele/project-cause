<script lang="ts">
	/**
	 * Returns the reader to the top of the page. The page runs long — the landing
	 * page is around 15,000px — so scrolling back by hand is a real cost.
	 *
	 * Hidden until the reader is a screen or so down: at the top it would be a
	 * control that does nothing, sitting over the hero.
	 */
	let shown = $state(false);

	$effect(() => {
		const onscroll = () => (shown = window.scrollY > window.innerHeight * 0.8);
		onscroll();
		window.addEventListener('scroll', onscroll, { passive: true });
		return () => window.removeEventListener('scroll', onscroll);
	});

	function toTop() {
		// Honour the same motion preference the stylesheet's `scroll-behavior`
		// respects, so the two never disagree.
		const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
	}
</script>

<!--
	Bottom-left, clear of the footer's content and of the waitlist forms on the
	right. `inert` while hidden so it leaves the tab order rather than being a
	focusable control the reader cannot see.
-->
<button
	type="button"
	onclick={toTop}
	aria-label="Scroll back to the top of the page"
	inert={!shown}
	class={[
		'fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full',
		'bg-ink text-white shadow-lg ring-1 ring-white/10 transition-all duration-300',
		'hover:bg-accent hover:text-ink focus-visible:ring-2 focus-visible:ring-accent',
		shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
	]}
>
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M12 19V5m0 0-7 7m7-7 7 7"
			stroke="currentColor"
			stroke-width="2.2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</button>
