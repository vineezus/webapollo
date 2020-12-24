import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//Initial State
const initialState = {
    id: null,
    consum: null,
    cities: [],
    form: null,
    results: null,
    gotResults: false,
    loading: false,
    errors: null,
}

//Create context = por onde as components vão acessar o state
export const GlobalContext = createContext(initialState);

//Provider component = Fornece o state pros children components, que são todos que estão "dentro" dele no App.js
export const GlobalProvider = ( { children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    async function getCities() {
        let res;

        try {
            res = await axios.get('/api/cities/');

            dispatch({
                type: 'GET_CITIES',
                payload: res.data,
            })

        } catch (error) {
            
            console.log(error.response.data.error)
        }
    }

    async function getSized(formAns) {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
    
        try {
            const res = await axios.post('/api/off/', formAns, config);

            //dispatch() is the method used to dispatch actions and trigger state changes to the store
            dispatch({
                type: 'GET_ANSWER',
                payload: res.data,
                id: formAns.id,
                consum: formAns.consum,
            });

        } catch (error) {
            dispatch({
                type: 'ANSWER_ERROR',
                payload: error.response.data
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
                id: formAns.id,
                consum: formAns.consum,
            });

        } catch (error) {
            dispatch({
                type: 'ANSWER_ERROR',
                payload: error
            });
        }
    }

    const idUpdate = (newId) => 
    dispatch({
        type: "SET_CITYID",
        payload: newId
    })

    const loadUpdate = () => dispatch({ type: 'LOADING_UPDATE', })

    const comeBack = () => dispatch({ type: 'COMEBACK_BABY', })

    const updateResults = () => dispatch({type: 'UPDATE_RESULTS', })

    return (<GlobalContext.Provider value={{
        id: state.id,
        consum: state.consum,
        cities: state.cities,
        form: state.form,
        results: state.results,
        gotResults: state.gotResults,
        loading: state.loading,
        errors: state.errors,
        getSized, //chamar a action aqui pra usar nos componentes
        getOnSized,
        loadUpdate,
        idUpdate,
        getCities,
        comeBack,
        updateResults,
    }}>
        {children}
    </GlobalContext.Provider>);
}