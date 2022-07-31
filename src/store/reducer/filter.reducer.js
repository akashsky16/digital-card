import * as Actions from "../action/index"

const initialState = {
    cardType: "",
    cardHolder: "",
    cardName: "",
}

const filterReducer = (state=initialState, action) => {
    switch (action.type) {
        case Actions.SET_FILTER:
            return { cardType: action.payload.cardType, cardHolder: action.payload.cardHolder, cardName: action.payload.cardName }
    
        default:
            return initialState
            
    }
}

export default filterReducer