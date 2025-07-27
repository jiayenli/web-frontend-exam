import { useState, useRef } from 'react'
import Modal from '@mui/material/Modal'
import styles from './JobModal.module.scss'
import DOMPurify from 'dompurify'
import { Skeleton } from '@mui/material'
import Carousel from '../../Common/Carousel/Carousel'

const HtmlContent = ({ html }) => {
  const cleanHtml = DOMPurify.sanitize(splitLiWithBr(html))
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
}

const splitLiWithBr = htmlString => {
  return htmlString.replace(/<li>([\s\S]*?)<\/li>/g, (_, content) => {
    const segments = content
      .split(/<br\s*\/?>/i)
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => `<li>${s}</li>`)
      .join('\n')
    return segments
  })
}

export default function JobModal({ open, onClose, job, isLoading }) {
  const [imgReady, setImgReady] = useState(false)
  const isImageOnLoad = useRef(false)

  // 圖片載入完成後
  const handleImageLoad = () => {
    if (isImageOnLoad.current) return
    isImageOnLoad.current = true
    setImgReady(true)
  }

  return (
    <Modal
      open={open}
      onClick={onClose}
      style={{
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={styles.jobContent} onClick={e => e.stopPropagation()}>
        <header className={styles.jobLabel}> 詳細資料</header>
        <div className={styles.jobInfo}>
          {isLoading ? (
            <Skeleton variant="rectangular" width="40%" height={30} style={{ flexShrink: 0 }} />
          ) : (
            <p className={styles.jobTitle}>
              {job.companyName}
              <span>{job.jobTitle}</span>
            </p>
          )}
          <div className={styles.jobImages}>
            <div style={{ display: !imgReady ? 'flex' : 'none', gap: `8px` }}>
              <Skeleton
                variant="rectangular"
                width="250px"
                height="150px"
                style={{ flexShrink: 0, marginTop: '16px' }}
              />
              <Skeleton
                variant="rectangular"
                width="250px"
                height="150px"
                style={{ flexShrink: 0, marginTop: '16px' }}
              />
            </div>
            {job.companyPhoto && job.companyPhoto.length > 0 && (
              <Carousel
                onReady={handleImageLoad}
                images={job.companyPhoto}
                imgReady={imgReady}
              ></Carousel>
            )}
          </div>
          <div className={styles.jobDetails}>
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" width="20%" height={24} style={{ flexShrink: 0 }} />
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width="80%"
                    height={18}
                    style={{ flexShrink: 0, marginTop: '12px' }}
                  />
                ))}
              </>
            ) : (
              <>
                <div className={styles.jobDetailsTitle}>工作內容</div>
                <HtmlContent html={job.description} />
              </>
            )}
          </div>
        </div>
        <footer className={styles.jobFooter}>
          <button onClick={onClose}>關閉</button>
        </footer>
      </div>
    </Modal>
  )
}
