import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalContext } from '../../context/GlobalState';

const Alerts = () => {

    const { errors, gotResults, results } = useContext(GlobalContext);

    if (errors){
        Object.keys(errors).map((key, index) => (
            toast.error(`Erro: ${errors[key]}`)
        ))
    }

    if (gotResults){
        const wArray = results.filter(res => res.id === "warnings")[0]
        const warning = wArray.text

        if (warning){
            toast.warning(`Atenção: ${warning}`)
        }
    }

    return(
        <ToastContainer
            position="bottom-right"
            autoClose={7500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    )
}

export default Alerts;