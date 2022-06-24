import { Container, Stack, TextField, Button, Select, InputLabel, FormControl, MenuItem, Box } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authContext from '../Context/Auth/AuthContext'
import { useForm } from 'react-hook-form'
import BarLoader from '../Components/ui/BarLoader'
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const {loading, auth, login } = useContext(authContext)
  useEffect(() => {
    if (auth) {
      navigate('/home', { replace: true })
    }
  }, [auth, navigate])
  const onSubmit = (data) => {
    const { email, password, userType } = data
    login(email, password, userType)
  }
  return (
    <>
      <Box sx={{ display: 'inline-block', width: '99%' }}>
        {loading ? (<BarLoader />) : null}
      </Box>
      <Container>
        <h3>Log in</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction='column' spacing={2}>
            <TextField type='email' {...register('email', { required: true })} placeholder='example@mail.com' name='email' error={errors.email} />
            <TextField
              type='password' {...register('password', { required: true, minLength: 6 })} placeholder='******'
              helperText={errors.password && 'min 6 characters'} error={errors.password}
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
            <Button disabled={loading} variant='contained' type='submit'>Login</Button>
            <Button><Link to='/sign-in'>Get an account</Link></Button>
          </Stack>
        </form>
      </Container>
    </>
  )
}

export default Login
