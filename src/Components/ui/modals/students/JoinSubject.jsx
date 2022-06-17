import { useState } from 'react'
import { Button, Container, Dialog, Stack, TextField, Typography } from '@mui/material'
const JoinSubject = () => {
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
        join to subject
      </Button>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Container sx={{ padding: '2rem' }}>
          <form>
            <legend>
              <Typography textAlign='center' marginBottom={1}><b> Share this code with your students to add them to this subject</b></Typography>
            </legend>
            <Stack
              spacing={2}
              direction='column'
            >
              <TextField
                label='code of subject'
              />
              <Button variant='contained'>join</Button>
            </Stack>
          </form>
        </Container>
      </Dialog>
    </>
  )
}

export default JoinSubject
