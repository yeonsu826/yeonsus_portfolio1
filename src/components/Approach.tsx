import { approaches } from '../data/profile'
import './Approach.css'

export default function Approach() {
  return (
    <section id="approach" className="section approach">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="section-title">
            예쁘게, 그리고 <em className="accent-em">가볍게</em>
          </h2>
          <p className="section-desc">
            아트가 엔진에 어떤 부담을 주는지 알기 때문에, 만들면서부터 성능을 함께 계산합니다.
          </p>
        </div>

        <div className="approach-grid">
          {approaches.map((item, index) => (
            <article
              key={item.title}
              className="approach-card reveal"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
