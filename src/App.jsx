import React from 'react'
import DrugDetailsPage from './pages/DrugDetailsPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drugs/:drugName" element={<DrugDetailsPage />} />
      </Routes>
    </Router>
  )
}

export default App