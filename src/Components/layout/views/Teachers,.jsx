import { Container, Typography } from '@mui/material'
import { useState } from 'react'
import NewSubject from '../../ui/modals/teachers/NewSubject'
import Subjects from './Subjects'
const Teachers = () => {
  return (
    <>
      <Container>
        <NewSubject />
        <Typography>Your subjects:</Typography>
        <Subjects />
      </Container>
    </>
  )
}

export default Teachers
