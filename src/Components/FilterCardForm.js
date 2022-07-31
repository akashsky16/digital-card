import React, { useState } from 'react'
import { Grid, Popover, Chip, FormControl, InputLabel, MenuItem, Select, Button, Divider, Typography  } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CancelIcon from '@mui/icons-material/Cancel'
import * as Actions from "./../store/action/index"
import { useDispatch } from 'react-redux'


const FilterCardForm = ({anchorEl, handleClose}) => {
  const dispatch = useDispatch()
  const [cardType, setCardType] = useState("") 
  const [cardHolder, setCardHolder] = useState("");

   
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleBurnerCardType = () => {
    setCardType("Burner")
  }

  const handleSubscriptionCardType = () => {
    setCardType("Subscription")
  }

  const handleCancelCardType = () => {
    setCardType("")
  }

  const handleCardHolderChange = (event) => {
    setCardHolder(event.target.value);
  }

  const handleSubmit = () => {
    console.log("CardTYpe: ", cardType, "cardHolder: ", cardHolder)
    const param = {
      cardType,
      cardHolder,
      cardName: "",
    }
    dispatch(Actions.setFilter(param))
    handleClose()
  }

  const handleClear = () => {
    setCardType("")
    setCardHolder("")
    const param = {
      cardType: "",
      cardHolder: "",
      cardName: "",
    }
    dispatch(Actions.setFilter(param))
    handleClose()
  }

  return (
    <div>
        <Popover
        id={id}
        open={open}
        
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div style={{margin: "20px"}}>
            <Typography variant="subtitle1"> Filter</Typography>
            <Divider />
            <br />
            <Grid container spacing={2} >
                <Grid item xs={6} align="left">
                    <Chip 
                        variant={cardType === "Burner" ? "default" : "outlined"} 
                        color="primary" 
                        style={{ align: "center"}} 
                        label="Burner" 
                        onClick={handleBurnerCardType}
                        onDelete={handleCancelCardType}
                        deleteIcon={cardType === "Burner" ? <CancelIcon /> : <DoneIcon />} 
                    />
                </Grid>
                <Grid item xs={6} align="right">
                    <Chip 
                        variant={cardType === "Subscription" ? "default" : "outlined"} 
                        color="primary" 
                        style={{ align: "center"}} 
                        label="Subscription" 
                        onClick={handleSubscriptionCardType}
                        onDelete={handleCancelCardType}
                        deleteIcon={cardType === "Subscription" ? <CancelIcon /> : <DoneIcon />} 
                    />
                </Grid>
                <Grid item xs={12}>
                <FormControl style={{minWidth: "100%"}}>
                    <InputLabel id="demo-simple-select-label">Card Holder</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cardHolder}
                        label="CardHolder"
                        onChange={handleCardHolderChange}
                    >
                        <MenuItem value="Akash">Akash</MenuItem>
                        <MenuItem value="Vishal">Vishal</MenuItem>
                        <MenuItem value="Akshay">Akshay</MenuItem>
                        <MenuItem value="Rajesh">Rajesh</MenuItem>
                        <MenuItem value="Rajith">Rajith</MenuItem>
                        <MenuItem value="Kuldeep">Kuldeep</MenuItem>
                        <MenuItem value="Mayank">Mayank</MenuItem>
                    </Select>
                    
                </FormControl>
                </Grid>
            </Grid>
            <br />

            <Divider />
            
            <Button size="small" variant="contained" onClick={handleClear} style={{marginTop: "15px", marginBottom: "15px", backgroundColor: "#ffc0cb",  color: "#ff1493"}}> Clear</Button>
            <Button size="small" color="primary" variant="contained" onClick={handleSubmit} style={{marginTop: "15px", marginBottom: "15px", float: "right", backgroundColor: "#ff1493"}} >Apply</Button>

        </div>
      </Popover>
    </div>
  )
}

export default FilterCardForm
