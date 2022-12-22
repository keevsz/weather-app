import { Box, CssBaseline, Paper } from '@mui/material'

interface Props {
  children: JSX.Element | JSX.Element[]
}
const PrincipalLayout = ({ children }: Props) => {
  return (
    <Box
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          height: '80%',
          '@media (min-width: 1024px)': { height: '70%' },
          '@media (max-width: 500px)': { height: '100%', width: '100%' },
          '@media (max-height: 800px)': { height: '98%' },
        }}
      >
        <Paper
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box
            width={'400px'}
            style={{
              transform: 'scale(0.85)',
            }}
          >
            {children}
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
export default PrincipalLayout
