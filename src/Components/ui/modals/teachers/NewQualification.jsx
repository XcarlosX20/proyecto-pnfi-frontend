import { Button, Stack, Dialog, TextField, Container, ListItemButton, List, ListItemText, Divider } from '@mui/material'
import { useContext, useState, useEffect } from 'react'
import QualificationsContext from '../../../../Context/Qualifications/QualificationsContext'
const NewQualification = ({ student, user, subject }) => {
  const { state, addQualification, selectStudent, getQualifications } = useContext(QualificationsContext)
  const [openModal, setOpenModal] = useState(false)
  const [locationModal, setLocationModal] = useState('post')
  const [newQualification, setQualification] = useState({})
  useEffect(() => {
    const selectStudentFn = () => {
      if (openModal === false) {
        selectStudent(null)
        setLocationModal('post')
      }
    }
    selectStudentFn()
  }, [openModal])
  useEffect(() => {
    const selectStudentFn = () => {
      if (locationModal === 'get') {
        getQualifications({ subject, student: student._id })
      }
    }
    selectStudentFn()
  }, [locationModal])
  const handleChange = (e) => {
    setQualification({
      ...newQualification,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    addQualification({ newQualification, user, student: state.studentSelected, subject })
    setQualification({})
    setOpenModal(false)
  }
  return (
    <>
      <ListItemButton
        onClick={() => { setOpenModal(!openModal); selectStudent(student) }}
        key={student._id}
      >{`${student.name} - ${student.email}`}
      </ListItemButton>
      <Dialog open={openModal} onClose={() => { setOpenModal(false) }}>
        <Container sx={{ padding: '2rem' }}>
          <Stack paddingBottom={1} direction='row' spacing={1}>
            <Button variant={locationModal === 'post' ? 'outlined' : 'contained'} onClick={() => setLocationModal('post')}>
              Calificar
            </Button>
            <Button variant={locationModal === 'get' ? 'outlined' : 'contained'} onClick={() => setLocationModal('get')}>
              Ver calificaciones
            </Button>
          </Stack>
          {locationModal === 'post'
            ? (
              <form onSubmit={onSubmit}>
                <Stack
                  spacing={2}
                  direction='column'
                >
                  <label>Calificar a {student.name}:</label>
                  <TextField
                    value={newQualification.unit}
                    onChange={handleChange}
                    label='Unidad'
                    name='unit'
                  />
                  <TextField
                    value={newQualification.valueObtained}
                    onChange={handleChange}
                    label='Puntuacion'
                    name='valueObtained'
                  />
                  <TextField
                    value={newQualification.quote}
                    onChange={handleChange}
                    label='Observacion'
                    name='quote'
                  />
                  <Button disabled={!newQualification.valueObtained || !newQualification.unit} type='submit' color='success' variant='contained'>Calificar</Button>
                </Stack>
              </form>
              )
            : (

              <>
                <p> {state.loading && 'loading'}</p>
                <List subheader='Unit : value'>
                  <Divider />
                  {state.qualificationsPerSubject.length
                    ? state.qualificationsPerSubject.map((item) => (
                      <ListItemText primary={`${item.unit} : ${item.valueObtained}`} />
                    ))
                    : !state.loading ? 'todavia no tiene calificaciones' : null}
                </List>
              </>
              )}
        </Container>
      </Dialog>
    </>
  )
}
export default NewQualification
