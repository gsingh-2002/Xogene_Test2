import React from 'react'
import DrugDetails from '../components/DrugDetails/DrugDetails'
import Navbar from '../components/Navbar/Navbar'

const DrugDetailsPage = () => {
  return (
    <>
      <Navbar pageName={"Details Page"} />
      <div className='drugDetails-Wrapper'>
        <DrugDetails />
      </div>

    </>

  )
}

export default DrugDetailsPage