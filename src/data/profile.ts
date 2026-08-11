/**
 * 사이트에 표시되는 모든 문구와 프로젝트 목록을 이 파일에서 관리한다.
 * 화면을 고치고 싶을 때 컴포넌트가 아니라 여기부터 보면 된다.
 */

/** public/ 아래의 정적 파일 경로를 배포 base 경로 기준으로 변환한다. */
export const asset = (path: string) =>
  import.meta.env.BASE_URL + encodeURI(path.replace(/^\//, ''))

export const profile = {
  name: '정연수',
  nameEn: 'Yeonsu Jeong',
  role: '3D Environment Modeler & Technical Artist',
  tagline: '현실과 디지털이 자연스럽게 맞닿는 세계를 설계합니다',
  intro:
    'Unity 개발자로 커리어를 시작해, 코드 너머의 시각적인 공간을 직접 만들기 위해 3D 배경 모델러로 전향했습니다. 프로그래밍을 아는 아티스트로서 엔진 최적화와 PBR 워크플로우를 이해하고, 심미성과 퍼포먼스를 함께 잡는 테크니컬 아트를 지향합니다.',
  location: 'Seoul, KR',
  links: {
    /** 이전 저장소. 브라우저에서 3D 모델을 직접 돌려보는 뷰어로만 쓴다. */
    portfolio3d: 'https://yeonsu826.github.io/3d_object_portfolio_v2/',
    linkedin: 'https://www.linkedin.com/in/yeonsu0826/',
    github: 'https://github.com/yeonsu826',
    instagram: 'https://www.instagram.com/yeon_ddooo/',
    blog: 'https://blog.naver.com/infoinno1010',
    resume: 'https://drive.google.com/file/d/1S5l1hjqF2LQx7BpwWawoZ8XIxiitwTWA/view?usp=sharing',
    email: 'yeonsu826@gmail.com',
  },
} as const

/** Works 섹션의 필터 탭. id는 project.category와 연결된다. */
export const categories = [
  { id: 'all', label: '전체' },
  { id: 'pro', label: '실무 프로젝트' },
  { id: 'art', label: '3D 아트' },
  { id: 'xr', label: '인터랙티브 · XR' },
  { id: 'web', label: '웹 · 개발' },
] as const

export type CategoryId = Exclude<(typeof categories)[number]['id'], 'all'>

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  summary: string
  category: CategoryId
  year: string
  tags: string[]
  image: string
  /** 로고처럼 잘리면 안 되는 이미지는 'contain'을 쓴다. 기본은 'cover'. */
  fit?: 'cover' | 'contain'
  /** 값이 있으면 카드를 눌렀을 때 이미지를 크게 넘겨보는 갤러리가 열린다. */
  gallery?: string[]
  /** 성과나 담당 범위처럼 눈에 띄게 보여줄 항목. */
  highlights?: string[]
  links: ProjectLink[]
  /** true면 "준비 중" 배지가 붙는다. 내용이 채워지면 지우면 된다. */
  draft?: boolean
}

/** 이전 저장소는 브라우저에서 3D 모델을 직접 돌려보는 뷰어 용도로만 연결한다. */
const MODEL_VIEWER = 'https://yeonsu826.github.io/3d_object_portfolio_v2/'

export const projects: Project[] = [
  // ─────────────── 실무 프로젝트 ───────────────
  {
    title: '생성형 AI 비디오 레터',
    summary:
      '금산·괴산 지역 교육 콘텐츠에 생성형 AI를 접목했습니다. 음성 인식과 합성을 엮어 다국어 영상을 반복 제작할 수 있는 파이프라인을 설계했습니다.',
    category: 'pro',
    year: '2025',
    tags: ['Google STT', 'ElevenLabs', 'Unity', '크로마키 셰이더'],
    image: 'imgs/dev/videoletter/1.jpg',
    gallery: [
      'imgs/dev/videoletter/1.jpg',
      'imgs/dev/videoletter/2.jpg',
      'imgs/dev/videoletter/3.jpg',
      'imgs/dev/videoletter/4.jpg',
      'imgs/dev/videoletter/5.jpg',
      'imgs/dev/videoletter/6.jpg',
      'imgs/dev/videoletter/7.jpg',
      'imgs/dev/videoletter/8.jpg',
    ],
    highlights: [
      'Google STT · ElevenLabs API를 연동한 다국어 영상 제작 파이프라인 설계',
      'NVIDIA Broadcast 하드웨어 가속과 Unity 크로마키 셰이더 결합',
    ],
    links: [],
  },
  {
    title: '태안 AI 교육 체험센터',
    summary:
      '체험센터 전체 공간을 인터랙티브하게 구성했습니다. 대형 빔 프로젝션으로 벽면을 몰입형 화면으로 만들고 여러 기기가 함께 반응하도록 현장까지 구축했습니다.',
    category: 'pro',
    year: '2025',
    tags: ['Vuforia', 'AR Foundation', '프로젝션 매핑', 'Unity'],
    image: 'imgs/dev/taean/1.jpg',
    gallery: [
      'imgs/dev/taean/1.jpg',
      'imgs/dev/taean/2.jpg',
      'imgs/dev/taean/3.jpg',
      'imgs/dev/taean/5.jpg',
      'imgs/dev/taean/6.jpg',
      'imgs/dev/taean/7.jpg',
      'imgs/dev/taean/8.jpg',
      'imgs/dev/taean/9.jpg',
      'imgs/dev/taean/10.jpg',
    ],
    highlights: [
      '대형 빔 프로젝션 기반 몰입형 인터랙티브 월 설계',
      'Vuforia · AR Foundation을 활용한 다중 디바이스 인터랙션 구현',
    ],
    links: [],
  },
  {
    title: '금산 AI 교육 체험센터',
    summary:
      '금산 교육청 체험센터의 지능형 미디어 파이프라인을 세팅했습니다. 촬영부터 송출까지 한 흐름으로 이어지도록 장비와 소프트웨어를 구성했습니다.',
    category: 'pro',
    year: '2025',
    tags: ['미디어 파이프라인', 'Unity', '현장 구축'],
    image: 'imgs/dev/geumsan/1.jpg',
    gallery: [
      'imgs/dev/geumsan/1.jpg',
      'imgs/dev/geumsan/2.jpg',
      'imgs/dev/geumsan/3.jpg',
      'imgs/dev/geumsan/4.jpg',
      'imgs/dev/geumsan/5.jpg',
      'imgs/dev/geumsan/6.jpg',
      'imgs/dev/geumsan/7.jpg',
    ],
    highlights: ['촬영 · 합성 · 송출 장비 구성과 현장 세팅 담당'],
    links: [],
  },
  {
    title: '현장 구축 작업 과정',
    summary:
      '콘텐츠 개발부터 오프라인 공간 세팅까지, 실제로 손으로 만들어 낸 과정을 모았습니다. 화면 안의 작업만이 아니라 현장에서 돌아가게 만드는 일까지 함께 해 왔습니다.',
    category: 'pro',
    year: '2024 – 2025',
    tags: ['현장 구축', '장비 세팅', '프로젝트 운영'],
    image: 'imgs/dev/process/12.jpg',
    gallery: [
      'imgs/dev/process/1.jpg',
      'imgs/dev/process/2.jpg',
      'imgs/dev/process/3.jpg',
      'imgs/dev/process/4.jpg',
      'imgs/dev/process/5.jpg',
      'imgs/dev/process/6.jpg',
      'imgs/dev/process/7.jpg',
      'imgs/dev/process/8.jpg',
      'imgs/dev/process/9.jpg',
      'imgs/dev/process/10.jpg',
      'imgs/dev/process/11.jpg',
      'imgs/dev/process/12.jpg',
    ],
    links: [],
  },

  // ─────────────── 3D 아트 ───────────────
  {
    title: '스타일라이즈드 카페 공간',
    summary:
      '카페 한 공간을 통째로 모델링했습니다. 커피머신, 그라인더, 주전자 같은 소품까지 직접 만들어 하나의 장면으로 완성했습니다.',
    category: 'art',
    year: '2025',
    tags: ['Blender', 'Substance Painter', 'PBR', '공간 모델링'],
    image: 'imgs/3d/cafe/0.jpg',
    gallery: [
      'imgs/3d/cafe/0.jpg',
      'imgs/3d/cafe/1.jpg',
      'imgs/3d/cafe/2.jpg',
      'imgs/3d/cafe/3.jpg',
      'imgs/3d/cafe/4.jpg',
      'imgs/3d/cafe/5.jpg',
      'imgs/3d/cafe/6.jpg',
      'imgs/3d/cafe/7.jpg',
      'imgs/3d/cafe/8.jpg',
      'imgs/3d/cafe/9.jpg',
      'imgs/3d/cafe/10.jpg',
      'imgs/3d/models/coffeemachine.jpg',
      'imgs/3d/models/coffeegrinder.jpg',
      'imgs/3d/models/coffeepot.jpg',
      'imgs/3d/models/kettle.jpg',
      'imgs/3d/models/handdrip.jpg',
      'imgs/3d/models/bag.jpg',
      'imgs/3d/models/disposablecup.jpg',
      'imgs/3d/models/chair_table.jpg',
    ],
    highlights: ['소품 9종을 포함한 공간 전체 모델링', '제작 과정을 별도 문서로 정리'],
    links: [
      {
        label: '제작 과정',
        href: 'https://yeonsu826.github.io/3d_object_portfolio/cafe_project/index.html',
      },
      { label: '3D 모델 뷰어', href: MODEL_VIEWER },
    ],
  },
  {
    title: '안경 프로덕트 렌더링',
    summary:
      '안경 세 종류를 모델링하고 재질과 조명을 다르게 잡아 제품 컷처럼 렌더링했습니다. VR 글래스까지 형태를 확장했습니다.',
    category: 'art',
    year: '2025',
    tags: ['Blender', '제품 렌더링', 'PBR 텍스처링'],
    image: 'imgs/3d/glasses/1.jpg',
    gallery: [
      'imgs/3d/glasses/1.jpg',
      'imgs/3d/glasses/2.jpg',
      'imgs/3d/glasses/3.jpg',
      'imgs/3d/glasses/4.jpg',
      'imgs/3d/glasses/5.jpg',
      'imgs/3d/glasses/6.jpg',
      'imgs/3d/glasses/14.jpg',
      'imgs/3d/glasses/21.jpg',
      'imgs/3d/glasses/24.jpg',
      'imgs/3d/glasses/27.jpg',
      'imgs/3d/models/glasses_1.jpg',
      'imgs/3d/models/glasses_2.jpg',
      'imgs/3d/models/glasses_3.jpg',
    ],
    highlights: ['기본형 · K-style · VR 글래스 3종 제작'],
    links: [
      {
        label: '제작 과정',
        href: 'https://yeonsu826.github.io/3d_object_portfolio/glasses_project/index.html',
      },
      { label: '3D 모델 뷰어', href: MODEL_VIEWER },
    ],
  },
  {
    title: '게이밍룸 디오라마',
    summary:
      '게이밍 룸 컨셉의 공간을 만들었습니다. 낮과 밤의 무드가 다르게 보이도록 조명을 구성하고 소품을 배치했습니다.',
    category: 'art',
    year: '2025',
    tags: ['Blender', '라이팅', '디오라마', '라이트 베이킹'],
    image: 'imgs/3d/gamingroom/1.jpg',
    gallery: [
      'imgs/3d/gamingroom/1.jpg',
      'imgs/3d/gamingroom/2.jpg',
      'imgs/3d/gamingroom/3.jpg',
      'imgs/3d/gamingroom/4.jpg',
      'imgs/3d/gamingroom/5.jpg',
      'imgs/3d/gamingroom/6.jpg',
      'imgs/3d/gamingroom/7.jpg',
      'imgs/3d/gamingroom/8.jpg',
      'imgs/3d/gamingroom/9.jpg',
      'imgs/3d/gamingroom/10.jpg',
    ],
    links: [{ label: '3D 모델 뷰어', href: MODEL_VIEWER }],
  },
  {
    title: '무대 디자인',
    summary:
      '공연 무대를 3D로 설계했습니다. 구조물과 조명 배치를 미리 시각화해 실제 연출을 검토할 수 있게 만들었습니다.',
    category: 'art',
    year: '2025',
    tags: ['Blender', '무대 연출', '라이팅 설계'],
    image: 'imgs/3d/stage/2.jpg',
    gallery: [
      'imgs/3d/stage/1.jpg',
      'imgs/3d/stage/2.jpg',
      'imgs/3d/stage/3.jpg',
      'imgs/3d/stage/4.jpg',
      'imgs/3d/stage/5.jpg',
      'imgs/3d/stage/6.jpg',
      'imgs/3d/stage/7.jpg',
      'imgs/3d/stage/8.jpg',
      'imgs/3d/stage/9.jpg',
      'imgs/3d/stage/10.jpg',
    ],
    links: [{ label: '3D 모델 뷰어', href: MODEL_VIEWER }],
  },

  // ─────────────── 인터랙티브 · XR ───────────────
  {
    title: 'AI 게임 콘텐츠',
    summary:
      'AI를 활용한 교육용 게임을 Unity로 만들었습니다. 플레이어의 입력에 AI가 반응하며 학습 흐름을 이어 가도록 설계했습니다.',
    category: 'xr',
    year: '2025',
    tags: ['Unity', 'C#', '생성형 AI', '게임 개발'],
    image: 'imgs/dev/aigame/1.jpg',
    gallery: [
      'imgs/dev/aigame/1.jpg',
      'imgs/dev/aigame/2.jpg',
      'imgs/dev/aigame/3.jpg',
      'imgs/dev/aigame/4.jpg',
      'imgs/dev/aigame/5.jpg',
      'imgs/dev/aigame/6.jpg',
      'imgs/dev/aigame/7.jpg',
      'imgs/dev/aigame/8.jpg',
    ],
    links: [],
  },
  {
    title: '모션 인식 인터랙티브 레이싱',
    summary:
      '몸의 움직임으로 조작하는 레이싱 게임입니다. 카메라로 인식한 모션을 조작 입력으로 바꿔 체험형 전시에 맞게 만들었습니다.',
    category: 'xr',
    year: '2024',
    tags: ['Unity', 'C#', '모션 인식', '체험형 전시'],
    image: 'imgs/dev/racing/1.jpg',
    gallery: [
      'imgs/dev/racing/1.jpg',
      'imgs/dev/racing/2.jpg',
      'imgs/dev/racing/3.jpg',
      'imgs/dev/racing/4.jpg',
      'imgs/dev/racing/5.jpg',
      'imgs/dev/racing/6.jpg',
      'imgs/dev/racing/7.jpg',
      'imgs/dev/racing/8.jpg',
    ],
    links: [],
  },
  {
    title: 'AR 교육 콘텐츠',
    summary:
      '교재와 마커를 비추면 3D 콘텐츠가 나타나는 증강현실 앱입니다. 여러 기기에서 같은 콘텐츠가 안정적으로 뜨도록 맞췄습니다.',
    category: 'xr',
    year: '2024',
    tags: ['Unity', 'AR Foundation', 'Vuforia'],
    image: 'imgs/dev/ar/3.jpg',
    gallery: [
      'imgs/dev/ar/1.jpg',
      'imgs/dev/ar/2.jpg',
      'imgs/dev/ar/3.jpg',
      'imgs/dev/ar/4.jpg',
      'imgs/dev/ar/5.jpg',
      'imgs/dev/ar/6.jpg',
      'imgs/dev/ar/7.jpg',
      'imgs/dev/ar/8.jpg',
      'imgs/dev/ar/9.jpg',
    ],
    links: [],
  },
  {
    title: '웹 AR 체험',
    summary:
      'Zappar로 만든 웹 AR입니다. 앱 설치 없이 모바일 브라우저에서 바로 증강현실을 볼 수 있습니다.',
    category: 'xr',
    year: '2023',
    tags: ['Zappar', 'WebAR'],
    image: 'imgs/ar_image.PNG',
    links: [
      { label: '체험하기', href: 'https://g9e77.zappar.io/3077720910295997619/0.0.1/' },
      {
        label: '시연 영상',
        href: 'https://drive.google.com/file/d/1xJNYGCAKSNGhpw91HgGR-wIePO9AA2AB/view?usp=sharing',
      },
      {
        label: '인스타그램 릴',
        href: 'https://www.instagram.com/reel/C-NS8YMyVdy/',
      },
    ],
  },
  {
    title: 'Unity 핸드 트래킹',
    summary:
      'MediaPipe를 유니티에 연결해 손 동작을 인식했습니다. 컨트롤러 없이 손만으로 조작하는 실험입니다.',
    category: 'xr',
    year: '2023',
    tags: ['Unity', 'MediaPipe', '핸드 트래킹'],
    image: 'imgs/mediaPipe_handtracking_image.PNG',
    links: [
      {
        label: '시연 영상',
        href: 'https://drive.google.com/file/d/1JwfYrS7Kwt5dbELj6hTJEVy0OiDwmWq9/view?usp=sharing',
      },
    ],
  },

  // ─────────────── 웹 · 개발 ───────────────
  {
    title: 'Unity WebGL 게임',
    summary: '유니티로 만든 게임을 웹에 올려 설치 없이 브라우저에서 바로 즐길 수 있게 했습니다.',
    category: 'web',
    year: '2023',
    tags: ['Unity', 'WebGL'],
    image: 'imgs/simple_game.png',
    links: [{ label: '바로 실행', href: asset('aa/index.html') }],
  },
  {
    title: '길이 측정 웹',
    summary: '화면 위에서 두 점을 찍어 거리를 재는 웹 도구입니다. 지금도 바로 열어볼 수 있습니다.',
    category: 'web',
    year: '2023',
    tags: ['Canvas', 'JavaScript'],
    image: 'imgs/measure_distance.png',
    links: [{ label: '바로 실행', href: asset('measure_distance/measure_distance.html') }],
  },
  {
    title: '초음파 지팡이',
    summary:
      '시각장애인을 위해 초음파 센서로 장애물을 감지하는 지팡이를 만들었습니다. 하드웨어 제작까지 마친 프로젝트입니다.',
    category: 'web',
    year: '2022',
    tags: ['Arduino', '초음파 센서', '하드웨어'],
    image: 'imgs/image.png',
    links: [{ label: '시연 영상', href: 'https://youtu.be/r-xpDXHCEDw?feature=shared' }],
  },
]

/** Video Log 섹션에 띄우는 Vimeo 영상. orientation에 따라 비율이 달라진다. */
export type VideoItem = {
  id: string
  title: string
  orientation: 'portrait' | 'landscape'
  tools: string[]
}

export const videos: VideoItem[] = [
  {
    id: '1211900105',
    title: '카페 공간 시네마틱',
    orientation: 'portrait',
    tools: ['Blender', 'Unreal Engine', 'Substance Painter'],
  },
  {
    id: '1211900103',
    title: '카페 소품 클로즈업',
    orientation: 'portrait',
    tools: ['Blender', 'Unreal Engine', 'Substance Painter'],
  },
  {
    id: '1211900047',
    title: '게이밍룸 워크스루',
    orientation: 'portrait',
    tools: ['Blender', 'Unreal Engine', 'Substance Painter'],
  },
  {
    id: '1211900004',
    title: '안경 프로덕트 컷',
    orientation: 'portrait',
    tools: ['Blender', 'Unreal Engine', 'Substance Painter'],
  },
  {
    id: '1211913186',
    title: '무대 라이팅 연출',
    orientation: 'portrait',
    tools: ['Blender', 'Unreal Engine', 'Substance Painter'],
  },
  {
    id: '1211907156',
    title: '파티클 시스템 테스트',
    orientation: 'landscape',
    tools: ['Unity', 'C#', 'Particle System'],
  },
  {
    id: '1211907154',
    title: '셰이더 연출 테스트',
    orientation: 'landscape',
    tools: ['Unity', 'C#', 'Shader'],
  },
  {
    id: '1211907153',
    title: '이펙트 연출 1',
    orientation: 'landscape',
    tools: ['Unity', 'C#', 'Particle Effect'],
  },
  {
    id: '1211907155',
    title: '이펙트 연출 2',
    orientation: 'landscape',
    tools: ['Unity', 'C#', 'Particle Effect'],
  },
]

export type SkillGroup = {
  title: string
  description: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: '3D Art & Graphics',
    description: '형태를 만들고 재질과 빛으로 분위기를 완성합니다.',
    items: ['Blender', 'Substance Painter', 'PBR 텍스처링', '모델링 · 리깅'],
  },
  {
    title: 'Game Engines',
    description: '만든 것을 엔진 위에서 실제로 돌아가게 합니다.',
    items: ['Unity (C#)', 'Unreal Engine 5', 'Blueprints', 'Sequencer'],
  },
  {
    title: 'Web & Interactive',
    description: '브라우저에서 바로 만져볼 수 있는 3D를 만듭니다.',
    items: ['React', 'React Three Fiber', 'Three.js', 'TypeScript'],
  },
  {
    title: 'AI & Pipeline',
    description: 'AI를 붙여 제작 과정을 자동화합니다.',
    items: ['생성형 AI 활용', 'ElevenLabs', 'Google STT', 'AR Foundation · Vuforia'],
  },
]

