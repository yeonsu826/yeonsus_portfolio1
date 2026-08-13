import { asset, profile } from '../data/profile'
import './About.css'

const FACTS = [
  { value: '4', label: '3D 아트 프로젝트' },
  { value: '9', label: '실무 · 인터랙티브' },
  { value: '6', label: '자격 · 수료' },
]

/** 이전 포트폴리오에서 쓰던 "Pick me Up" 한 줄 소개. */
const PITCH = ['3D 좋아합니다.', '엔진 잘 다룹니다.', '모델링 잘합니다.', '열심히 하겠습니다.']

const STORY = [
  {
    period: 'Start',
    title: 'Unity 개발자로 시작하다',
    body: '컴퓨터공학을 전공하고 Unity 개발자로 커리어를 시작했습니다. AR·VR 콘텐츠와 인터랙티브 전시를 만들며 엔진이 실제로 어떻게 돌아가는지를 몸으로 익혔습니다.',
  },
  {
    period: 'Turn',
    title: '코드 너머의 공간을 직접 만들다',
    body: '구현만으로는 채워지지 않는 부분이 있었습니다. 눈에 보이는 세계를 스스로 설계하고 싶어 모델링 훈련과정 수료하였고, Blender와 Substance Painter로 공간과 오브젝트를 만들기 시작했습니다.',
  },
  {
    period: 'Now',
    title: '예술성과 퍼포먼스를 함께 잡다',
    body: '개발을 알기에 아트가 엔진에서 어떤 부담이 되는지 이해합니다. 라이트 베이킹과 채널 패킹으로 예쁘면서도 가벼운 결과물을 만드는 테크니컬 아티스트를 지향합니다.',
  },
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="section-title">
            현실처럼 느껴지는 <em className="accent-em">공간</em>을 만듭니다
          </h2>
          <p className="section-desc">{profile.intro}</p>
        </div>

        <div className="about-grid">
          <div className="about-visual reveal">
            <div className="about-photo">
              <img src={asset('imgs/working.jpg')} alt="작업 중인 모습" loading="lazy" />
            </div>
            <ul className="about-facts">
              {FACTS.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-right">
            <ol className="about-story">
              {STORY.map((step, index) => (
                <li
                  key={step.title}
                  className="about-story-item reveal"
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <span className="about-story-period">{step.period}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>

            <div className="about-pitch reveal">
              <h3>
                <em>Pick me</em> Up
              </h3>
              <ul>
                {PITCH.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
