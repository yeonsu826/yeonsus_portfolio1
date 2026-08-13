import { asset, skillGroups } from '../data/profile'
import './Skills.css'

const TOOL_LOGOS = [
  { name: 'Blender', src: 'imgs/icons/blender.svg' },
  { name: 'Substance Painter', src: 'imgs/icons/substance.svg' },
  { name: 'Unity', src: 'imgs/icons/unity.svg' },
  { name: 'Unreal Engine', src: 'imgs/icons/unreal.svg' },
]

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="section-title">다루는 도구들</h2>
          <p className="section-desc">
            아트에서 엔진까지, 혼자 끝까지 다룰 수 있도록 갖춘 도구들입니다.
          </p>
          <ul className="skills-logos" aria-label="주요 도구">
            {TOOL_LOGOS.map((tool) => (
              <li key={tool.name}>
                <img src={asset(tool.src)} alt={tool.name} />
                <span>{tool.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="skills-list">
          {skillGroups.map((group, index) => (
            <article
              key={group.title}
              className="skill-row reveal"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="skill-body">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
