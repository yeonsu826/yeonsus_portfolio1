import { useState } from 'react'
import { asset, credentials } from '../data/profile'
import Lightbox from './Lightbox'
import './Credentials.css'

export default function Credentials() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="credentials" className="section credentials">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="section-title">자격 · 수료</h2>
          <p className="section-desc">배운 것을 증명할 수 있는 기록들입니다.</p>
        </div>

        <div className="credentials-grid">
          {credentials.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className="credential-card reveal"
              style={{ transitionDelay: `${index * 70}ms` }}
              onClick={() => setOpenIndex(index)}
            >
              <div className="credential-thumb">
                <img src={asset(item.image)} alt={item.title} loading="lazy" />
              </div>
              <div className="credential-info">
                <h3>{item.title}</h3>
                <p>{item.issuer}</p>
              </div>
              <span className="credential-arrow" aria-hidden="true">
                ⤢
              </span>
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          title={credentials[openIndex].title}
          images={credentials.map((item) => item.image)}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  )
}
