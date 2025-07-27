import styles from './JobFilter.module.scss'
import { useMediaQuery } from '@mui/material'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'

export default function JobFilter({ options, onSubmit, onReset }) {
  const isMobile = useMediaQuery('(max-width:768px)')

  const [filter, setFilter] = useState({ keyword: '', salary: 0, education: 0 })
  const educationOptions = options.educationOptions || []
  const salaryOptions = options.salaryOptions || []

  useEffect(() => {
    setFilter({ keyword: '', salary: 0, education: 0 })
    onReset()
  }, [isMobile, onReset])

  return (
    <div className={styles.JobFilter}>
      <TextField
        slotProps={{ inputLabel: { shrink: true } }}
        label="公司名稱"
        value={filter.keyword}
        onChange={e => setFilter({ ...filter, keyword: e.target.value })}
        placeholder="請輸入公司名稱"
        sx={{ width: '50%' }}
      />
      <FormControl sx={{ width: '25%' }}>
        <InputLabel id="filter-education-label" shrink={true}>
          教育程度
        </InputLabel>
        <Select
          value={filter.education}
          onChange={e => setFilter({ ...filter, education: Number(e.target.value) })}
          labelId="filter-education-label"
          id="filter-education"
          label="教育程度"
        >
          <MenuItem value={0}>不限</MenuItem>
          {educationOptions.map((edu, index) => (
            <MenuItem key={index} value={edu.id}>
              {edu.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: '25%' }}>
        <InputLabel id="filter-salary-label" shrink={true}>
          薪水範圍
        </InputLabel>
        <Select
          value={filter.salary}
          onChange={e => setFilter({ ...filter, salary: Number(e.target.value) })}
          labelId="filter-salary-label"
          id="filter-salary"
          label="薪水範圍"
        >
          <MenuItem value={0}>不限</MenuItem>
          {salaryOptions.map((sal, index) => (
            <MenuItem key={index} value={sal.id}>
              {sal.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button className={styles.filterButton} onClick={() => onSubmit(filter)}>
        條件搜尋
      </button>
    </div>
  )
}
