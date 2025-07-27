import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import styles from './Pagination.module.scss'

export default function Pagination({ totalPage, currentPage, onPageChange, maxVisible = 6 }) {
  if (totalPage <= 0) return null

  let pages = []

  const beforeCount = Math.floor(maxVisible / 2)
  const afterCount = maxVisible - beforeCount - 1
  let startPage = Math.max(1, currentPage - beforeCount)
  let endPage = Math.min(totalPage, currentPage + afterCount)

  if (totalPage <= maxVisible) {
    startPage = 1
    endPage = totalPage
  } else if (currentPage <= beforeCount) {
    // 頁碼靠近開頭，往後補齊
    startPage = 1
    endPage = maxVisible
  } else if (currentPage + afterCount >= totalPage) {
    // 頁碼靠近尾端，往前補齊
    endPage = totalPage
    startPage = totalPage - maxVisible + 1
  }

  pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage === 1 ? 1 : currentPage - 1)}
      >
        <KeyboardArrowLeftOutlinedIcon />
      </button>
      <ul>
        {pages.map(page => {
          return (
            <li key={page} className={page === currentPage ? styles.active : ''}>
              <button type="button" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          )
        })}
      </ul>
      <button
        type="button"
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage === totalPage ? totalPage : currentPage + 1)}
      >
        <KeyboardArrowRightOutlinedIcon />
      </button>
    </div>
  )
}
