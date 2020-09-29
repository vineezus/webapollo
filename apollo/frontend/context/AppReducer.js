//Reducer é como se especifica as mudanças no state, diante as actions
export default (state, action) => {
    switch(action.type){
        case 'GET_ANSWER':
            return {
                ...state,
                results: action.payload
            }
            case 'TRANSACTION_ERROR':
                return{
                    ...state,
                    error: action.payload
                }
        default:
            return state;
    }
}