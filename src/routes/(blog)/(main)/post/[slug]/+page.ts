import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ params }: any) => {
	try {
		const post = await import(`../../../../../posts/${params.slug}.md`);

		return {
			content: post.default,
			metadata: post.metadata,
		};
	} catch (error) {
		console.error('Error loading post:', error);
	}
};
