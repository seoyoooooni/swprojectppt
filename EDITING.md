# 매주 발표 수정하기

## 평소에는 이 파일만 수정하세요

`src/presentations/week-01/presentation.json`

주차마다 내용·순서는 `presentation.json`, 디자인·배치는 같은 폴더의 파일에서 독립적으로 관리합니다. 문구와 순서만 바꿀 때는 React 코드를 수정할 필요가 없습니다. 새 주차는 목록에 자동 등록됩니다.

```text
src/presentations/
  week-01/
    presentation.json       목록 정보, 내용, 슬라이드 순서
    Design.js               전체 화면 구성, 헤더와 하단 표시
    Slide.js                슬라이드 유형별 배치
    style.css               1주차 전용 색상, 글꼴, 간격
  week-02/                  생성 명령 실행 시 같은 구조로 추가
  shared/
    Presentation.js         키보드 이동과 현재 슬라이드 상태만 공유
src/data/presentations.js   주차 내용과 디자인 자동 등록
scripts/new-week.cjs        독립적인 새 주차 생성
```

## 실행과 새 주차 추가

```bash
npm start
npm run new-week
```

`new-week`는 현재 가장 큰 주차의 다음 주차를 만듭니다. 번호를 지정하려면 `npm run new-week -- 2`를 실행하세요. 기존 주차는 덮어쓰지 않습니다. 새 주차의 디자인 파일은 1주차에서 독립 복사하며, 이후에는 서로 영향을 주지 않습니다. 기본 틀은 같지만 새 주차의 배치와 스타일은 자유롭게 바꿀 수 있습니다. 생성한 파일을 저장하면 목록에 자동으로 나타납니다. 실행 중인 서버에서 새 폴더가 반영되지 않으면 서버를 다시 시작하세요.

## 제목, 내용, 순서 수정

파일 위쪽의 `title`, `summary`, `date`는 발표 목록에 표시됩니다. `week`는 표시할 주차입니다. 링크 주소는 폴더명(`week-01`)으로 결정됩니다. `date`는 `260909` 같은 표시용 문자열입니다.

`slides` 안의 각 `{ ... }`가 한 장입니다.

- 내용 변경: 따옴표 안의 문장을 수정합니다.
- 순서 변경: 슬라이드의 `{ ... }` 전체를 원하는 위치로 옮깁니다.
- 추가: 같은 유형의 슬라이드를 복사하고 문장을 바꿉니다.
- 삭제: 해당 슬라이드 객체를 지웁니다. 최소 한 장은 남겨두세요.
- 줄바꿈: 문장 안에 `\n`을 씁니다. `<br />` 등의 HTML은 쓰지 않습니다.
- JSON에는 주석이나 마지막 항목 뒤의 쉼표를 넣을 수 없습니다. 문장 안의 큰따옴표는 `\"`로 적습니다.

표지의 제목은 `slides` 안에 따로 있으므로 목록 제목과 각각 수정할 수 있습니다.

## 가장 자주 쓰는 슬라이드

다음 객체를 `slides` 안에 넣으세요. 다른 슬라이드와의 사이는 쉼표로 구분합니다.

### 표지

```json
{
  "type": "cover",
  "title": "문화생활 기록\n공유 서비스",
  "description": "이번 주 발표의 핵심 한 문장"
}
```

### 자유로운 목록

```json
{
  "type": "bullets",
  "title": "이번 주 진행한 일",
  "description": "설명이 필요 없으면 빈 문자열로 두세요.",
  "items": ["기록 작성 화면 설계", "캘린더 화면 초안 제작", "검색 데이터 조사"]
}
```

`items`는 필요에 따라 추가하거나 삭제합니다. 한 장에 3~5개의 짧은 문장을 권합니다. 내용이 길어지면 장을 나누세요.

### 제목과 설명을 가진 항목

```json
{
  "type": "reason",
  "title": "이번 주 확인한 내용",
  "description": "",
  "items": [
    { "title": "기록 화면", "text": "제목과 날짜를 먼저 입력하도록 구성했습니다." },
    { "title": "캘린더", "text": "날짜별로 기록 사진을 표시합니다." }
  ]
}
```

`reason`은 이름과 관계없이 제목·설명이 있는 카드 목록에 사용할 수 있습니다.

