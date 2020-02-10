const initialState = {
    isAuth: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuth: true
            }
        
        case 'LOGOUT':
            return {
                ...state,
                isAuth: false
            }
    }
    return state
}

export default reducer