<script lang="ts">
	let { children } = $props();
</script>

<h3 class="text-xl font-semibold">
	{@render children?.()}
</h3>
