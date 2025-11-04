import type { PostMetadata } from '@/types/type';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const getPosts = await fetch('/_api/posts');
	const getCategories = await fetch('/_api/categories');

	const posts: PostMetadata[] = await getPosts.json();
	const categories: string[] = await getCategories.json();

	return {
		posts,
		categories,
	};
};
