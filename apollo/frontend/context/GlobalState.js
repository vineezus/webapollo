import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//Initial State
const initialState = {
    results: null,
    gotResults: false,
    loading: false,
    error: null,
}

//Create context = por onde as components vão acessar o state
export const GlobalContext = createContext(initialState);

//Provider component = Fornece o state pros children components, que são todos que estão "dentro" dele no App.js
export const GlobalProvider = ( { children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    async function getSized(formAns) {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        console.log(formAns)
    
        try {
            const res = await axios.post('/api/off/', formAns, config);

            //dispatch() is the method used to dispatch actions and trigger state changes to the store
            dispatch({
                type: 'GET_ANSWER',
                payload: res.data,
            });

            console.log(res.data)
            console.log(res + "@res", res.data + "@data", res.data.data + "@data.data")
        } catch (error) {
            dispatch({
                type: 'ANSWER_ERROR',
                payload: error.response.data.error
            });
        }
    }

    async function getOnSized(formAns) {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
    
        try {
            const res = await axios.post('/api/on/', formAns, config);

            //dispatch() is the method used to dispatch actions and trigger state changes to the store
            dispatch({
                type: 'GET_ANSWER',
                payload: res.data,
            });

        } catch (error) {
            dispatch({
                type: 'ANSWER_ERROR',
                payload: error
            });

            console.log('=> ripada')
        }
    }

    return (<GlobalContext.Provider value={{
        results: state.results,
        gotResults: state.gotResults,
        loading: state.loading,
        error: state.error,
        getSized, //chamar a action aqui pra usar nos componentes
        getOnSized,
    }}>
        {children}
    </GlobalContext.Provider>);
}