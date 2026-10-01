<script lang="ts">
	import { hero } from '$lib/data/content';
	import AudienceHero from './AudienceHero.svelte';
</script>

<!-- The service-provider hero. Shares its composition with the client section
     at the foot of the page — see AudienceHero for the measurements. -->
<AudienceHero
	name="hero"
	heading={hero.headline}
	body={[[{ text: hero.subhead }]]}
	chips={hero.chips}
	source="hero"
	waitlistId="waitlist"
/>
