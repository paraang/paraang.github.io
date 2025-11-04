---
title: GCP 제한된 서비스 계정 생성
id: BG-5
description: Google Cloud Console에서 특정 역할의 서비스 계정만을 생성할 수 있도록 제한하는 방법.
date: '2023-10-31 21:13'
categories:
  - GCP
published: true
---

# 제한된 역할의 서비스 계정만 생성하게 하기

`Google Cloud Platform` 혹은 `Google Maps Platform` 등에서 특정 제품을 사용할 때 임의의 권한을 가진 서비스 계정을 생성해야할 때가 있습니다.
혹은 프로젝트에 접근 가능한 사용자들 내에서 권한을 제한해야 할 수도 있구요.

기본적으로 누군가가 서비스 계정을 생성할 수 있도록 하려면 아래의 세 가지 권한이 필요합니다.

- iam.serviceAccounts.create
- iam.serviceAccounts.list
- resourcemanager.projects.setIamPolicy

위 두가지는 서비스 계정 목록을 볼 수 있거나 생성할 수 있는 권한입니다.
마지막 권한은 서비스 계정 생성 단계에서 역할을 부여할 수 있도록 합니다.

![1.png](/images/post/BG-5/1.png)

다만, 이 권한은 프로젝트의 모든 역할에 접근할 수 있기 때문에 적절치 않을 수 있습니다.
이 때, 특정 역할을 가진 서비스 계정만 생성할 수 있도록 제한하는 방법이 있습니다.

# service account viewer 생성

먼저, 준비 사항으로 서비스 계정 목록을 볼 수 있게 하는 커스텀 역할을 생성하겠습니다.
콘솔의 `IAM - Roles`로 접속한 뒤, `CREATE ROLE`을 선택해주세요.

아래와 같이 `iam.serviceAccounts.list`와 `iam.serviceAccounts.create` 권한만을 부여한 커스텀 역할을 생성합니다.

![3.png](/images/post/BG-5/3.png)

# IAM 권한 부여

이번엔, 콘솔의 `IAM - IAM`으로 접속합니다.

`GRANT ACCESS`를 선택하고 `principals`에 권한을 부여할 대상을 추가합니다.

역할 부여에서 이전에 만든 커스텀 역할과 함께 `Resource Manager - Project IAM Admin`을 선택하여 2가지를 부여합니다.

![5.png](/images/post/BG-5/5.png)

여기까지만 한다면, 해당 유저는 모든 종류의 서비스 계정을 생성할 수 있습니다.
제한 사항을 추가하려면, `Project IAM Admin` 우측에 있는 `+ ADD IAM CONDITION`을 눌러 조건을 추가해주어야 합니다.

제목과 설명을 적절히 입력하고, `CONDITION EDITOR` 탭을 선택합니다.

`CEL Editor`에 아래의 예시 조건을 입력해주세요.

```
api.getAttribute('iam.googleapis.com/modifiedGrantsByRole', []).hasOnly(['roles/pubsub.editor', 'roles/pubsub.publisher'])
```

이것은 구성원이 부여하거나 취소할 수 있는 역할을 지정하는 표현식입니다.
`hasOnly` 함수에 지정할 역할들을 배열로 넣어주면 됩니다.
위 예시에서는 아래 두가지 역할들을 지정하였습니다.

- roles/pubsub.editor
- roles/pubsub.publisher

![6.png](/images/post/BG-5/6.png)

작성을 완료하고 저장을 누르세요.

# 서비스 계정 생성해보기

이제 위에서 제한된 권한을 부여한 계정으로 접속하여 테스트를 해보겠습니다.

먼저, IAM에서 권한을 수정하려하면 아래와 같이 실패합니다.

![gif](/images/post/BG-5/gif_1.gif)

이번엔 서비스 계정으로 이동하여 서비스 계정을 만들어 봅니다.
앞서 지정한 역할과 무관한 것을 추가하면 실패하는 반면, 동일한 역할을 추가하면 성공하는 모습을 볼 수 있습니다.

![gif](/images/post/BG-5/gif_2.gif)
