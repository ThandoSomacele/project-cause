<script lang="ts">
	interface Props {
		/** Filename (without extension) of an SVG in /static/icons. */
		name: string;
		/** Sizing comes from the caller as classes — `width`/`height` below are
		 *  plain HTML attributes, which reserve space without needing CSS. */
		class?: string;
		width?: number;
		height?: number;
	}

	let { name, class: className = 'h-6 w-6', width = 24, height = 24 }: Props = $props();
</script>

<img
	src="/icons/{name}.svg"
	alt=""
	aria-hidden="true"
	{width}
	{height}
	class={['shrink-0 object-contain', className]}
/>
