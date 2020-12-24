//Reducer é como se especifica as mudanças no state, diante as actions
export default (state, action) => {
    switch(action.type){
        case 'GET_ANSWER':
            return {
                ...state,
                gotResults: true,
                loading: true,
                id: action.id,
                consum: action.consum,
                config: action.config,
                results: action.payload,
            }
        case 'ANSWER_ERROR':
            return {
                ...state,
                errors: action.payload,
                loading: false,
            }
        case 'LOADING_UPDATE':
            return {
                loading: !state.loading,
            }
        case 'COMEBACK_BABY':
            console.log('COMEBACK_BABY')
            return {
                gotResults: false,
            }
        case 'GET_CITIES':
            return {
                ...state,
                cities: action.payload,
            }
        case 'SET_CITYID':
            return {
                ...state,
                id: action.payload,
            }
        case 'UPDATE_RESULTS':
            console.log('UPDATE_RESULTS')
            return{
                ...state, 
                loading: true,
                gotResults: false,
            }
        default:
            return state;
    }
}