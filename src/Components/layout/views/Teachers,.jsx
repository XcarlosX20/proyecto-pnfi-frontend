import { Container, Typography } from '@mui/material'
import NewSubject from '../../ui/modals/teachers/NewSubject'
import Subjects from './Subjects'
const Teachers = () => {
  return (
    <>
      <Container sx={{paddingTop: '1rem'}}>
        <NewSubject />
        <Typography>Your subjects:</Typography>
        <Subjects />
      </Container>
    </>
  )
}

export default Teachers
