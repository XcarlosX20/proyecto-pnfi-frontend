import { ADD_QUALIFICATION_START, ADD_QUALIFICATION_SUCCCESS, GET_QUALIFICATION_START, GET_QUALIFICATION_SUCCESS, QUALIFICATION_ERROR, SELECT_STUDENT } from '../../Types'
const QualificationsReducer = (state, action) => {
  switch (action.type) {
    case GET_QUALIFICATION_SUCCESS:
      return { ...state, qualificationsPerSubject: action.payload, loading: false }
    case GET_QUALIFICATION_START:
    case ADD_QUALIFICATION_START:
      return { ...state, loading: true }
    case ADD_QUALIFICATION_SUCCCESS:
      return { ...state, loading: false, qualificationsPerSubject: [...state.qualificationsPerSubject, action.payload] }
    case QUALIFICATION_ERROR:
      return { ...state, loading: false, qualificationsPerSubject: [] }
    case SELECT_STUDENT:
      return { ...state, studentSelected: action.payload, qualificationsPerSubject: [] }
    default:
      return state
  }
}

export default QualificationsReducer
