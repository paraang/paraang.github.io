<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	// import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<ModeWatcher />
<div class="min-h-full font-noto-sans antialiased">
	{@render children?.()}
</div>
