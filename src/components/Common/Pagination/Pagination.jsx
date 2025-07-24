import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import styles from './Pagination.module.scss'

export default function Pagination() {
  return (
    <div className={styles.pagination}>
      <button>
        <KeyboardArrowLeftOutlinedIcon />
      </button>
      <ul>
        <li className={styles.active}>
          <button>1</button>
        </li>
        <li>
          <button>2</button>
        </li>
        <li>
          <button>3</button>
        </li>
      </ul>
      <button>
        <KeyboardArrowRightOutlinedIcon />
      </button>
    </div>
  )
}
