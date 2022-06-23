import { useState, useEffect, useContext } from 'react'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import authContext from '../Context/Auth/AuthContext.jsx'
import Swal from 'sweetalert2/dist/sweetalert2.all.js'
import { useForm } from 'react-hook-form'
const SignIn = () => {
  const navigate = useNavigate()
  const { auth, registerUser } = useContext(authContext)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data) => {
    registerUser(data)
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction='column' spacing={2}>
            <TextField
              label='Name of user'
              {...register('name', { required: true })}
              error={errors.name}
            />
            <TextField
              type='email' label='Email' placeholder='example@email.com'
              {...register('email', { required: true })}
              error={errors.email}
            />
            <TextField
              type='password'
              label='Password'
              placeholder='******'
              helperText='min 6 characters'
              {...register('password', { required: true, minLength: 6 })}
              error={errors.password}
            />
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Type of user</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='userType'
                label='Type of user'
                {...register('userType', { required: true })}
                error={errors.userType}
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
