import { lazy, Suspense } from 'react'
import { profile } from '../data/profile'
import type { Theme } from '../hooks/useTheme'
import './Hero.css'

// 3D 씬은 무겁기 때문에 첫 화면 렌더링을 막지 않도록 분리해서 불러온다.
const HeroCanvas = lazy(() => import('./HeroCanvas'))

const KEYWORDS = ['3D 모델링', 'Unity · Unreal', 'Technical Art', '생성형 AI']

export default function Hero({ theme }: { theme: Theme }) {
  return (
    <section id="home" className="hero">
      <div className="hero-canvas-wrap" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroCanvas theme={theme} />
        </Suspense>
      </div>
      <div className="hero-veil" aria-hidden="true" />

      <div className="container hero-inner">
        <p className="hero-eyebrow">
          <span className="hero-dot" aria-hidden="true" />
          {profile.role}
        </p>

        <h1 className="hero-title">
          <span className="gradient-text">코드</span>를 아는
          <br />
          <span className="gradient-text">아티스트</span>입니다.
        </h1>

        <p className="hero-intro">{profile.intro}</p>

        <ul className="hero-keywords">
          {KEYWORDS.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#works">
            작업 보러 가기
          </a>
          <a
            className="btn btn-ghost"
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
          >
            이력서
          </a>
        </div>
      </div>

      <a className="hero-scroll" href="#about" aria-label="아래로 스크롤">
        <span />
      </a>
    </section>
  )
}
