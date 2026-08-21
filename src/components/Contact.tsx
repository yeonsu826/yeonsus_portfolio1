import { profile } from '../data/profile'
import './Contact.css'

const CHANNELS = [
  { label: 'Email', value: profile.links.email, href: `mailto:${profile.links.email}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/yeonsu0826', href: profile.links.linkedin },
  { label: 'GitHub', value: 'github.com/yeonsu826', href: profile.links.github },
  { label: 'Instagram', value: '@yeon_ddooo', href: profile.links.instagram },
  { label: 'Blog', value: 'blog.naver.com/infoinno1010', href: profile.links.blog },
  { label: 'Resume', value: '이력서 보기', href: profile.links.resume },
]

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-card reveal">
          <h2 className="contact-title">
            함께 만들 <em className="accent-em">공간</em>이 있나요?
          </h2>
          <p className="contact-desc">
            3D 디자인, 실감형 콘텐츠, 인터랙티브 웹 어느 쪽이든 좋습니다. 편하게 연락 주세요.
          </p>

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
