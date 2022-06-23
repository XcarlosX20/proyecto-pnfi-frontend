import { Typography, Box } from '@mui/material'
const Footer = () => {
  return (
    <footer>
      <Box marginTop={2} padding={2} sx={{ backgroundColor: 'secondary.main', color: '#fff' }}>
        <Typography textAlign='center'>
          Made with &#9829;
          by <a href='https://github.com/XcarlosX20/'>Carlos Sierra</a> and others for <a href='https://www.uptag.net/'>UPTAG</a>
        </Typography>
      </Box>
    </footer>
  )
}

export default Footer
