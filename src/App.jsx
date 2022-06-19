import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignIn from './Pages/SignIn'
import Subject from './Components/layout/views/subjects/subject'
import AuthState from './Context/Auth/AuthState'
import { tokenAuth } from './Axios'
import RequireAuth from './Context/Auth/RequireAuth.jsx'
import SubjectsState from './Context/Subjects/SubjectsState.jsx'
const App = () => {
  const token = localStorage.getItem('token')
  if (token) {
    tokenAuth(token)
  }
  return (
    <>
      <AuthState>
        <SubjectsState>
          <BrowserRouter>
            <Routes>
              <Route path='/' exact element={<p>home</p>} />
              <Route path='/home' element={<RequireAuth><Home /></RequireAuth>} />
              <Route path='/login' element={<Login />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/subjects/:_id' element={<Subject />} />
            </Routes>
          </BrowserRouter>
        </SubjectsState>
      </AuthState>
    </>
  )
}

export default App
