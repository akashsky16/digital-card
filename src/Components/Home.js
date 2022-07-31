import React, { useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import { sampleData } from '../GeneralComponents/data'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CardList from './CardList'

const Home = () => {
const [cardList, setCardList] = useState(sampleData)


const handleAddCardData = data => {
  setCardList([data, ...sampleData])
}

  return (
    <Router>
    <div style={{display: "flex", flexDirection: "column" }}>
      <div style={{position:"fixed", backgroundColor: "white", width: "100%", zIndex: "10"}}>

        <Header handleAddCardData={handleAddCardData} />
        
      </div>
      <div>
        <Navbar cardList={cardList} />
        
      </div>
      <Routes>
        <Route path = "/" exact element={<CardList />} />
        <Route path = "/your" element={<CardList />}/>
        <Route path = "/all" element={<CardList />}/>
        <Route path = "/blocked" element={<CardList />}/>
      </Routes>
    </div>
    </Router>
  )
}

export default Home
