import { Container, Typography } from '@mui/material'
import JoinSubject from '../../ui/modals/students/JoinSubject'
import Subjects from './Subjects'
const Students = () => {
  return (
    <>
      <Container>
        <JoinSubject />
        <Typography p={2} variant='h6' textAlign='center'>Here's what you learning.</Typography>
        <Subjects />
      </Container>
    </>
  )
}

export default Students
