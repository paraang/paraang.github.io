<script>
	import { page } from '$app/state';
	import { BLOG_NAME, LINKS, METADATA } from '@/config/blog';

	export let title = BLOG_NAME;
	export let description = METADATA.description;
	export let image = '/images/wave.jpg';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:site_name" content={BLOG_NAME} />
	<meta property="og:url" content={LINKS.blog + page.url.pathname.toString()} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={LINKS.blog} />
	<meta property="twitter:url" content={LINKS.blog + page.url.pathname.toString()} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	{@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Website",
      "name": "${title}",
      "url": "${LINKS.blog + page.url.pathname.toString()}",
      "logo": "${image}"
    }
  </script>`}
</svelte:head>
