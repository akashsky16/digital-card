import React, { useState } from 'react'
import { Popover, MenuItem, TextField, Chip, Button, Divider, Typography, Paper, Grid  } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CancelIcon from '@mui/icons-material/Cancel'
import * as Actions from "./../store/action/index"
import { useDispatch } from 'react-redux'

const currencies = [
    {
      value: 'USD',
      label: 'USD',
    },
    {
      value: 'SGD',
      label: 'SGD',
    },
    {
      value: 'Indian Rupee',
      label: 'Rupee',
    },
  ];

const AddCardForm = ({anchorEl, handleClose}) => {
  const dispatch = useDispatch()
    const [name, setName] = useState()
    const [budgetName, setBudgetName] = useState()
    const [ownerName, setOwnerName] = useState()
    const [currency, setCurrency] = useState("SGD")
    const [expiry, setExpiry] = useState(new Date())
    const [cardType, setCardType] = useState("")
    const [spentValue, setSpentValue] = useState()
    const [availableValue, setAvailableValue] = useState()
    const [limit, setLimit] = useState()
    const [error, setError] = useState(false)

    const handleBurnerCardType = ()=> {
            setCardType("Burner")
    }

    const handleSubscriptionCardType = ()=> {
            setCardType("Subscription")
    }

    const handleCancelCardType = () => {
        setCardType("")
    }

    const handleChange = (event) => {
        setCurrency(event.target.value);
      }

    const handleSubmit = () => {
        if(cardType === "" || !name || !budgetName || !ownerName || !spentValue || !availableValue){
            setError(true)
            return false
        }
        const month = expiry.toLocaleString('en-US', {month: 'long'})
        const day = expiry.getUTCDate();
        const year = expiry.getUTCFullYear();

        let newdate = day+ " "+ month + " "+ year
        if(cardType.toLocaleLowerCase() === "subscription"){
            newdate = month
        }
        const params = {
            name,
            budget_name: budgetName,
            owner_id: 1,
            owner_name: ownerName,
            spent: {
                value: parseInt(spentValue),
                currency,
                },
            available_to_spend: {
                    value: parseInt(availableValue),
                    currency,
                    },
            card_type: cardType,
            expiry: newdate,
            limit: 100,
            status: "Active"
        }

        console.log("Testing Params: ", params)
        
        dispatch(Actions.setCardList([params]))
        handleClose()
        
    }

   const handleClear = () => {
    setName()
    setBudgetName()
    setAvailableValue()
    setSpentValue()
    setCardType("")
    setLimit()
    setOwnerName()
    setError(false)
    handleClose()
   }


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


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
        <div style={{margin: "30px", width: "500px" }}>
            <Typography variant="h5" align="center" style={{color: "#ff1493"}}> Add New Card</Typography>
            <Divider />
            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
            <Chip 
                variant={cardType === "Burner" ? "default" : "outlined"} 
                color="primary" 
                 
                label="Burner" 
                onClick={handleBurnerCardType}
                onDelete={handleCancelCardType}
                deleteIcon={cardType === "Burner" ? <CancelIcon /> : <DoneIcon />} 
            />
            
            <Chip 
                variant={cardType === "Subscription" ? "default" : "outlined"} 
                color="primary" 
                style={{ marginLeft: "28px"}} 
                label="Subscription" 
                onClick={handleSubscriptionCardType}
                onDelete={handleCancelCardType}
                deleteIcon={cardType === "Subscription" ? <CancelIcon /> : <DoneIcon />} 
            />
            </Grid>
            <Grid item xs={6}>
            <TextField id="name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}  size="small" style={{marginLeft: "15px"}} required />
            </Grid>
            <Grid item xs={6}>
            <TextField id="budgetName" label="Budget Name" variant="outlined" value={budgetName} onChange={(e) => setBudgetName(e.target.value)}  size="small" style={{marginTop: "15px"}} required /> 
            </Grid>
            <Grid item xs={6}>
            
            <TextField id="ownerName" label="Owner Name" variant="outlined" value={ownerName} onChange={(e) => setOwnerName(e.target.value)}  size="small" style={{marginLeft: "15px", marginTop: "15px"}} required />
            </Grid>
            <Grid item xs={6}>
            
            <TextField type="number" id="spentValue" label="Spent" variant="outlined" value={spentValue} onChange={(e) => setSpentValue(e.target.value)}  size="small" style={{marginTop: "15px"}} required />
            </Grid>
            <Grid item xs={6}>
            
            <TextField type="number" id="availableToValue" label="Available" variant="outlined" value={availableValue} onChange={(e) => setAvailableValue(e.target.value)}  size="small" style={{marginTop: "15px", marginLeft: "15px"}} required /> 
            </Grid>
            {cardType.toLocaleLowerCase() === "subscription" &&
            <Grid item xs={6}>
            
                <TextField type="number" id="limit" label="Limit" variant="outlined" value={limit} onChange={(e) => setLimit(e.target.value)}  size="small" style={{marginTop: "15px"}} />
            </Grid>
            }
            {cardType.toLocaleLowerCase() === "burner" &&   
            <Grid item xs={6}>
                
            <TextField type="date" id="limit" value={expiry} onChange={(e) => setExpiry(e.target.value)}  variant="outlined"  size="small" style={{marginTop: "15px"}} helperText="Set Expiry Date" />
            </Grid>
        }
            <Grid item xs={6}>
            
            <TextField
                size="small"
                style={cardType !== "" ? { marginTop: "15px", marginLeft: "15px"} : { marginTop: "15px"} }  
                id="outlined-select-currency"
                select
                label="Currency"
                value={currency}
                onChange={handleChange}
                
                required
                >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            </Grid>
            
            <Grid item xs={12}>
            
            {error 
            ? <Paper elevation={3} style={{ backgroundColor: "#ffc0cb",  color: "#ff1493"}}>
                <Typography variant="subtitle1" align="center">Please Enter All Details</Typography>
            </Paper>
            : null}
            
            </Grid>
            
            
            </Grid>
            <Divider />
            <Button variant="contained" onClick={handleClear} style={{marginTop: "15px", marginBottom: "15px", backgroundColor: "#ffc0cb",  color: "#ff1493"}}> Clear</Button>
            <Button color="primary" variant="contained" onClick={handleSubmit} style={{marginTop: "15px", marginBottom: "15px", float: "right", backgroundColor: "#ff1493"}} >Add Card</Button>
        </div>
      </Popover>
    </div>
  )
}

export default AddCardForm