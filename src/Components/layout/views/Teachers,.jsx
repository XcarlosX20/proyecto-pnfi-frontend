import { useState } from 'react'
import NewSubject from '../../ui/modals/teachers/NewSubject'
import Subjects from './Subjects'
const Teachers = () => {
  return (
    <>
      <NewSubject />
      <Subjects />
    </>
  )
}

export default Teachers
