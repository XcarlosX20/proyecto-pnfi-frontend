import { useContext, useEffect } from 'react'
import { Button, Card, CardActions, CardContent, Grid, Typography, Alert, IconButton, Container } from '@mui/material'
import SubjectsContext from '../../../Context/Subjects/SubjectsContext.jsx'
import authContext from '../../../Context/Auth/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { Info } from '@mui/icons-material'
const Subjects = () => {
  const navigate = useNavigate()
  const { user, userType } = useContext(authContext)
  const { state, getSubjects, selectSubject } = useContext(SubjectsContext)
  useEffect(() => {
    if (user._id && userType) {
      getSubjects({ userId: user._id, userType })
    }
  }, [user._id, userType])
  return (
    <>
      <Grid container rowGap={2} columnGap={2}>
        {state.subjects.length
          ? state.subjects.map(subject => (
            <Card sx={{ minWidth: 275, backgroundColor: 'seashell' }} key={subject._id}>
              <CardContent>
                {subject.grade &&
                  <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    {subject.grade}
                  </Typography>}
                <Typography variant='h5' component='div'>
                  {subject.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  {subject.students.length} students
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => {
                    navigate(`/subjects/${subject.name}?_id=${subject._id}`)
                    selectSubject(subject._id)
                  }} size='small'
                >See subject
                </Button>
              </CardActions>
            </Card>
          ))
          : !state.loading
              ? <Container maxWidth='md'>
                <Alert icon={false} color='error' textAlign='center'>
                  <IconButton><Info /></IconButton>you still have no subjects added
                </Alert>
                </Container>
              : null}
      </Grid>
    </>
  )
}

export default Subjects
