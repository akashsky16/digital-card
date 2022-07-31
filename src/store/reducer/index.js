import cardListReducer from "./cardList.reducer"
import filterReducer from "./filter.reducer"
import { combineReducers } from "redux"

const allCardReducer = combineReducers({
    cardListReducer,
    filterReducer
})

export default allCardReducer