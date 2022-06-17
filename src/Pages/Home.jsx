import Teachers from '../Components/layout/views/Teachers,'
import Header from '../Components/layout/Header'
import Students from '../Components/layout/views/Students'
import { useContext } from 'react'
import authContext from '../Context/Auth/AuthContext'
const Home = () => {
  const { userType } = useContext(authContext)
  let user
  if (userType === 'students') {
    user = <Students />
  } else if (userType === 'teachers') {
    user = <Teachers />
  } else {
    return null
  }
  return (
    <>
      <Header />
      {user}
    </>
  )
}

export default Home
