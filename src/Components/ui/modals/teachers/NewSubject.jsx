import { useState, useRef, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Container, Dialog, Stack, TextField, Typography } from '@mui/material'
import authContext from '../../../../Context/Auth/AuthContext'
import SubjectsContext from '../../../../Context/Subjects/SubjectsContext'
const ModalTeacher = () => {
  const { user } = useContext(authContext)
  const { state, addSubject } = useContext(SubjectsContext)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [openModal, setOpenModal] = useState(false)
  const createSubject = () => {
    if (!openModal) {
      setOpenModal(true)
    } else {
      setOpenModal(false)
    }
  }
  const onSubmit = async (d, e) => {
    const data = new Map(Object.entries(d))
    if (!data.get('grade'))data.delete('grade')
    data.set('teacher', user._id)
    data.set('students', [])
    data.set('findStudent', [])
    await addSubject(Object.fromEntries(data))
    e.target.reset()
    setOpenModal(false)
  }
  return (
    <>
      <Button onClick={createSubject}>
        Create new subject
      </Button>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Container sx={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <legend>
              <Typography textAlign='center' marginBottom={1}><b>Create new subject</b></Typography>
            </legend>
            <Stack
              spacing={2}
              direction='column'
            >
              <TextField
                label='Name of subject'
                {...register('name', { required: true })}
                error={errors.name}
                helperText={errors.name && 'This field is required'}
              />
              <TextField
                label='degree of instruction'
                {...register('grade')}
              />
              {state.loading && <Typography textAlign='center' marginBottom={1}>Loading...</Typography>}
              <Button disabled={state.loading} type='submit' variant='contained'>Create</Button>
            </Stack>
          </form>
        </Container>
      </Dialog>
    </>
  )
}

export default ModalTeacher
