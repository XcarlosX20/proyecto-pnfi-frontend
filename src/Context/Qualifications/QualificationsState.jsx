import { useReducer } from 'react'
import { clientAxios } from '../../Axios/index.js'
import { ADD_QUALIFICATION_START, ADD_QUALIFICATION_SUCCCESS, GET_QUALIFICATION_START, GET_QUALIFICATION_SUCCESS, QUALIFICATION_ERROR, SELECT_STUDENT } from '../../Types/index.js'
import QualificationsContext from './QualificationsContext.jsx'
import QualificationsReducer from './QualificationsReducer.jsx'
import Swal from 'sweetalert2/dist/sweetalert2.all'
const QualificationsState = ({ children }) => {
  const initialState = {
    loading: false,
    qualificationsPerSubject: [],
    studentSelected: null
  }
  const [state, dispatch] = useReducer(QualificationsReducer, initialState)
  const getQualifications = async ({ student, subject }) => {
    // subjcted selected + students (id)
    const user = localStorage.getItem('user-type')
    dispatch({ type: GET_QUALIFICATION_START })
    try {
      const response = await clientAxios.get(`/api/qualifications/${user}?subject=${subject}&student=${student}`)
      dispatch({ type: GET_QUALIFICATION_SUCCESS, payload: response.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: QUALIFICATION_ERROR })
    }
  }
  const selectStudent = (student) => {
    dispatch({ type: SELECT_STUDENT, payload: student })
  }
  const addQualification = async ({ newQualification, user, student, subject }) => {
    // clone of teacher & student + form
    const data = {
      ...newQualification,
      teacher: user._id,
      student: student._id,
      subject
    }
    console.log(data)
    dispatch({ type: ADD_QUALIFICATION_START })
    try {
      const response = await clientAxios.post('/api/qualifications/', data)
      dispatch({ type: ADD_QUALIFICATION_SUCCCESS, payload: response.data })
      Swal.fire({ title: 'Calificacion subida', icon: 'success' })
    } catch (error) {
      console.log(error)
      dispatch({ type: QUALIFICATION_ERROR })
      Swal.fire({ title: error.response.data.msg || 'Something went wrong', icon: 'error' })
    }
  }
  return (
    <QualificationsContext.Provider value={{ state, addQualification, selectStudent, getQualifications }}>
      {children}
    </QualificationsContext.Provider>
  )
}

export default QualificationsState