/** 테크니컬 아트 역량을 구체적으로 보여주는 항목. */
export type Approach = {
  title: string
  description: string
}

export const approaches: Approach[] = [
  {
    title: 'Light Baking',
    description:
      '실시간 라이팅 연산 부하를 줄이기 위해 Blender에서 빛과 그림자를 텍스처로 미리 구워 넣습니다.',
  },
  {
    title: 'Channel Packing',
    description:
      'Roughness · Metallic · AO 맵을 RGB 각 채널에 나눠 담아 텍스처 장수와 용량을 줄입니다.',
  },
  {
    title: 'Draw Call 최소화',
    description:
      '다수의 소품 메시와 텍스처를 병합해 렌더링 병목이 생기지 않도록 관리합니다.',
  },
  {
    title: 'Polygon 예산 관리',
    description:
      '실루엣이 살아 있는 선에서 폴리곤 수를 조절해, 보이는 품질은 지키면서 가볍게 유지합니다.',
  },
]

/** 카드를 누르면 이미지를 크게 볼 수 있다. 별도 링크는 걸지 않는다. */
export type Credential = {
  title: string
  issuer: string
  image: string
}

export const credentials: Credential[] = [
  {
    title: '정보처리산업기사',
    issuer: '한국산업인력공단',
    image: 'imgs/engineer.png',
  },
  {
    title: '네트워크 관리사',
    issuer: '한국정보통신자격협회',
    image: 'imgs/network.png',
  },
  {
    title: '가상현실 플랫폼 제작',
    issuer: 'MBC 미디어 캠퍼스',
    image: 'imgs/vr_content_certificate.jpg',
  },
  {
    title: '사물인터넷 · 메타버스 연계 과정',
    issuer: 'SeSAC 청년취업사관학교',
    image: 'imgs/sessac.png',
  },
  {
    title: 'AI Challenge for Biodiversity',
    issuer: 'Microsoft',
    image: 'imgs/MicrosoftAI.png',
  },
  {
    title: '메타 마케팅 교육',
    issuer: 'Meta',
    image: 'imgs/facebook_marketing.jpeg',
  },
  {
    title: '컴퓨터공학 학사',
    issuer: '대학교 졸업',
    image: 'imgs/degree_certificate.png',
  },
]
