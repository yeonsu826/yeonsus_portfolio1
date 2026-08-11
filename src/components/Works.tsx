import { useMemo, useState } from 'react'
import { asset, categories, projects, type Project } from '../data/profile'
import Lightbox from './Lightbox'
import './Works.css'

export default function Works() {
  const [active, setActive] = useState<string>('all')
  const [gallery, setGallery] = useState<Project | null>(null)

  const visible = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  const countOf = (id: string) =>
    id === 'all' ? projects.length : projects.filter((p) => p.category === id).length

  return (
    <section id="works" className="section works">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-label">Works</span>
          <h2 className="section-title">지금까지 만든 것들</h2>
          <p className="section-desc">
            실무에서 맡은 프로젝트부터 개인 3D 작업, 웹과 인터랙티브 실험까지 모았습니다.
            카테고리를 눌러 나눠 볼 수 있습니다.
          </p>
        </div>

        <div className="works-filter reveal" role="tablist" aria-label="프로젝트 카테고리">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={active === category.id}
              className={active === category.id ? 'is-active' : ''}
              onClick={() => setActive(category.id)}
            >
              {category.label}
              <span>{countOf(category.id)}</span>
            </button>
          ))}
        </div>

        <div className="works-grid">
          {visible.map((project, index) => {
            const hasGallery = Boolean(project.gallery?.length)

            return (
              <article
                key={`${active}-${project.title}`}
                className="work-card"
                style={{ animationDelay: `${index * 55}ms` }}
              >
                <div className={`work-thumb ${project.fit === 'contain' ? 'is-contain' : ''}`}>
                  <img src={asset(project.image)} alt={project.title} loading="lazy" />
                  {project.draft && <span className="work-badge">준비 중</span>}
                  {hasGallery && (
                    <button
                      type="button"
                      className="work-gallery-btn"
                      onClick={() => setGallery(project)}
                    >
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
          })}
        </div>
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
