import { ThemeProvider } from '@mui/material/styles'
import Job from './components/JobSection/JobSection'
import Kv from './components/Kv/Kv'
import theme from './theme'

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
