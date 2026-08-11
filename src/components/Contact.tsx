import { profile } from '../data/profile'
import './Contact.css'

const CHANNELS = [
  { label: 'Email', value: profile.links.email, href: `mailto:${profile.links.email}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/yeonsu0826', href: profile.links.linkedin },
  { label: 'GitHub', value: 'github.com/yeonsu826', href: profile.links.github },
  { label: 'Instagram', value: '@yeon_ddooo', href: profile.links.instagram },
]

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-card reveal">
          <span className="section-label">Contact</span>
          <h2 className="contact-title">
            함께 만들 <span className="gradient-text">공간</span>이 있나요?
          </h2>
          <p className="contact-desc">
            3D 아트, 실감형 콘텐츠, 인터랙티브 웹 어느 쪽이든 좋습니다. 편하게 연락 주세요.
          </p>

          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${profile.links.email}`}>
              메일 보내기
            </a>
            <a
              className="btn btn-ghost"
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
            >
              이력서 보기
            </a>
          </div>

          <ul className="contact-channels">
            {CHANNELS.map((channel) => (
              <li key={channel.label}>
                <a href={channel.href} target="_blank" rel="noreferrer">
                  <span className="contact-channel-label">{channel.label}</span>
                  <span className="contact-channel-value">{channel.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
