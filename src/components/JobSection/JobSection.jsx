import styles from './JobSection.module.scss'
import JobCard from './JobCard/JobCard'
import Pagination from '../Common/Pagination/Pagination'
import JobModal from './JobModal/JobModal'
import JobFilter from './JobFilter/JobFilter'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useMediaQuery } from '@mui/material'

export default function JobSection() {
  const jobRef = useRef(null)

  const [jobList, setJobList] = useState([])

  const [educationOptions, setEducationOptions] = useState([])
  const [salaryOptions, setSalaryOptions] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [showJobModal, setShowJobModal] = useState(false)
  const [jobModalData, setJobModalData] = useState(null)
  const [isJobModalLoading, setIsJobModalLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const isMobile = useMediaQuery('(max-width:768px)')
  const pageSize = isMobile ? 4 : 6

  // 初始載入職缺與選項列表
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        const [jobRes, eduRes, salaryRes] = await Promise.all([
          fetch('/api/v1/jobs'),
          fetch('/api/v1/educationLevelList'),
          fetch('/api/v1/salaryLevelList'),
        ])

        if (!jobRes.ok || !eduRes.ok || !salaryRes.ok) {
          throw new Error('API 請求失敗')
        }

        const { data: jobData } = await jobRes.json()
        const eduData = await eduRes.json()
        const salaryData = await salaryRes.json()

        setJobList(jobData)
        setEducationOptions(eduData)
        setSalaryOptions(salaryData)
        setFilteredJobs(jobData)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobs()
  }, [])

  // 教育程度Map表
  const educationMap = useMemo(() => {
    if (!educationOptions || educationOptions.length === 0) {
      return {}
    }
    return educationOptions.reduce((acc, curr) => {
      acc[curr.id] = curr.label
      return acc
    }, {})
  }, [educationOptions])

  // 薪資選項Map表
  const salaryMap = useMemo(() => {
    if (!salaryOptions || salaryOptions.length === 0) {
      return {}
    }
    return salaryOptions.reduce((acc, curr) => {
      acc[curr.id] = curr.label
      return acc
    }, {})
  }, [salaryOptions])

  // 顯示的工作列表（根據篩選出來的資料，做分頁與字詞轉換）
  const displayJobs = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const pageJobs = filteredJobs.slice(start, end)

    return pageJobs.map(job => ({
      id: job.id,
      jobTitle: job.jobTitle || '職位名稱為提供',
      companyName: job.companyName || '無公司名稱未提供',
      education: educationMap[job.educationId] || '學歷未提供',
      salary: salaryMap[job.salaryId] || '待遇未提供',
      preview: job.preview || '職位描述未提供',
    }))
  }, [filteredJobs, educationMap, salaryMap, currentPage, pageSize])

  // 分頁功能
  const handlePageChange = useCallback(
    page => {
      if (page < 1 || page > Math.ceil(filteredJobs.length / pageSize)) return
      setCurrentPage(page)
    },
    [filteredJobs, pageSize]
  )

  const clickPagination = useCallback(
    page => {
      handlePageChange(page)
      setTimeout(() => {
        jobRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    },
    [handlePageChange]
  )

  //篩選功能
  const handleResetFilter = useCallback(() => {
    setFilteredJobs(jobList)
    setCurrentPage(1)
  }, [jobList])

  const handleFilter = useCallback(
    filterData => {
      const result = jobList.filter(job => {
        const matchSalary = filterData.salary ? job.salaryId === filterData.salary : true
        const matchEdu = filterData.education ? job.educationId === filterData.education : true
        const matchKeyword = filterData.keyword
          ? job.jobTitle.includes(filterData.keyword) ||
            job.companyName.includes(filterData.keyword) ||
            job.preview.includes(filterData.keyword)
          : true
        return matchSalary && matchEdu && matchKeyword
      })

      setFilteredJobs(result)
      handlePageChange(1)
      setTimeout(() => {
        jobRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    },
    [jobList, handlePageChange]
  )

  // 職缺彈窗
  const handleJobModalOpen = async id => {
    setShowJobModal(true)
    try {
      setIsJobModalLoading(true)
      const job = await fetch(`/api/v1/jobs/${id}`)
      if (!job.ok) {
        throw new Error('API 請求失敗')
      }
      const jobData = await job.json()
      setJobModalData({ ...jobData })
    } catch (error) {
      console.error('Error opening job modal:', error)
    } finally {
      setIsJobModalLoading(false)
    }
  }

  const handleJobModalClose = () => {
    setShowJobModal(false)
    setJobModalData(null)
  }

  return (
    <div className={styles.job} ref={jobRef}>
      <div className={styles.content}>
        <h2>適合前端工程師的好工作</h2>
        <JobFilter
          options={{ educationOptions, salaryOptions }}
          onSubmit={handleFilter}
          onReset={handleResetFilter}
        ></JobFilter>
        {displayJobs.length === 0 && !isLoading && <div className={styles.jobEmpty}>無資料</div>}
        <div className={styles.jobList}>
          {isLoading ? (
            <>
              {Array.from({ length: pageSize }).map((_, index) => (
                <JobCard key={index} isSkeleton={true} />
              ))}
            </>
          ) : (
            <>
              {displayJobs.map((job, index) => (
                <JobCard key={index} job={job} onModalOpen={handleJobModalOpen} />
              ))}
            </>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPage={Math.ceil(filteredJobs.length / pageSize)}
          maxVisible={isMobile ? 6 : 9}
          onPageChange={clickPagination}
        />
      </div>
      {showJobModal && (
        <JobModal
          open={showJobModal}
          onClose={handleJobModalClose}
          isLoading={isJobModalLoading}
          job={{
            companyName: jobModalData?.companyName || '公司名稱未提供',
            jobTitle: jobModalData?.jobTitle || '職位名稱未提供',
            description: jobModalData?.description || '職位描述未提供',
            companyPhoto: jobModalData?.companyPhoto || '',
          }}
        />
      )}
    </div>
  )
}
