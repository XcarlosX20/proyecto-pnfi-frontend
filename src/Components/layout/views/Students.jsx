import { Container, Typography } from '@mui/material'
import JoinSubject from '../../ui/modals/students/JoinSubject'
import Subjects from './Subjects'
const Students = () => {
  return (
    <>
      <Container>
        <JoinSubject />
        <Typography>Your subjects:</Typography>
        <Subjects />
      </Container>
    </>
  )
}

export default Students
