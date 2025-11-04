import { json } from '@sveltejs/kit';

async function getCategories() {
	const categories: string[] = [];

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file: any = paths[path];
		const metadata = file.metadata;

		/** 각 포스트의 카테고리 목록 */
		const postCategories: string[] = metadata.categories;
		if (postCategories && metadata.published) {
			postCategories.map((category) => {
				if (!categories.includes(category)) {
					categories.push(category);
				}
			});
		}
	}

	// 오름차순
	categories.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

	return categories;
}

export async function GET() {
	const posts = await getCategories();
	return json(posts);
}
