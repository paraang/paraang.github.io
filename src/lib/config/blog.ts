export const BLOG_NAME = '파랑';

export const GITHUB_USERNAME = 'paraang';

export const BLOG_TITLE = BLOG_NAME;
export const METADATA = {
	description: "Hyeongwang(parang)'s Personal dev blog. Record studies or daily life.",
	keywords:
		'파랑, paraang, parang, 개발 블로그, 웹 개발, JavaScript, TypeScript, Svelte, SvelteKit, React, Next.js, 프론트엔드, DevOps, 기술, Node.js, NestJS, postgresql, Docker',
	author: 'Hyeongwang Jang, 장현광, 파랑, hgJang, parang, paarang',
};

export const LINKS = {
	blog: 'https://paraang.github.io',
	github: 'https://github.com/paraang',
	email: 'wkdgusrhkd@gmail.com',
	gcpCertificate:
		'https://google.accredible.com/6d9c66ef-3808-4f33-8c46-51402f2adce4?key=5f9b0e333cd2621db82ff534d3defc7dd7b341586425e165f5138294858bfa01',

	internal: {
		home: '/',
		posts: '/post',
		wave: '/wave',
		about: '/about',
	},
};

export const NAVS = [
	{
		nav: '포스트',
		path: LINKS.internal.posts,
		active: true,
	},
	{
		nav: '소개',
		path: LINKS.internal.about,
		active: true,
	},
];
