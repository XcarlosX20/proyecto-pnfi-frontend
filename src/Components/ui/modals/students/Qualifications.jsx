import { Container, Typography } from '@mui/material'
import { useEffect, useContext } from 'react'
import QualificationsContext from '../../../../Context/Qualifications/QualificationsContext'
const Qualifications = ({ subject, userId }) => {
  const { state, getQualifications } = useContext(QualificationsContext)
  useEffect(() => {
    getQualifications({ subject, student: userId })
  }, [subject, userId])
  return (
    <>
      <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography textAlign='center' variant='h5'>
          My actual qualifications
        </Typography>
        <table>
          <thead>
            <tr>
              <th>unit</th>
              <th>value obtained</th>
            </tr>
          </thead>
          <tbody>
            {state.qualificationsPerSubject.length
              ? state.qualificationsPerSubject.map(item => (
                <tr>
                  <td>{item.unit}</td>
                  <td>{item.valueObtained}</td>
                </tr>
              ))
              : !state.loading
                  ? <Typography textAlign='center'>you still have no qualifications</Typography>
                  : null}
          </tbody>
          {state.loading && <Typography>loading...</Typography>}
        </table>
      </Container>
    </>
  )
}

export default Qualifications
