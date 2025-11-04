<script lang="ts">
	import Footer from '../_components/Footer.svelte';
	import Header from '../_components/Header.svelte';
	import Nav from '../_components/Nav.svelte';

	let { children } = $props();
</script>

<Header />
<Nav />
<main class="flex-1 p-8">
	{@render children?.()}
</main>
<Footer />
