import { Skeleton } from '@mui/material'
import BookIcon from '../../Common/Icons/BookIcon'
import PersonIcon from '../../Common/Icons/PersonIcon'
import SalaryIcon from '../../Common/Icons/SalaryIcon'
import styles from './JobCard.module.scss'

export default function JobCard({ job, onModalOpen, isSkeleton = false }) {
  return (
    <div className={styles.JobCard}>
      {isSkeleton ? (
        <Skeleton variant="rectangular" width="100%" height={28} className={styles.jobImage} />
      ) : (
        <h3>{job.companyName}</h3>
      )}
      <div className={styles.jobInfo}>
        {isSkeleton ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="80%"
                height={12}
                style={{ flexShrink: 0, marginTop: '4px' }}
              />
            ))}
          </>
        ) : (
          <>
            <p>
              <PersonIcon />
              {job.jobTitle}
            </p>
            <p>
              <BookIcon />
              {job.education}
            </p>
            <p>
              <SalaryIcon />
              {job.salary}
            </p>
          </>
        )}
      </div>
      {isSkeleton ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={20}
          style={{ flexShrink: 0, marginTop: '16px' }}
        />
      ) : (
        <>
          <p className={styles.jobDetail}>{job.preview}</p>
          <button
            type="button"
            className={styles.applyButton}
            onClick={() => {
              onModalOpen(job.id)
            }}
          >
            查看細節
          </button>
        </>
      )}
    </div>
  )
}
