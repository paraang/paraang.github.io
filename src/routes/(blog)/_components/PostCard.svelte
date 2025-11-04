<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '@/utils/date.util';

	export let post;
</script>

<li class="group cursor-pointer">
	<a href={resolve(`/post/${post.slug}`)}>
		<h3 class="text-xl font-medium underline-offset-4 group-hover:underline">{post.title}</h3>
		<p class="text-base text-muted-foreground">{post.description}</p>
		<p class="mt-1 text-xs text-muted-foreground">{formatDate(post.date)}</p>
	</a>
</li>
