import React, { useContext, useState } from 'react';

const ResultsItem = ({result, setPbOpen, setPrOpen, setWOpen}) => {

    const openPr =  () => setPrOpen(true);
    const openPb =  () => setPbOpen(true);
    const openW =  () => setWOpen(true);

    switch (result.id) {
        case 'price':
            return (
                <div className={`${result.id}`} onClick={openPr}>
                    <h2>{result.text}</h2>
                    <label className="resultLabel">{result.label} </label>
                </div>
            )
            break;

        case 'weight':
            return (
                <div className={`${result.id}`} onClick={openW}>
                    <h2>{result.text}</h2>
                    <label className="resultLabel">{result.label} </label>
                </div>
            )
            break;

        case 'payback':
            return (
                <div className={`${result.id}`} onClick={openPb}>
                    <h2>{result.text}</h2>
                    <label className="resultLabel">{result.label} </label>
                </div>
            )
            break;
        
        case 'warnings':
            return (
                <></>
            )
            break;
    
        default:
            return (
                <div className={`${result.id}`}>
                    <h2>{result.text}</h2>
                    <label className="resultLabel">{result.label} </label>
                </div>
            )
            break;
    }
}

export default ResultsItem;