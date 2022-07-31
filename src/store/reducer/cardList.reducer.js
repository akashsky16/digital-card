import * as Actions from "../action/index"

const cardListReducer = (state= [], action) => {
    switch (action.type) {
        case Actions.SET_CARD_LIST:
            return [...action.payload, ...state ]
    
        default:
            return state
            
    }
}

export default cardListReducer