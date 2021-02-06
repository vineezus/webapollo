import React, { useContext } from 'react';

const ResultsItemOn = ({result, setPbOpen, setPrOpen, setWOpen}) => {
    
    switch (result.id) {
        case 'price':
            return (
                <div className={`${result.id}-on`} onClick={() => setPrOpen(true)}>
                    <h2>{result.text}</h2>
                    <label className="resultLabel">{result.label} </label>
                </div>
            )
            break;

        case 'weight':
            return (
                <div className={`${result.id}-on`} onClick={() => setWOpen(true)}>
                    <h2>{result.text}</h2>
                    <label className="resultLabel">{result.label} </label>
                </div>
            )
            break;

        case 'payback':
            return (
                <div className={`${result.id}-on`} onClick={() => setPbOpen(true)}>
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
                <div className={`${result.id}-on`}>
                    <h2>{result.text}</h2>
                    <label className="resultLabel">{result.label} </label>
                </div>
            )
            break;
    }
}

export default ResultsItemOn;