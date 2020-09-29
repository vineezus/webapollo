import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//Initial State
const initialState = {}

//Create context = por onde as components vão acessar o state
export const GlobalContext = createContext(initialState);

//Provider component = Fornece o state pros children components, que são todos que estão "dentro" dele no App.js
export const GlobalProvider = ( { children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    async function getSized(formAns) {
        console.log(formAns, typeof(formAns))
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
    
        try {
            const res = await axios.get('/api/', { formAns }, config);

            //dispatch() is the method used to dispatch actions and trigger state changes to the store
            dispatch({
                type: 'GET_ANSWER',
                payload: res.data.data
            });
            
            console.log(res.data.data, typeof(res.data.data), 'datadata')
            console.log(res.data, typeof(res.data), 'data')
            console.log(JSON.stringify(res.data.data) + '  response data')

        } catch (error) {
            dispatch({
                type: 'ANSWER_ERROR',
                payload: error.response.data.error
            });

            console.log(JSON.stringify(error.response.data.error) + '  error')
        }
    }

    return (<GlobalContext.Provider value={{
        results: state.results,
        error: state.error,
        loading: state.loading,
        getSized, //chamar a action aqui pra usar nos componentes
    }}>
        {children}
    </GlobalContext.Provider>);
}