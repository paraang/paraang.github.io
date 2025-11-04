<script lang="ts">
	let { category, onclick, selected } = $props<{
		category: string;
		selected?: boolean;
		onclick?: () => void;
	}>();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<li class="cursor-pointer {selected ? 'text-xl' : 'text-sm'}" {onclick}>
	#{category}
</li>
