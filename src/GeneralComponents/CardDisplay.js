import { Grid, IconButton, Paper, Slider, Typography } from '@mui/material'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import WifiProtectedSetupSharpIcon from '@mui/icons-material/WifiProtectedSetupSharp';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React from 'react'

const styles = {
  card :{
    padding: "10px",
  },
  label : {
    text: "12px",
    color: "#909090"
  },

  iconButton : {
    float: "right",
    backgroundColor: "#ffe6f2",
    
  },
  icon : {
    color: "#ff1493",
  }
}

// const muiTheme = createTheme({
//   slider: {
//     trackColor: "yellow",
//     selectionColor: "red"
//   }
// });

const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        thumb:{
          color: "#018749",
          },
          track: {
            color: '#018749'
          },
          rail: {
            color: '#FF00BF'
          }
      },
    },
  },
})



export const CardDisplay = ({cardData}) => {
  const sliderValue = Math.round(cardData.available_to_spend.value/(cardData.spent.value+cardData.available_to_spend.value)*100)
  // console.log("SLider Value: ", sliderValue, "cardData.available_to_spend.value: ", cardData.available_to_spend.value)
  return (
    <div>
      <Paper elevation={16} style={cardData.status.toLowerCase() === "blocked" ? {padding: "10px", border: "1px solid red"} : {padding: "10px",}}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography variant="h5" align="left" styles={{width: "50%"}}>
              {cardData.name}
            </Typography>
            <Typography variant="subtitle2" align="left" style={styles.label}>
              {cardData.owner_name} <FiberManualRecordIcon style={{color: "#909090", fontSize: "8px"}} /> {cardData.budget_name}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <IconButton style={styles.iconButton}>
              {cardData.card_type.toLowerCase() === "burner" &&
                <LocalFireDepartmentIcon style={styles.icon} />
              }
              {cardData.card_type.toLowerCase() === "subscription" &&
                <WifiProtectedSetupSharpIcon style={styles.icon} />
              }
            </IconButton>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="subtitle2" style={{border:"1px solid", borderRadius: "5px", fontSize:"12px", color: "#909090"}} >
              {cardData.card_type}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2" align="right" style={{color: "#909090"}}>
              {cardData.card_type.toLowerCase() === "burner" ? cardData.expiry: `${cardData.expiry} Limit : ${cardData.limit} ${cardData.spent.currency}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ThemeProvider theme={theme}>
            <Slider
              aria-label="Temperature"
              value={sliderValue}
              

              // color="success"
              // color: "#ff1493"
              style={{ width: "95%"}}
            />
            </ThemeProvider>
          </Grid>
          <Grid item xs={1}>
            <FiberManualRecordIcon style={{color: "#FFC0CB"}} />
          </Grid>

          <Grid item xs={8}>
            <Typography align="left" variant="subtitle1">
                Spent
            </Typography>
          </Grid>

          

          <Grid item xs={2}>
            <Typography align="right" variant="subtitle2">
              {cardData.spent.value}
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <Typography align="left" variant="subtitle2">
              {cardData.spent.currency}
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <FiberManualRecordIcon style={{color: "#006A4E"}} />
          </Grid>

          <Grid item xs={8}>
            <Typography align="left" variant="subtitle1">
                Available to Spend
            </Typography>
          </Grid>

          

          <Grid item xs={2}>
            
            <Typography align="right" variant="subtitle2">
              {cardData.available_to_spend.value}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            
            <Typography align="left" variant="subtitle2">
              {cardData.available_to_spend.currency}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default CardDisplay
