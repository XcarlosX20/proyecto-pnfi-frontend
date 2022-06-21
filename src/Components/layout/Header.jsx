import { useContext } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Grid, AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import AuthContext from '../../Context/Auth/AuthContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import SubjectsContext from '../../Context/Subjects/SubjectsContext.jsx'
export default function Header () {
  const { user, auth, logout, userType } = useContext(AuthContext)
  const { clearDataSubject } = useContext(SubjectsContext)
  const matches = useMediaQuery('(min-width:768px)')
  const navigate = useNavigate()
  const Logout = () => {
    clearDataSubject()
    logout()
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Grid container padding={1} direction={matches ? 'row' : 'column'}>
            <Typography variant='h5'>
              <Link to='/home'>
                My subjects
              </Link>
            </Typography>
            <Grid container justifyContent='flex-end'>
              <Typography padding={1} sx={{ fontWeight: 'light', textTransform: 'capitalize' }}>{`${userType.slice(0, -1)}`} <b>{user && user.name}</b></Typography>
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
