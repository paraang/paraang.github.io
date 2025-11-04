---
title: .d.ts를 쓰지 말아야 하는 이유
id: BG-3
description: 타입스크립트를 쓰면서 .d.ts를 이용하여 타입선언을 하면 안되는 이유.
date: '2023-07-17 21:48'
categories:
  - TypeScript
published: false
---

# d.ts를 쓰지 말아야 하는 이유

그는 많은 개발자들이 타입스크립트에서 declaration 파일을 사용하는 방법에 대해 말하고 싶은게 있다고 합니다.

## 타입을 선언하는 2가지 방법

타입을 선언하는 방법에는 2가지 방법이 있습니다.

- .ts
- .d.ts

여기서 `.d.ts` 형식의 파일이 곧 `declaration` 파일이라고 불리는 것입니다.  
반면, `.ts` 혹은 `.tsx` 형식의 파일은 우리가 일반적으로 쓰는 모듈 파일이죠.

```ts
// src/index.ts
type MyCodeInput = {
	whatever: string;
	something: string;
};

export const myCode = (input: MyCodeInput) => {};
```

`index.ts` 파일에 타입과 함수가 함께 선언되어 있다고 칩시다.  
흔히 타입과 함수를 분리하려고 할 수 있습니다. 그렇게 되면 아래처럼 나뉘겠죠.

```ts
// src/types.ts
export type MyCodeInput = {
	whatever: string;
	something: string;
};

// src/index.ts
import { MyCodeInput } from './types';

export const myCode = (input: MyCodeInput) => {};
```

타입과 런타임 코드를 불리하는 것은 앞선 방식과 차이가 없습니다.
그저 1개의 모듈을 2개의 모듈로 분리할 것일 뿐입니다.

그런데 타입을 분리할 때 `.d.ts`를 이용하면 어떻게 될까요?

```ts
// src/types.ts
export type MyCodeInput = {
	whatever: string;
	something: string;
};

// src/types.d.ts
export type MyCodeInput = {
	whatever: string;
	something: string;
};
```

## 무슨 차이가 있을까?

직전의 예시에서 표면적으로 봤을 때 둘의 차이는 전혀 없어 보입니다.
심지어 `.d.ts`에도 런타임 코드를 쓸 수 있는 것처럼 보이기도 합니다.

```ts
// src/types.d.ts
export type MyCodeInput = {
	whatever: string;
	something: string;
};

const runtime = () => {};
```

하지만 이 방식이 좋지 않은 이유는 다음과 같습니다.

```json
// tsconfig.json
{
	"compilerOptions": {
		"target": "es2016",
		"module": "commonjs",
		"strict": true,
		"skipLibCheck": true /* Skip type checking all .d.ts files. */
	}
}
```

`tsconfig` 파일이 있습니다. 여러 옵션들 중 `skipLibCheck`가 있는데, 이것은 모든 `.d.ts` 파일에 대한 타입 검사를 건너뛰도록 합니다.
이 속성을 `false`로 바꾸면 어떻게 될까요?

```ts
// src/types.d.ts
export type MyCodeInput = {
	whatever: string;
	something: string;
};

const runtime = () => {};
// error
// Top-level declarations in .d.ts files must start with either a 'declare' or 'export' modifier.
```

타입이 아닌 런타임 코드에는 에러가 발생하며, 이넘도 마찬가지입니다.

```ts
// src/types.d.ts
enum Something {}
// error
// Top-level declarations in .d.ts files must start with either a 'declare' or 'export' modifier.
```
