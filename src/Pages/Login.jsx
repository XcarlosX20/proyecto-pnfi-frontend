import { Container, Stack, TextField, Button, Select, InputLabel, FormControl, MenuItem, Typography } from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authContext from '../Context/Auth/AuthContext'
import Swal from 'sweetalert2/dist/sweetalert2.all.js'
const Login = () => {
  const navigate = useNavigate()
  const { auth, login } = useContext(authContext)
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
      login(email, password, userType)
    } else {
      Swal.fire({ icon: 'error', title: 'Please fill all the fields' })
    }
  }
  useEffect(() => {
    if (auth) {
      navigate('/home', { replace: true })
    }
  }, [auth, navigate])
  return (
    <>
      <Container>
        <p>Login</p>
        <form onSubmit={handleSubmit}>
          <Stack direction='column' spacing={2}>
            <TextField type='email' onChange={handleInputs} placeholder='example@mail.com' name='email' />
            <TextField type='password' onChange={handleInputs} placeholder='******' name='password' />
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
          <Button sx={{ marginTop: '1rem' }} variant='contained' type='submit'>Login</Button>
        </form>
      </Container>
    </>
  )
}

export default Login
