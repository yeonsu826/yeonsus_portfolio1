# 정연수 포트폴리오

3D Environment Modeler & Technical Artist 정연수의 포트폴리오 사이트입니다.
3D 아트, 실감형 콘텐츠 실무, 인터랙티브 웹 작업을 한곳에 모았습니다.

- 배포 주소: https://yeonsu826.github.io/yeonsus_portfolio1/
- 3D 인터랙티브 뷰어: https://yeonsu826.github.io/3d_object_portfolio_v2/
- 개발 프로젝트 아카이브: https://kaput-muskox-1f4.notion.site/2a3a13adf6c48050b9b5cfe097165b8c

## 기술 스택

| 항목 | 사용 기술 |
| --- | --- |
| 프레임워크 | React 19 + TypeScript |
| 번들러 | Vite |
| 3D | Three.js, @react-three/fiber, @react-three/drei |
| 스타일 | CSS 변수 기반 커스텀 스타일 (다크 · 라이트 테마) |
| 배포 | GitHub Actions → GitHub Pages |

## 실행 방법

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173/yeonsus_portfolio1/)
npm run build    # 타입 검사 후 dist/ 생성
npm run preview  # 빌드 결과 미리보기
```

## 내용 수정하기

화면에 보이는 문구, 프로젝트, 자격증은 모두 `src/data/profile.ts` 한 곳에 모여 있습니다.
컴포넌트를 건드리지 않아도 이 파일만 고치면 사이트 내용이 바뀝니다.

- `profile` — 이름, 소개글, 외부 링크
- `projects` — Works 섹션의 프로젝트 목록
- `skillGroups` — Skills 섹션의 4개 분류
- `approaches` — Technical Approach 섹션의 최적화 항목
- `videos` — Video Log 섹션의 Vimeo 영상 (id와 세로 · 가로 구분)
- `credentials` — 자격 · 수료 목록

프로젝트 항목에서 쓸 수 있는 선택 속성입니다.

- `gallery` — 이미지 경로 배열을 넣으면 카드에 "이미지 N장 보기" 버튼이 생기고 라이트박스가 열립니다
- `highlights` — 성과나 담당 범위를 점 목록으로 강조합니다
- `fit: 'contain'` — 로고처럼 잘리면 안 되는 이미지에 씁니다
- `draft: true` — "준비 중" 배지를 붙입니다

새 이미지는 `public/imgs/`에 넣고 `'imgs/파일명.png'` 형태로 적으면 됩니다.
3D 작업물 렌더링은 `public/imgs/3d/`, 실무 프로젝트 사진은 `public/imgs/dev/` 아래에
프로젝트별로 정리돼 있습니다.

## 이미지 최적화

이미지를 새로 추가한 뒤에는 아래 명령으로 용량을 줄일 수 있습니다.
가로 1600px을 넘으면 줄이고, 결과가 원본보다 작을 때만 덮어씁니다.
`imgs/3d/`와 `imgs/dev/` 아래의 PNG는 렌더링 결과물과 현장 사진이라 JPG로 변환해 저장합니다.

```bash
npm run optimize:images
```

## 폴더 구조

```
src/
  components/   섹션별 컴포넌트와 스타일
  data/         사이트 콘텐츠 (profile.ts)
  hooks/        테마 전환, 스크롤 등장 효과
  styles/       전역 스타일과 디자인 토큰
public/
  imgs/         이미지
  imgs/3d/      3D 작업물 렌더링 (cafe, glasses, gamingroom, stage, models)
  imgs/dev/     실무 프로젝트 사진 (taean, geumsan, aigame, racing, ar, videoletter, process)
  aa/           Unity WebGL 빌드
  measure_distance/, AR_zappar/   기존 하위 페이지
legacy/         2023년 Bootstrap 버전 (참고용 보관)
```
