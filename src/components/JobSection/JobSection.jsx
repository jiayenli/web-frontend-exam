import styles from './JobSection.module.scss'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import JobCard from './JobCard/JobCard'
import Pagination from '../Common/Pagination/Pagination'
import JobModal from './JobModal/JobModal'

export default function JobSection() {
  return (
    <div className={styles.job}>
      <div className={styles.content}>
        <h2>適合前端工程師的好工作</h2>
        <div className={styles.filter}>
          <TextField
            slotProps={{
              inputLabel: { shrink: true },
            }}
            label="公司名稱"
            placeholder="請輸入公司名稱"
            sx={{ width: '50%' }}
          />
          <FormControl sx={{ width: '25%' }}>
            <InputLabel id="filter-education-label">教育程度</InputLabel>
            <Select
              labelId="filter-education-label"
              id="filter-education"
              defaultValue={20}
              label="教育程度"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: '25%' }}>
            <InputLabel id="filter-salary-label" shrink={true}>
              薪水範圍
            </InputLabel>
            <Select
              labelId="filter-salary-label"
              id="filter-salary"
              label="薪水範圍"
              defaultValue={20}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <button className={styles.filterButton}>條件搜尋</button>
        </div>

        <div className={styles.jobEmpty}>無資料</div>
        <div className={styles.jobList}>
          <JobCard
            job={{
              title: '前端工程師',
              company: 'HeeLoo',
              education: '學歷',
              salary: 'NT$ 60,000 - 80,000',
              description:
                '負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。',
            }}
          ></JobCard>
          <JobCard
            job={{
              title: '前端工程師',
              company: 'HeeLoo',
              education: '學歷',
              salary: 'NT$ 60,000 - 80,000',
              description:
                '負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。',
            }}
          ></JobCard>
          <JobCard
            job={{
              title: '前端工程師',
              company: 'HeeLoo',
              education: '學歷',
              salary: 'NT$ 60,000 - 80,000',
              description:
                '負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。',
            }}
          ></JobCard>
          <JobCard
            job={{
              title: '前端工程師',
              company: 'HeeLoo',
              education: '學歷',
              salary: 'NT$ 60,000 - 80,000',
              description:
                '負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。負責網站前端開發，使用 React.js 與 Vue.js 等技術。',
            }}
          ></JobCard>
        </div>
        <Pagination />
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
