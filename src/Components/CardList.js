import { Grid } from '@mui/material'
import CardDisplay from '../GeneralComponents/CardDisplay'
// import { sampleData } from '../GeneralComponents/data'
import React, { useState } from 'react'
import { useSelector } from  "react-redux"

// import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import { Paper, IconButton, Divider, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterCardForm from './FilterCardForm'
import CancelIcon from '@mui/icons-material/Cancel'
import { useDispatch } from 'react-redux'
import * as Actions from "./../store/action/index"




const CardList = () => {
  const dispatch = useDispatch()
  const cardList = useSelector(state => state?.cardListReducer)
  const searchKey = useSelector(state => state?.filterReducer)
  const [anchorEl, setAnchorEl] = useState(false)
  const [searchNameKey, setSearchNameKey] = useState("")
  const [cardNameSearch, setCardNameSearch] = useState(false)
  

  const location = useLocation()
  
  const type = location?.pathname
let cardResponse = cardList
  if(searchKey && searchKey?.cardType !== ""){
    cardResponse = cardResponse.filter(_card => _card?.card_type.toLowerCase().startsWith(searchKey?.cardType.toLowerCase()))
  }

  if(searchKey && searchKey?.cardHolder !== ""){
    cardResponse = cardResponse.filter(_card => _card.owner_name.toLowerCase().startsWith(searchKey?.cardHolder.toLowerCase()))
  }

  if(searchKey && searchKey?.cardName !== ""){
    console.log("Search Key CARD MNAME: ", searchKey?.cardName)
    cardResponse = cardResponse.filter(_card => _card?.name.toLowerCase().startsWith(searchKey?.cardName.toLowerCase()))
  }

  if(type && type === "/blocked"){
    cardResponse = cardResponse.filter(_card => _card?.status.toLowerCase() === "blocked")
  }

  if(type && type === "/your"){
    cardResponse = cardResponse.filter(_card => _card?.owner_name.toLowerCase().startsWith("akash"))
  }

  const handleFilter = (event) => {
    setAnchorEl(event.currentTarget)
    // setOpenAddCardForm(true)
  }

  const handleClose = () => {
    setAnchorEl(false);
  }
  
  const handleSearchNameKey = (e) => {
    e.preventDefault()
    setCardNameSearch(!cardNameSearch)
    let name = searchNameKey
    let param
    if(!cardNameSearch){
      param = {
      cardType: searchKey?.cardType,
      cardHolder: searchKey?.cardHolder,
      cardName: name,
    }
  }
  else{
    // searchNameKey("")
    param = {
      cardType: "",
      cardHolder: "",
      cardName: "",
    }
  }

    
    dispatch(Actions.setFilter(param))

  }

  return (
    <>
        <Paper
        elevation={3}
          style={{position: "fixed", backgroundColor: "white", zIndex: "10", width: "99%", margin: "2px", marginTop: "104px"}}
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search By Card Name"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={(e) => setSearchNameKey(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchNameKey}>
            {!cardNameSearch ? <SearchIcon /> : <CancelIcon />}
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleFilter} >
          <FilterListIcon />
          </IconButton>
        </Paper>
        <FilterCardForm anchorEl={anchorEl} handleClose={handleClose}  />
        <Grid container spacing={2} style={{width: "96%", margin: "20px", marginTop: "170px"}}>
            
                {cardResponse.length > 0 && cardResponse?.map((_cardList,index) => {
                    return(
                        <Grid item xs={6}>
                            <CardDisplay key={index}  cardData={_cardList} />
                        </Grid>
                    )
                })}
            
        </Grid>

        
    </>
  )
}

export default CardList
