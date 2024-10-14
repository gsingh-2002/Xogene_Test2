import React from 'react'
import DrugSearch from '../components/DrugSearch/DrugSearch'
import Navbar from '../components/Navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar pageName={"Search"} />
      <DrugSearch />

    </div>
  )
}

export default Home