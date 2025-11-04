<script lang="ts">
	let { children } = $props();
</script>

<p class="mb-1 text-sm text-muted-foreground">
	{@render children?.()}
</p>
