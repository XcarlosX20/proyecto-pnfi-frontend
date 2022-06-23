import Teachers from '../Components/layout/views/Teachers,'
import Students from '../Components/layout/views/Students'
import { useContext } from 'react'
import authContext from '../Context/Auth/AuthContext'
import BasicLayout from '../Components/layout/BasicLayout'
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
      <BasicLayout>
        {user}
      </BasicLayout>
    </>
  )
}

export default Home
