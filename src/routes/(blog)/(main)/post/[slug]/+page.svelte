<script lang="ts">
	import { formatDate } from '@/utils/date.util';
	import Seo from '@/components/widget/seo/seo.svelte';

	let { data } = $props();
</script>

<Seo title={data.metadata.title} description={data.metadata.description} />

<header class="mb-8">
	<h1 class="font-black-sans text-6xl text-inherit">
		{data.metadata.title}
	</h1>

	<ul class="mb-2 flex flex-wrap gap-x-2">
		{#each data.metadata.categories as category}
			<li class="text-sm">
				#{category}
			</li>
		{/each}
	</ul>

	<p class="text-sm text-muted-foreground">
		{formatDate(data.metadata.date)}
	</p>
</header>

<main class="">
	<article
		class="
      prose prose-base max-w-none
      prose-headings:text-foreground
			prose-p:text-foreground
			prose-a:text-foreground
			dark:prose-code:text-[#ebdbb2]
			prose-ol:text-foreground
			prose-ul:text-foreground
			prose-li:text-foreground
    "
	>
		{@render data.content()}
	</article>
</main>
