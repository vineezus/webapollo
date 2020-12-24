import React, { useContext, useState, useEffect } from 'react';
import ResultsItem from './ResultsItem';
import Drops from './Drops';

import { GlobalContext } from '../../context/GlobalState';

const Results = (props) => {

    const { results, comeBack, gotResults, loading, loadUpdate} = useContext(GlobalContext);

    useEffect(() => {
        //loadUpdate()
        console.log(loading+` @results`)
        console.log(gotResults+` @results`)
    }, [])

    if (gotResults){
        return (
            <>  
                {
                <React.Fragment>
                    <button className='back-btn' onClick={comeBack}>Voltar</button>
                    <Drops onGrid={props.onGrid}/>
                    <h3>Resultado</h3>
                    <ul id="list" className="list">
                        {results.map(result => (<ResultsItem key={result.id} result={result} />))}
                    </ul>
                </React.Fragment>
                }
            </>
        )
    }
    
}

export default Results;