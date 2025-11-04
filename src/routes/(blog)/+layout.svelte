<script>
	let { children } = $props();
</script>

<div class="mx-auto flex h-full max-w-(--blog-width) flex-col">
	{@render children?.()}
</div>
