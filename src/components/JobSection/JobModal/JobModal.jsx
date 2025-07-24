import Modal from '@mui/material/Modal'
import styles from './JobModal.module.scss'
import DOMPurify from 'dompurify'

function HtmlContent({ html }) {
  const cleanHtml = DOMPurify.sanitize(splitLiWithBr(html))
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
}

function splitLiWithBr(htmlString) {
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

export default function JobModal({ open, onClose, job }) {
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
      <div className={styles.jobContent}>
        <header className={styles.jobLabel}> 詳細資料</header>
        <div className={styles.jobInfo}>
          <p className={styles.jobTitle}>
            {job.company}
            <span>{job.title}</span>
          </p>
          <div className={styles.jobImages}>
            <div className={styles.slider}>
              <img src={job.image} alt={job.title} />
              <img src={job.image} alt={job.title} />
              <img src={job.image} alt={job.title} />
            </div>
          </div>
          <div className={styles.jobDetails}>
            <div className={styles.jobDetailsTitle}>工作內容</div>
            <HtmlContent html={job.description} />
          </div>
        </div>
        <footer className={styles.jobFooter}>
          <button onClick={onClose}>關閉</button>
        </footer>
      </div>
    </Modal>
  )
}
