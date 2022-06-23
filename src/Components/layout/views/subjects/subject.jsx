import { School, Person, Mail } from '@mui/icons-material'
import { Typography, List, Container, ListSubheader, ListItemButton, Alert, IconButton } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authContext from '../../../../Context/Auth/AuthContext.jsx'
import SubjectsContext from '../../../../Context/Subjects/SubjectsContext.jsx'
import Qualifications from '../../../ui/modals/students/Qualifications.jsx'
import NewCalification from '../../../ui/modals/teachers/NewQualification.jsx'
import BasicLayout from '../../BasicLayout.jsx'
const Subject = () => {
  const navigate = useNavigate()
  const { userType, user } = useContext(authContext)
  const { state } = useContext(SubjectsContext)
  const [subject] = state.subjectsSelected
  useEffect(() => {
    if (!subject) {
      return navigate('/home')
    }
  }, [subject])
  const selectStudent = (student) => {
    if (userType === 'teachers') {
      return (
        <>
          <NewCalification
            user={user}
            student={student}
            subject={subject._id}
          />
        </>
      )
    }
    return <ListItemButton key={student._id}>{`${student.name} - ${student.email}`}</ListItemButton>
  }
  if (!subject) return 'loading'
  return (
    <>
      <BasicLayout>
        <section>
          <Container sx={{ paddingTop: '1rem' }}>
            <article>
              <Typography variant='h4'>{subject.name}</Typography>
              <Typography><IconButton><School /></IconButton> <b>{subject.grade && subject.grade}</b></Typography>
              <Typography><IconButton><Person /></IconButton><b>{subject.teacherName}</b></Typography>
              <Typography><IconButton><Mail /></IconButton>{subject.teacherEmail}</Typography>
            </article>

            <List>
              <ListSubheader sx={{ textTransform: 'uppercase' }}>students</ListSubheader>
              {subject.students.length
                ? subject.students.map(student => (
                  selectStudent(student)
                ))
                : 'there no students yet'}
            </List>
            <Alert color='info'>
              <Typography textAlign='center' marginBottom={1}> Share the next code with your students to add them to this subject: <b>{subject.shortId}</b></Typography>
            </Alert>
            {userType === 'students' && <Qualifications userId={user._id} subject={subject._id} />}
          </Container>
        </section>
      </BasicLayout>
    </>
  )
}

export default Subject
