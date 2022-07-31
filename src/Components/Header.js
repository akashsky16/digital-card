import { Paper, Typography, Divider, IconButton } from '@mui/material'
import React, { useState } from 'react'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddCardForm from './AddCardForm';



const Header = ({handleAddCardData}) => {
  const [anchorEl, setAnchorEl] = useState(false)

  const handleCardAdd = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(false);
  }
  return (
  <>
  <div style={{display: "flex", margin: "5px"}}>
    <Typography variant='h4' align='left' style={{fontWeight: "600"}}> Virtual Cards</Typography>
    <Paper elevation={3} style={{height: "15%", display: "flex", padding: "2px", marginLeft: "4px", marginTop: "7px"}}>
      <VideocamOutlinedIcon color="primary" />
      <Typography variant='subtitle2' color='primary' style={{marginTop: "1px"}}> Learn More</Typography>
    </Paper>
    <Paper elevation={16}  style={{height: "20%", display: "flex", marginTop: "4px", marginLeft: "67%", padding: "3px"}}>
      <IconButton onClick={handleCardAdd} style={{height: "25px", width: "25px", marginRight: "3px"}}>
        <AddOutlinedIcon />
      </IconButton>
      <Typography variant="subtitle2" style={{padding: "2px"}}>Virtual Card</Typography>
    </Paper>
    <AddCardForm handleCardAdd={handleAddCardData} anchorEl={anchorEl} handleClose={handleClose} />
  </div>
  <Divider />
  </>
  
  )
}

export default Header