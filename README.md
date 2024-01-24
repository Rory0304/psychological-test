# Psychological Test
> 커리어넷의 API 활용하여 제작한, 직업 가치관 검사를 진행할 수 있는 서비스입니다.

## Table of Contents
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Test](#test)
* [Usage](#usage)
* [Room for Improvement](#room-for-improvement)


## Technologies Used
- "@reduxjs/toolkit": "^1.6.1"
- "bootstrap": "^5.3.1"
- "chart.js": "^4.4.1"
- "html2canvas": "^1.4.1"
- "immer": "^10.0.2"
- "jspdf": "^2.5.1"
- "react": "^18.2.0"
- "react-bootstrap": "^2.8.0"
- "react-chartjs-2": "^5.2.0"
- "react-redux": "^8.1.2"
- "redux": "4.2.1"
- "redux-thunk": "^2.4.2"
- "styled-components": "^5.3.0"
- "typescript": "^5.1.6"


> 전역 상태 학습을 진행하며 제작하였기 때문에, redux 와 redux toolkit 사용한 브랜치는 따로 관리되고 있습니다.
> 
> [apply_redux 브랜치](https://github.com/Rory0304/psychological-test/tree/feat/apply_naive_redux): redux, immer, typesafe-actions, redux-thunk 사용 / modules 내부 리듀서 코드 정의
> 
> [apply_rtk 브랜치](https://github.com/Rory0304/psychological-test/tree/feat/apply_rtk): rtk 로 개선, features 내부 리듀서 코드 정의



## Features
1) 직업 가치관 검사를 진행하고, 결과지에 대해서 pdf 로 다운로드할 수 있습니다.
2) 스크린리더기 NVDA 및 Mac VoiceOver 와 색맹 사용자를 위한 WCAG Contrast checker 로 테스트를 진행하며, 웹 표준을 만족하였습니다. 스크린 리더 사용자도 편하게 사용 가능합니다.


## Demo
[https://psychological-test-bay.vercel.app](https://psychological-test-bay.vercel.app/)

![demo](/docs/result.png)

## Accessibility
- 색맹 사용자를 고려하여 단순히 색상으로 구분하는 것이 아닌, 버튼에 라벨 텍스트를 추가하여 비활성화/활성화 상태의 구분을 해주었으며, WCAG Contrast checker를 통해 WCAG accessibility 를 준수하는지 검사하여 안정적인 접근성을 확보하였습니다.

![accessibility1](/docs/accessibility1.png)
![accessibility2](/docs/accessibility2.png)

- 바 차트 구현을 위해 `react-chartjs-2` 를 사용하였으며, canvas 로 구현이 되기 때문에 스크린 리더 사용자는 해당 데이터 정보를 인식하지 못하는 문제가 있었습니다.
이를 해결하기 위해, clip 과 position 을 활용한 **텍스트 요소 숨김 기법**을 활용하여 canvas 로 이루어진 데이터 차트 정보를 스크린리더 사용자도 인식할 수 있도록 지원하였습니다.

![accessibility3](/docs/accessibility3.png)


## Usage
### Convension
`FEAT`  새로운 기능의 추가  
`FIX`  버그 수정  
`DOCS`  문서 수정  
`STYLE`  스타일 관련 
`REFACTOR`  코드 리펙토링  
`CHORE`  빌드 업무 수정, 패키지 매니저 수정(ex .gitignore 수정 같은 경우)  


### Directory
```
src
 ┣ api: 각종 api 스펙
 ┣ components: 컴포넌트 관련
 ┃ ┗ blocks: 전역 페이지에서 사용하게 될 공통 컴포넌트 parts
 ┃ ┗ pages: 지역(개별) 페이지에서 사용하게될 컴포넌트
 ┣ constants
 ┃ ┗ psyResult: 가치관 검사 결과에 사용되는 상수
 ┣ context: React.Context 관리
 ┣ hooks
 ┣ styles
 ┣ store
 ┣ types
 ┣ utils
 ┃ ┗ apiFetch: API fetch 에 사용되는 유틸
 ┃ ┗ koreanParticles: 한글 유니코드 활용한 유틸
 ┃ ┗ pdf: pdf 관련 유틸
 ┗ package.json
```
