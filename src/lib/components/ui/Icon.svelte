<script lang="ts">
	interface Props {
		/** Filename (without extension) of an SVG in /static/icons. */
		name: string;
		size?: number;
		class?: string;
	}

	let { name, size = 24, class: className = '' }: Props = $props();
</script>

<img
	src="/icons/{name}.svg"
	alt=""
	aria-hidden="true"
	width={size}
	height={size}
	class={['shrink-0 object-contain', className]}
	style="width:{size}px;height:{size}px"
/>
