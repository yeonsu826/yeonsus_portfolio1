import { useEffect, useRef, useState } from 'react'
import { videos, type VideoItem } from '../data/profile'
import './VideoLog.css'

/**
 * 영상 9개를 한 번에 재생하면 브라우저가 버거워서,
 * 화면에 들어온 카드만 플레이어를 붙이고 벗어나면 떼어 낸다.
 */
function VideoCard({ video }: { video: VideoItem }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = cardRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '200px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={cardRef} className={`video-card is-${video.orientation}`}>
      <a
        className="video-frame"
        href={`https://vimeo.com/${video.id}`}
        target="_blank"
        rel="noreferrer"
      >
        {visible && (
          <iframe
            src={`https://player.vimeo.com/video/${video.id}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
        <span className="video-overlay">
          <span className="video-play">Vimeo에서 보기</span>
        </span>
      </a>

      <div className="video-tools">
        {video.tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
    </div>
  )
}

export default function VideoLog() {
  const portrait = videos.filter((video) => video.orientation === 'portrait')
  const landscape = videos.filter((video) => video.orientation === 'landscape')

  return (
    <section id="videolog" className="section videolog">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="section-title">
            움직이는 <em className="accent-em">장면</em>으로 보기
          </h2>
          <p className="section-desc">
            카메라 워크와 이펙트를 영상으로 정리했습니다. 누르면 Vimeo에서 볼 수 있습니다.
          </p>
        </div>

        <div className="video-row reveal">
          {portrait.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        <div className="video-row reveal">
          {landscape.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}
