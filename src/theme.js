import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#CCCCCC',
        },
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ee8927',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ee8927',
          },
          '& legend': {
            fontSize: '12px',
            transform: 'scale(1)',
            span: {
              padding: '0',
            },
          },
          input: {
            '&::placeholder': {
              color: '#4D4D4D',
              fontSize: '16px',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#4D4D4D',
          fontSize: '12px',
          '&.Mui-focused': {
            color: '#ee8927',
          },
        },
      },
    },
  },
})

export default theme
