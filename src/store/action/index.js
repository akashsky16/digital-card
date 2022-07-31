export const SET_CARD_LIST = "SET_CARD_LIST"
export const SET_FILTER = "SET_FILTER"

export function setCardList(data) {
    return  {
        type: SET_CARD_LIST,
        payload: data,
    }
            
}

export function setFilter(data) {
    return {
        type: SET_FILTER,
        payload: data
    }
}