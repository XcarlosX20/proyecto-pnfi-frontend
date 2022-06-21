import { useState, useEffect, useContext } from 'react'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import authContext from '../Context/Auth/AuthContext.jsx'
import Swal from 'sweetalert2/dist/sweetalert2.all.js'
const SignIn = () => {
  const navigate = useNavigate()
  const { auth, registerUser } = useContext(authContext)
  const [value, setValue] = useState({})
  const handleInputs = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password, userType } = value
    if (email && password && userType) {
      registerUser(value)
    } else {
      Swal.fire({ icon: 'error', title: 'Please fill all the fields' })
    }
  }
  useEffect(() => {
    if (auth) {
      navigate('/home', { replace: true })
    }
  }, [auth])
  return (
    <>
      <Container>
        <h3>Sign in</h3>
        <form onSubmit={handleSubmit}>
          <Stack direction='column' spacing={2}>
            <TextField onChange={handleInputs} label='Name of student' name='name' />
            <TextField type='email' onChange={handleInputs} label='Email' placeholder='example@email.com' name='email' />
            <TextField type='password' onChange={handleInputs} label='Password' placeholder='******' name='password' />
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Type of user</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='userType'
                value={value.userType}
                label='Type of user'
                onChange={handleInputs}
              >
                <MenuItem value='students'>Students</MenuItem>
                <MenuItem value='teachers'>Teachers</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack sx={{ marginTop: '1rem' }} direction='row' spacing={2}>
            <Button variant='contained' type='submit'>Register</Button>
            <Button><Link to='/login'>Login</Link></Button>
          </Stack>
        </form>
      </Container>
    </>
  )
}

export default SignIn
