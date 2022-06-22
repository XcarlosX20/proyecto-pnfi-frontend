import { GET_SUBJECTS_START, GET_SUBJECTS_SUCCESS, ADD_SUBJECT_START, ADD_SUBJECT_SUCCESS, SELECT_SUBJECT, GET_SUBJECTS_ERROR, CLEAR_DATA_SUBJECT } from '../../Types'
const SubjectsReducer = (state, action) => {
  switch (action.type) {
    case ADD_SUBJECT_START:
    case GET_SUBJECTS_START:
      return { ...state, loading: true }
    case GET_SUBJECTS_SUCCESS:
      return { ...state, subjects: action.payload, loading: false }
    case ADD_SUBJECT_SUCCESS:
      return { ...state, subjects: [action.payload, ...state.subjects], loading: false }
    case SELECT_SUBJECT:
      return { ...state, subjectsSelected: state.subjects.filter(x => (x._id === action.payload)) }
    case GET_SUBJECTS_ERROR:{
      return { ...state, loading: false }
    }
    case CLEAR_DATA_SUBJECT:
      return {
        subjects: [],
        subjectsSelected: [],
        loading: false,
        error: null
      }
  }
  return state
}
export default SubjectsReducer
