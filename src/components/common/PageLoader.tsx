import { Box, CircularProgress } from '@mui/material'

const PageLoader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      className="bg-gray-50 dark:bg-gray-900"
    >
      <CircularProgress size={48} />
    </Box>
  )
}

export default PageLoader
