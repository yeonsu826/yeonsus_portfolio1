import { skillGroups } from '../data/profile'
import './Skills.css'

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-label">Skills</span>
          <h2 className="section-title">다루는 도구들</h2>
          <p className="section-desc">
            아트에서 엔진, 웹까지 이어지는 흐름을 혼자 끝까지 다룰 수 있도록 도구를 갖춰
            왔습니다.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article
              key={group.title}
              className="skill-card reveal"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
