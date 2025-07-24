import styles from './JobCard.module.scss'
import SalaryIcon from '../../Common/Icons/SalaryIcon'
import BookIcon from '../../Common/Icons/BookIcon'
import PersonIcon from '../../Common/Icons/PersonIcon'

export default function JobCard({ job }) {
  return (
    <div className={styles.JobCard}>
      <h3>{job.company}</h3>
      <div className={styles.jobInfo}>
        <p>
          <PersonIcon />
          {job.title}
        </p>
        <p>
          <BookIcon />
          {job.education}
        </p>
        <p>
          <SalaryIcon />
          {job.salary}
        </p>
      </div>
      <p className={styles.jobDetail}>{job.description}</p>
      <button className={styles.applyButton}>查看細節</button>
    </div>
  )
}
