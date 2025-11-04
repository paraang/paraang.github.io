<script lang="ts">
	let { children } = $props();
</script>

<h4 class="mb-1 text-lg font-medium">
	{@render children?.()}
</h4>
