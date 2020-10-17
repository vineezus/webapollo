import React, { useContext, useEffect } from 'react';
import ResultsItem from './ResultsItem';

import { GlobalContext } from '../../context/GlobalState';

const Results = () => {

    const { gotResults, results } = useContext(GlobalContext);

    if (gotResults){
        return (
            <>
                <h3>Resultado</h3>
                <ul id="list" className="list">
                    {results.map(result => (<ResultsItem key={result.id} result={result} />))}
                </ul>
            </>
        )
    }
    
}

export default Results;