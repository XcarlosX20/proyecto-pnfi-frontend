import { useState } from 'react'
import { Button, Container, Dialog, Stack, TextField, Typography } from '@mui/material'
const ModalTeacher = () => {
  const [openModal, setOpenModal] = useState(false)
  const createSubject = () => {
    if (!openModal) {
      setOpenModal(true)
    } else {
      setOpenModal(false)
    }
  }
  return (
    <>
      <Button onClick={createSubject}>
        Create new subject
      </Button>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Container sx={{ padding: '2rem' }}>
          <form>
            <legend>
              <Typography textAlign='center' marginBottom={1}><b>Create new subject</b></Typography>
            </legend>
            <Stack
              spacing={2}
              direction='column'
            >
              <TextField
                label='Name of subject'
              />
              <TextField
                label='degree of instruction'
              />
              <Button variant='contained'>Create</Button>
            </Stack>
          </form>
        </Container>
      </Dialog>
    </>
  )
}

export default ModalTeacher
