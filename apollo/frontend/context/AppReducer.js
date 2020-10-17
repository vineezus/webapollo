//Reducer é como se especifica as mudanças no state, diante as actions
export default (state, action) => {
    switch(action.type){
        case 'GET_ANSWER':
            console.log('About to change state')
            return {
                ...state,
                results: action.payload,
                gotResults: true,
                loading: true
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