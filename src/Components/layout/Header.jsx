import { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Stack, Container, Grid } from '@mui/material'
import AuthContext from '../../Context/Auth/AuthContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
export default function Header () {
  const { user, auth, logout } = useContext(AuthContext)
  const matches = useMediaQuery('(min-width:768px)')
  const navigate = useNavigate()
  const Logout = () => {
    logout()
    window.location = '/login'
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container direction={matches ? 'row' : 'column'}>
            <Typography variant='h5'>
            <Link to={'/home'}>
              My Subjects
            </Link>
            </Typography>
            <Grid container justifyContent='flex-end'>
              <Button color='inherit'>
                <span>Hi,</span><Typography sx={{ fontWeight: '100', marginLeft: '5px' }}>{user && user.name}</Typography>
              </Button>
              {auth
                ? (<Button onClick={Logout} color='inherit'>logout</Button>)
                : (<Button onClick={Logout} color='inherit'>login</Button>)}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
