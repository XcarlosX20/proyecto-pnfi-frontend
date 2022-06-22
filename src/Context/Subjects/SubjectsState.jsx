import { useReducer } from 'react'
import { clientAxios } from '../../Axios'
import SubjectsContext from '../../Context/Subjects/SubjectsContext'
import { ADD_SUBJECT_START, ADD_SUBJECT_SUCCESS, GET_SUBJECTS_ERROR, GET_SUBJECTS_START, GET_SUBJECTS_SUCCESS, SELECT_SUBJECT, CLEAR_DATA_SUBJECT } from '../../Types'
import SubjectsReducer from './SubjectsReducer'
import Swal from 'sweetalert2/dist/sweetalert2.all'
const SubjectsState = ({ children }) => {
  const initialState = {
    subjects: [],
    subjectsSelected: [],
    loading: false,
    error: null
  }
  const [state, dispatch] = useReducer(SubjectsReducer, initialState)
  const addSubject = async (subject) => {
    dispatch({ type: ADD_SUBJECT_START })
    try {
      const response = await clientAxios.post('/api/subjects/', subject)
      if (response.status === 201) {
        dispatch({ type: ADD_SUBJECT_SUCCESS, payload: response.data.newSubject })
        Swal.fire({ icon: 'success', title: response.data.msg })
      }
    } catch (error) {
      console.log(error)
      Swal.fire({ title: error.response.data.msg || 'Something went wrong', icon: 'error' })
    }
  }
  const getSubjects = async ({ userId, userType }) => {
    dispatch({ type: GET_SUBJECTS_START })
    try {
      const response = await clientAxios(`api/subjects/${userType}/${userId}`)
      dispatch({ type: GET_SUBJECTS_SUCCESS, payload: response.data })
    } catch (error) {
      dispatch({ type: GET_SUBJECTS_ERROR })
    }
  }
  const selectSubject = (subjectId) => {
    dispatch({ type: SELECT_SUBJECT, payload: subjectId })
  }
  const JointoSubject = async (data) => {
    const { _id, name, email } = data
    dispatch({ type: GET_SUBJECTS_START })
    try {
      const response = await clientAxios.put(`api/subjects/join/${data.shortId}`, { _id, name, email })
      if (response.status === 202) {
        Swal.fire({ icon: 'success', title: response.data.msg })
        getSubjects({ userType: localStorage.getItem('user-type'), userId: _id })
      }
    } catch (error) {
      console.log(error)
      Swal.fire({ title: error.response.data.msg || 'Something went wrong', icon: 'error' })
      dispatch({ type: GET_SUBJECTS_ERROR })
    }
  }
  const clearDataSubject = () => {
    dispatch({ type: CLEAR_DATA_SUBJECT })
  }
  return (
    <SubjectsContext.Provider value={{ state, addSubject, getSubjects, selectSubject, JointoSubject, clearDataSubject }}>
      {children}
    </SubjectsContext.Provider>
  )
}

export default SubjectsState
