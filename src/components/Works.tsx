import { useMemo, useState } from 'react'
import { asset, categories, projects, type Project } from '../data/profile'
import Lightbox from './Lightbox'
import './Works.css'

const VIEW_TABS = [{ id: 'all', label: '전체' }, ...categories] as const

/** 연도 문자열에서 정렬용 최신 연도를 뽑는다. 예: '2024 – 2025' → 2025 */
function yearKey(year: string) {
  const matches = year.match(/\d{4}/g)
  if (!matches?.length) return 0
  return Math.max(...matches.map(Number))
}

function WorkCard({
  project,
  index,
  onOpenGallery,
}: {
  project: Project
  index: number
  onOpenGallery: (project: Project) => void
}) {
  const hasGallery = Boolean(project.gallery?.length)

  return (
    <article className="work-card" style={{ animationDelay: `${index * 55}ms` }}>
      <div className={`work-thumb ${project.fit === 'contain' ? 'is-contain' : ''}`}>
        <img src={asset(project.image)} alt={project.title} loading="lazy" />
        {project.draft && <span className="work-badge">준비 중</span>}
        {hasGallery && (
          <button type="button" className="work-gallery-btn" onClick={() => onOpenGallery(project)}>
            <span>이미지 {project.gallery?.length}장 보기</span>
          </button>
        )}
      </div>

      <div className="work-body">
        <div className="work-meta">
          <span>{project.year}</span>
          <span className="work-dot" aria-hidden="true" />
          <span>{categories.find((c) => c.id === project.category)?.label}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.summary}</p>

        {project.highlights && (
          <ul className="work-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        <ul className="work-tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {project.links.length > 0 && (
          <div className="work-links">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="work-link"
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Works() {
  const [active, setActive] = useState<string>('all')
  const [gallery, setGallery] = useState<Project | null>(null)
  const isTimeline = active === 'all'

  const visible = useMemo(() => {
    if (active === 'all') {
      return [...projects].sort((a, b) => yearKey(a.year) - yearKey(b.year))
    }
    return projects.filter((p) => p.category === active)
  }, [active])

  const countOf = (id: string) => {
    if (id === 'all') return projects.length
    return projects.filter((p) => p.category === id).length
  }

  return (
    <section id="works" className="section works">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-label">Works</span>
          <h2 className="section-title">지금까지 만든 것들</h2>
          <p className="section-desc">
            실무·3D·인터랙티브·웹 작업을 모았습니다. 전체는 시간순으로, 카테고리로도 나눠 볼 수 있습니다.
          </p>
        </div>

        <div className="works-filter reveal" role="tablist" aria-label="프로젝트 보기">
          {VIEW_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              className={active === tab.id ? 'is-active' : ''}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
              <span>{countOf(tab.id)}</span>
            </button>
          ))}
        </div>

        {isTimeline ? (
          <ol className="works-timeline">
            {visible.map((project, index) => {
              const side = index % 2 === 0 ? 'left' : 'right'
              return (
                <li
                  key={`timeline-${project.title}`}
                  className={`works-timeline-item is-${side}`}
                >
                  <div className="works-timeline-marker" aria-hidden="true">
                    <span className="works-timeline-year">{yearKey(project.year)}</span>
                    <span className="works-timeline-dot" />
                  </div>
                  <div className="works-timeline-card">
                    <WorkCard
                      project={project}
                      index={index}
                      onOpenGallery={setGallery}
                    />
                  </div>
                </li>
              )
            })}
          </ol>
        ) : (
          <div className="works-grid">
            {visible.map((project, index) => (
              <WorkCard
                key={`${active}-${project.title}`}
                project={project}
                index={index}
                onOpenGallery={setGallery}
              />
            ))}
          </div>
        )}
      </div>

      {gallery?.gallery && (
        <Lightbox
          title={gallery.title}
          images={gallery.gallery}
          onClose={() => setGallery(null)}
        />
      )}
    </section>
  )
}
