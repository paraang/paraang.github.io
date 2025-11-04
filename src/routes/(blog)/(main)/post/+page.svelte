<script lang="ts">
	import CategoryHashtag from '../../_components/CategoryHashtag.svelte';
	import PostCard from '../../_components/PostCard.svelte';
	import Seo from '@/components/widget/seo/seo.svelte';

	let { data } = $props();

	let currentPosts = $state(data.posts);
	let selectedCategory = $state('');

	function onClickCategoryHashtag(category: string) {
		if (selectedCategory === category) {
			selectedCategory = '';
		} else {
			selectedCategory = category;
		}
	}

	$effect(() => {
		currentPosts =
			selectedCategory === ''
				? data.posts
				: data.posts.filter((/** @type {{ categories: string | string[]; }} */ post) =>
						post.categories.includes(selectedCategory)
					);
	});
</script>

<Seo />

<!-- categories -->
<div class="mb-4">
	<ul class="flex flex-row flex-wrap items-baseline gap-x-2">
		{#each data.categories as category}
			<CategoryHashtag
				{category}
				selected={category === selectedCategory}
				onclick={() => onClickCategoryHashtag(category)}
			/>
		{/each}
	</ul>
</div>

<!-- posts -->
<ul class="flex flex-col gap-y-5">
	{#each currentPosts as post}
		<PostCard {post} />
	{/each}
</ul>
