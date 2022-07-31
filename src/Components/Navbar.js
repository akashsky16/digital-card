import { Box, Tabs, Tab } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = ({cardList}) => {
  const [activeTab, setActiveTab] = useState("all")
  

  return (
    <>
        <Box sx={{ width: '100%' }}>
      <Box style={{position: "fixed", backgroundColor: "white", width: "100%", marginTop: "53px", zIndex: "10"}} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs onCl   aria-label="basic tabs example">
        <Link to="/all" style= {activeTab === "all" ? {borderBottom: "2px solid  red", backgroundColor: "#D0D0D0", color: "black", textDecoration: "none"}: {textDecoration: "none"}} >
          <Tab label="All" onClick={() => {setActiveTab("all")}}   />

        </Link>
        <Link to="/your" style= {activeTab === "your" ? {borderBottom: "2px solid  red", backgroundColor: "#D0D0D0", color: "black", textDecoration: "none"}: {textDecoration: "none"}} >
          <Tab label="Your" onClick={() => {setActiveTab("your")}}/>
        </Link>
        <Link to="/blocked" style= {activeTab === "blocked" ? {borderBottom: "2px solid  red", backgroundColor: "#D0D0D0", color: "black", textDecoration: "none"}: {textDecoration: "none"}} >
          <Tab label="Blocked" onClick={() => {setActiveTab("blocked")}} />
        </Link>
        
        </Tabs>
        
      </Box>
      
      
    </Box>

    </>
  )
}

export default Navbar