## 추가로 지원하는 기본 유형

모든 유형은 공통으로 `type`, `title`, `description`을 사용합니다. 아래 유형도 해당 주차의 `Slide.js`에서 지원합니다. 아래 필드를 갖는 슬라이드를 추가해 사용할 수 있습니다. `type`을 바꿀 때는 필요한 항목도 함께 바꾸세요.

| type | 용도 | 편집할 항목 |
| --- | --- | --- |
| record | 항목을 묶은 표 | `groups`: 각 그룹의 `label`, `items` 문자열 목록, `note` |
| features | 핵심 기능 강조 | `features`: `title`, `text`. 첫 번째 항목이 크게 표시됨. 3개 항목 배치에 맞춰져 있음 |
| questions | 논의 사항 | `questions` 문자열 목록, 하단 `currentIdea` |
| ai | 추천 구상 | `input` 문자열 목록, `example`, `undecided` |
| tech | 기술 스택 표 | `stack`: 각 행의 `area`, `tech`, `purpose`, `status`. 하단 `environment` |
| next | 번호가 있는 계획 | `tasks`: 각 항목의 `number`, `title`, `text`. 하단 `conclusion` |

항목이 많으면 다른 장으로 나누세요. 이 유형 목록은 1주차와 새 주차 생성 직후의 기본 틀입니다. 각 주차의 `Slide.js`에서 유형을 추가하거나 배치를 바꿀 수 있고, 다른 주차에는 영향을 주지 않습니다.

## 디자인이나 새로운 구조가 필요할 때

해당 주차 폴더 안에서 수정하세요.

- 문구·장 순서·장 추가/삭제: `presentation.json`
- 색상·글자 크기·여백·배경: `style.css`
- 슬라이드 안의 좌우 배치·표·새로운 유형: `Slide.js`
- 헤더·진행 표시·전체 화면 구성: `Design.js`

1주차 스타일 이름은 `week01-`, 2주차는 `week02-`처럼 주차별로 구분됩니다. 새 CSS 선택자와 애니메이션 이름에도 해당 주차의 접두사를 붙이세요. `body`, `h1`, `:root` 같은 전역 선택자를 추가하면 다른 주차에도 영향을 줄 수 있습니다.

`shared/Presentation.js`는 키보드 이동만 관리합니다. 일반적인 내용·디자인 수정에는 건드리지 않아도 됩니다. 사이트 전체 스타일인 `src/styles/base.css`는 모든 주차에 적용되므로, 주차 디자인은 각 폴더의 `style.css`에서 바꾸세요.

Codex에 요청할 때는 예를 들어 “2주차 presentation.json의 내용만 바꿔줘”, “3주차에 비교표 유형을 추가해줘. 이전 주차 디자인은 유지해줘”처럼 수정 범위를 알려주면 됩니다.

## 발표와 확인

- 다음 장: 오른쪽/아래 방향키, Space, Enter, PageDown
- 이전 장: 왼쪽/위 방향키, PageUp
- 첫 장 / 마지막 장: Home / End
- 목록으로 돌아가기: Esc
- 배포용 빌드 확인: `npm run build`
- 테스트: `CI=true npm test -- --watchAll=false`

저장 후 브라우저에서 수정한 장을 확인하세요. JSON 구문 오류는 개발 서버 화면에 표시됩니다. 슬라이드의 필수 항목이 빠지거나 유형이 맞지 않으면 화면이 정상적으로 표시되지 않을 수 있습니다.


## 현재 1주차의 7장 구성

| 페이지 | type | 내용 수정 위치 |
| --- | --- | --- |
| 1 | cover | `title`, `description` |
| 2 | motivation | `items` 안의 `title`, `text` |
| 3 | recording | `calendar` 캘린더 기능 설명, `items` 기록 기능 설명, `categories` |
| 4 | social | `account`, `privacy`, `together`, `recommendation` |
| 5 | stack | `items` 안의 `label`, `name`, `detail` |
| 6 | recommendation | `stages`, `explanation`, `initial`, `later` |
| 7 | roadmap | `tasks` 안의 `title`, `text` |

6장의 `notes`와 `sources`는 편집할 때 참고하는 메모·출처이며 발표 화면에는 표시하지 않습니다. 이전 기본 유형도 계속 사용할 수 있습니다.
