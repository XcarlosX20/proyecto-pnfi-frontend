import { useState, useContext } from 'react'
import { Button, Container, Dialog, Stack, TextField, Typography } from '@mui/material'
import authContext from '../../../../Context/Auth/AuthContext'
import SubjectsContext from '../../../../Context/Subjects/SubjectsContext'
const JoinSubject = () => {
  const {user} = useContext(authContext)
  const {JointoSubject} = useContext(SubjectsContext)
  const [value, setValue] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const createSubject = () => {
    if (!openModal) {
      setOpenModal(true)
    } else {
      setOpenModal(false)
    }
  }
  const onSubmit = async (e) => {
      e.preventDefault();
      const data = new Map(Object.entries(user))
      data.set('shortId', value)
      data.delete('register')
      data.delete('subjects')
      JointoSubject(Object.fromEntries(data))
      setValue('')
      setOpenModal(false)
    }
  return (
    <>
      <Button onClick={createSubject}>
        join to subject
      </Button>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Container sx={{ padding: '2rem' }}>
          <form onSubmit={onSubmit}>
            <legend>
              <Typography textAlign='center' marginBottom={1}><b>Ingresa el codigo de la materia para agregarla</b></Typography>
            </legend>
            <Stack
              spacing={2}
              direction='column'
            >
              <TextField
              value={value}
               onChange={(e) => setValue(e.target.value)}
                label='code of subject'
              />
              <Button disabled={!value} type="submit" color='success' variant='contained'>join</Button>
            </Stack>
          </form>
        </Container>
      </Dialog>
    </>
  )
}

export default JoinSubject
