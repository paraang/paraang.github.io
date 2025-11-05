<script lang="ts">
	import SectionTitle from './_components/SectionTitle.svelte';
	import SectionItemTitle from './_components/SectionItemTitle.svelte';
	import SectionItemSubTitle from './_components/SectionItemSubTitle.svelte';
	import SectionItemDescriptionList from './_components/SectionItemDescriptionList.svelte';
	import { LINKS } from '@/config/blog';
	import Seo from '@/components/widget/seo/seo.svelte';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '@/components/ui/sonner';

	function onClickEmail() {
		window.navigator.clipboard.writeText(LINKS.email);
		toast.success('이메일이 클립보드에 복사되었습니다', {
			description: LINKS.email,
			duration: 2000,
		});
	}
</script>

<Seo />

<Toaster />

<article>
	<!-- 소개 -->
	<h2 class="mb-2 text-4xl font-semibold tracking-wider">장현광</h2>
	<p class="text-muted-foreground">웹 개발자</p>
	<hr class="my-4" />
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<p class="mb-2">
		Email
		<span id="emailTooltip" class="cursor-pointer text-sky-600 underline dark:text-sky-300" onclick={onClickEmail}>
			@wkdgusrhkd
		</span>
	</p>
	<p class="mb-8">
		Github
		<a href={LINKS.github} target="_blank" class="text-sky-600 underline dark:text-sky-300"> @paraang </a>
	</p>

	<!-- <Tooltip trigger="click" triggeredBy="#emailTooltip">Email copied!</Tooltip> -->

	<!-- 스킬 -->
	<section class="mb-8">
		<SectionTitle>Skills</SectionTitle>
		<hr class="my-1" />

		<SectionItemDescriptionList>
			<li>Frontend: JavaScript(TypeScript), React, Svelte, Tailwind</li>
			<li>Backend: Node.js, PostgreSQL, PostGIS</li>
			<li>Else: Docker</li>
		</SectionItemDescriptionList>
	</section>

	<!-- 경력 -->
	<section class="mb-8">
		<SectionTitle>Work experience</SectionTitle>
		<hr class="my-1" />

		<!-- 에스피에이치 -->
		<SectionItemTitle>SPH, 에스피에이치 - 웹 개발, 기술지원</SectionItemTitle>
		<SectionItemSubTitle>2022년 5월 ~ 현재</SectionItemSubTitle>

		<SectionItemDescriptionList>
			<li>Google Maps Platform 기술지원</li>
			<li>건설현장 관제 시스템 개발</li>
			<li>Angular, Openlayers, SpringBoot, PostgreSQL, PostGIS, Docker, SuperMap</li>
		</SectionItemDescriptionList>
	</section>

	<!-- 프로젝트 -->
	<!-- <section class="mb-8">
    <SectionTitle>Project</SectionTitle>
    <Divider extraClass="my-1" />

    <SectionItemTitle>
      <a href={LINK.olMeasurement} target="_blank">ol-measurement</a>
    </SectionItemTitle>
    <SectionItemSubTitle>2024년 10월 ~</SectionItemSubTitle>

    <SectionItemDescriptionList>
      <li>측정 툴을 생성해주는 `ol`의 커스텀 컨트롤 라이브러리</li>
      <li>npm, rollup, JavaScript</li>
    </SectionItemDescriptionList>
  </section> -->

	<!-- 교육 -->
	<section class="mb-8">
		<SectionTitle>Education</SectionTitle>
		<hr class="my-1" />

		<!-- 대학교 -->
		<SectionItemTitle>금오공과대학교 기계시스템공학과 학사</SectionItemTitle>
		<SectionItemSubTitle>2016년 3월 ~ 2022년 2월</SectionItemSubTitle>

		<!-- 고등학교 -->
		<SectionItemTitle>경주고등학교</SectionItemTitle>
		<SectionItemSubTitle>2013년 3월 ~ 2016년 2월</SectionItemSubTitle>
	</section>

	<!-- 자격증 -->
	<section class="mb-8">
		<SectionTitle>Certificate</SectionTitle>
		<hr class="my-1" />

		<!-- GCP -->
		<SectionItemTitle>
			<a href={LINKS.gcpCertificate} target="_blank"> Google Cloud Platform Associate Cloud Engineer </a>
		</SectionItemTitle>
		<SectionItemSubTitle>2023년 6월 ~ 2026년 6월</SectionItemSubTitle>
	</section>
</article>
