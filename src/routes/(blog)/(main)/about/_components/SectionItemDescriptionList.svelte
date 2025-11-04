<script lang="ts">
	let { children } = $props();
</script>

<ul class="ml-6 list-disc">
	{@render children?.()}
</ul>
