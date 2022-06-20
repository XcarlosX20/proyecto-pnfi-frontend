import { Container, Typography } from '@mui/material'
import { useState } from 'react'
import NewSubject from '../../ui/modals/teachers/NewSubject'
import Subjects from './Subjects'
const Teachers = () => {
  return (
    <>
      <NewSubject />
      <Container>
        <Typography>Your subjects:</Typography>
        <Subjects />
      </Container>
    </>
  )
}

export default Teachers
