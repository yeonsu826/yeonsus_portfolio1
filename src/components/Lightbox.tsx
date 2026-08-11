import { useCallback, useEffect, useState } from 'react'
import { asset } from '../data/profile'
import './Lightbox.css'

type LightboxProps = {
  title: string
  images: string[]
  startIndex?: number
  onClose: () => void
}

export default function Lightbox({ title, images, startIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex)

  const go = useCallback(
    (step: number) => {
      setIndex((current) => (current + step + images.length) % images.length)
    },
    [images.length],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [go, onClose])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} 이미지 갤러리`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="lightbox-bar">
        <div className="lightbox-title">
          <strong>{title}</strong>
          <span>
            {index + 1} / {images.length}
          </span>
        </div>
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="닫기">
          ✕
        </button>
      </div>

      <div className="lightbox-stage">
        <button
          type="button"
          className="lightbox-nav is-prev"
          onClick={() => go(-1)}
          aria-label="이전 이미지"
        >
          ‹
        </button>
        <img src={asset(images[index])} alt={`${title} ${index + 1}번째 이미지`} />
        <button
          type="button"
          className="lightbox-nav is-next"
          onClick={() => go(1)}
          aria-label="다음 이미지"
        >
          ›
        </button>
      </div>

      <div className="lightbox-thumbs">
        {images.map((image, i) => (
          <button
            key={image}
            type="button"
            className={i === index ? 'is-active' : ''}
            onClick={() => setIndex(i)}
            aria-label={`${i + 1}번째 이미지 보기`}
          >
            <img src={asset(image)} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}
