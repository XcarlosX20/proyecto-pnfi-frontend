import { useState } from 'react'
import { Button, Container, Stack, TextField } from '@mui/material'
const SignIn = () => {
  const [value, setValue] = useState({})
  const handleInputs = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = value
    if (email && password) {
      alert('registing')
    }
  }
  return (
    <>
      <Container>
        <h3>SignIn</h3>
        <form onSubmit={handleSubmit}>
          <Stack direction='column' spacing={2}>
            <TextField onChange={handleInputs} label='Name of student' name='name' />
            <TextField type='email' onChange={handleInputs} label='Email' placeholder='example@email.com' name='email' />
            <TextField type='password' onChange={handleInputs} label='Password' placeholder='******' name='password' />
          </Stack>
          <Button sx={{ marginTop: '1rem' }} variant='contained' type='submit'>Register</Button>
        </form>
      </Container>
    </>
  )
}

export default SignIn
