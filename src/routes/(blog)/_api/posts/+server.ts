import type { PostMetadata } from '$lib/types/type';
import { json } from '@sveltejs/kit';

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}

async function getPosts() {
	const posts: PostMetadata[] = [];

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path] as any;
		const slug = path.split('/').at(-1)?.replace('.md', '');
		const metadata = file.metadata;
		const post: PostMetadata = { ...metadata, slug };

		if (post.published) {
			posts.push(post);
		}

		posts.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
	}
	return posts;
}
