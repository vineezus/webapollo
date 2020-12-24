import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalContext } from '../../context/GlobalState';

const Alerts = () => {

    const { errors } = useContext(GlobalContext);


    if (errors){
        Object.keys(errors).map((key, index) => (
            toast.error(`Erro: ${errors[key]}`)
        ))

    }
    
    return(
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
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