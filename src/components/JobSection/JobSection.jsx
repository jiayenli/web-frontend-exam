import styles from './JobSection.module.scss'
import JobCard from './JobCard/JobCard'
import Pagination from '../Common/Pagination/Pagination'
import JobModal from './JobModal/JobModal'
import JobFilter from './JobFilter/JobFilter'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useMediaQuery } from '@mui/material'

export default function JobSection() {
  const jobRef = useRef(null)

  const [jobList, setJobList] = useState([])
  const [educationOptions, setEducationOptions] = useState([])
  const [salaryOptions, setSalaryOptions] = useState([])

  const [filteredJobs, setFilteredJobs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const isMobile = useMediaQuery('(max-width:768px)')
  const pageSize = isMobile ? 4 : 6

  // 初始載入職缺與選項列表
  useEffect(() => {
    async function fetchJobs() {
      try {
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
      jobTitle: job.jobTitle || '職位名稱為提供',
      companyName: job.companyName || '無公司名稱未提供',
      education: educationMap[job.educationId] || '學歷未提供',
      salary: salaryMap[job.salaryId] || '待遇未提供',
      preview: job.preview || '職位描述未提供',
    }))
  }, [filteredJobs, educationMap, salaryMap, currentPage, pageSize])

  // 分頁功能
  const handlePageChange = page => {
    if (page < 1 || page > Math.ceil(filteredJobs.length / pageSize)) return
    setCurrentPage(page)
    setTimeout(() => {
      jobRef.current.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  //篩選功能
  const handleFilter = filterData => {
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
  }

  return (
    <div className={styles.job} ref={jobRef}>
      <div className={styles.content}>
        <h2>適合前端工程師的好工作</h2>
        <JobFilter
          options={{ educationOptions, salaryOptions }}
          onSubmit={handleFilter}
        ></JobFilter>
        {displayJobs.length === 0 && <div className={styles.jobEmpty}>無資料</div>}
        <div className={styles.jobList}>
          {displayJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPage={Math.ceil(filteredJobs.length / pageSize)}
          maxVisible={isMobile ? 6 : 9}
          onPageChange={handlePageChange}
        />
      </div>
      <JobModal
        open={false}
        onClose={() => {
          console.log('Modal closed')
        }}
        job={{
          company: 'HeeLoo',
          title: '前端工程師',
          education: '學歷要求',
          salary: 'NT$ 60,000 - 80,000',
          description:
            '<h1>貨運操作員</h1><h2>工作地點：公司總部 - 台北市</h2><h2>職責與要求</h2><ul><li>負責倉儲內的物品搬運、分裝、包裝及出貨作業，確保貨物的準確性和完整性。<br />遵循公司的作業流程和安全規範，保障倉庫內的工作環境。<br />與團隊成員合作，確保倉儲操作的順暢進行。<br />需具備基本的電腦操作能力，能使用相關SaaS系統進行庫存管理。<br />需要有良好的溝通協調能力，能有效地與其他部門合作，確保整體物流運作的協調性。<br />對倉儲物流行業有興趣，願意學習並接受公司提供的培訓。</li></ul><h2>資格</h2><ul><li>至少高中畢業，具備相關物流或倉儲操作經驗者優先考慮。<br />具有貨運相關證照者尤佳。<br />對工作積極負責，有良好的工作態度和團隊協作精神。<br />願意接受輪班工作，能夠適應倉儲作業的體力需求。</li></ul><h2>我們提供</h2><ul><li>充滿挑戰性的工作環境，與國際化的專業團隊一同合作。<br />完善的培訓體系，協助您提升相關技能和知識。<br />良好的晉升機會，公司快速發展將為您提供更多職涯發展空間。<br />公司福利包括勞健保、團體保險、員工餐飲補助等。</li></ul><p>如果您渴望挑戰自我，想要加入一個充滿活力和機會的團隊，請將您的履歷寄至 <a href="mailto:hr@jenjanlogistics.com">hr@jenjanlogistics.com</a>，我們期待與您攜手共創物流行業的未來。<br /><br />【JenJan真站電商衛星倉儲物流】期待您的加入！</p>',
        }}
      />
    </div>
  )
}
