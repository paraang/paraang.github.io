<script>
	import { resolve, asset } from '$app/paths';
	import { BLOG_NAME, GITHUB_USERNAME } from '@/config/blog';
</script>

<header class="p-8">
	<h1 class="mb-4 font-black-sans text-6xl text-(--primary-blue)">
		<a href={resolve('/')}>
			{BLOG_NAME}
		</a>
	</h1>
	<div class="flex flex-row gap-x-4">
		<img class="h-20 w-20 rounded-full object-cover" src={asset('/images/profile.png')} alt="" />
		<div>
			<span
				class="mb-1 inline-block cursor-pointer rounded-md bg-(--primary-blue) px-2 py-1 font-semibold text-background"
			>
				@{GITHUB_USERNAME}
			</span>
			<p class="mb-2 text-inherit">
				길잃은 개발자.
				<br />
				요즘엔 어디로 가야할지 찾는 중입니다.
			</p>
		</div>
	</div>
</header>
