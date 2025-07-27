import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import Kv from './components/Kv/Kv'
import Job from './components/JobSection/JobSection'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="main">
        <Kv />
        <Job />
      </div>
    </ThemeProvider>
  )
}

export default App
