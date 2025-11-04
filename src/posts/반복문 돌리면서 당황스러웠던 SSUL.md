---
title: 반복문 돌리려다가 당황스러웠던 SSUL
id: BG-8
description: javascript 반복문을 돌리려다가 기본적인 것을 생각치 못해 얼탔던 경험
date: '2023-11-14 22:44'
categories:
  - JavaScript
published: true
---

`JavaScript`에서 반복문 돌리다가 당황스러웠던 썰입니다.

# 뭐할려고 했는데?

1. DB에서 데이터를 가져온다.

```js
const arr = db.findMany();
```

2. DB에서 가져온 arr로 반복문을 실행한다.

반복문에서 `무언가`를 실행하는데, 이것은 비동기로 동작한다.
arr의 `el`를 기반으로 DB에서 새로운 데이터를 조회해온 뒤에 특정 알고리즘을 거친 뒤에 DB에 update를 한다.

```js
arr.map(async (el) => {
	// users에서 person A와 B를 조회
	const personA = await db.users.find(el.personAId);
	const personB = await db.users.find(el.personBId);

	// A와 B의 데이터로 임의의 계산 수행
	const result = someSecretAlgorithm(personA, personB);

	// 계산 결과를 users 테이블에 업데이트
	await db.users.update(el.personAId, result.pointA);
	await db.users.update(el.personBId, result.pointB);
});
```

그런데.... 스크립트 결과가... 뭔가 이상하다?

```js
arr.map(async (el) => {
	console.log('[el]', el);
	// users에서 person A와 B를 조회
	const personA = await db.users.find(el.personAId);
	const personB = await db.users.find(el.personBId);

	// A와 B의 데이터로 임의의 계산 수행
	const result = someSecretAlgorithm(personA, personB);
	console.log('[result]', result);

	// 계산 결과를 users 테이블에 업데이트
	await db.users.update(el.personAId, result.pointA);
	await db.users.update(el.personBId, result.pointB);
});
```

그래서... 콘솔을 한 번 찍어봤더니....?

```sh
# [el] { personAId: 3, personBId: 4 }
# [el] { personAId: 2, personBId: 6 }
# [el] { personAId: 5, personBId: 3 }
# [el] { personAId: 4, personBId: 2 }
# [result] { pointA: 23, pointB: 21 }
# [result] { pointA: 13, pointB: 36 }
# [result] { pointA: 23, pointB: 27 }
# [result] { pointA: 30, pointB: 15 }
```

아라라...?

내가... `async`를 잘못 썼나???

어딘가 `await`를 빠트렸나...?

아니... 왜...? `await`은 `async` 안에서 순차적으로 실행되는게 맞는데.... 아닌가...... ㅜㅜ....?

고민하던 찰나에...

![아하.jpg](/images/post/BG-8/아하.jpg)

아! `한 콜백` 안에서만 보장되는 것이라서 이게 맞게 실행 된 게 맞구나!
이걸 왜 생각 못했지?!

![이건-뭐-병신도-아니고.jpg](/images/post/BG-8/이건-뭐-병신도-아니고.jpg)

# `await`은 `async` 안에서만 순서를 보장한다.

잘 알고 있는 개념이었지만 반복문을 돌릴 때 습관적으로 `map`을 쓰다보니 이번에도 별 생각없이 쓰다가 얼타고 있었다.

```js
[1, 2, 3].map(async () => {
	await doSth();
	await doAnother();
});
```

하나의 콜백 안에서는 `doSth`과 `doAnother`이 순서대로 실행되지만 전체적으로 봤을 때 각 콜백은 순서를 보장받지 않는다.

# for문을 소중히 하자

> 결론: `for`문을 소중히 합시다!

```js
for (let i = 0; i < arr.length; i++) {
	const el = arr[i];

	console.log('[el]', el);
	// users에서 person A와 B를 조회
	const personA = await db.users.find(el.personAId);
	const personB = await db.users.find(el.personBId);

	// A와 B의 데이터로 임의의 계산 수행
	const result = someSecretAlgorithm(personA, personB);
	console.log('[result]', result);

	// 계산 결과를 users 테이블에 업데이트
	await db.users.update(el.personAId, result.pointA);
	await db.users.update(el.personBId, result.pointB);
}
```
