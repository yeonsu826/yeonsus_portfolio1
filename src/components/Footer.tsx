import { profile } from '../data/profile'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.nameEn} — {profile.location}
        </p>
        <p className="footer-built">React · Three.js · Vite로 만들었습니다</p>
      </div>
    </footer>
  )
}
