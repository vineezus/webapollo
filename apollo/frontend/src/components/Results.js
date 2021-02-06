import React, { useContext, useState, useEffect } from 'react';
import ResultsItem from './ResultsItem';
import ResultsItemOn from './ResultsItemOn';
import Drops from './Drops';
import PopPayback from './popups/PaybackPop';
import PopWeight from './popups/WeightPop';
import PopPrice from './popups/PricePop';

import { GlobalContext } from '../../context/GlobalState';

const Results = (props) => {
    const [openPb, setPbOpen] = useState(false);
    const [openPr, setPrOpen] = useState(false);
    const [openW, setWOpen] = useState(false);

    const { results, comeBack, gotResults, loading, loadUpdate} = useContext(GlobalContext);

    /*useEffect(() => {
        //loadUpdate()
        console.log(loading+` @results`)
        console.log(gotResults+` @results`)
    }, [])*/

    if (gotResults){
        return (
            <>  
                {
                <React.Fragment>
                    <button className='back-btn' onClick={comeBack}>Voltar</button>
                    <div className='switch'>
                        <Drops onGrid={props.onGrid}/>
                    </div>
                    <h3>Resultado</h3>
                    {
                        props.onGrid>0?
                        <div className="resultsGrid-on">
                        {results.map(result => (<ResultsItemOn
                            key={result.id}
                            result={result}
                            setPbOpen={setPbOpen}
                            setPrOpen={setPrOpen}
                            setWOpen={setWOpen}
                            />
                            ))}
                        </div>
                        :
                        <div className="resultsGrid">
                        {results.map(result => (<ResultsItem
                            key={result.id}
                            result={result}
                            setPbOpen={setPbOpen}
                            setPrOpen={setPrOpen}
                            setWOpen={setWOpen}
                            />
                            ))}
                        </div>
                    }
                    <PopPayback open={openPb} setPbOpen={setPbOpen}/>
                    <PopPrice open={openPr} setPrOpen={setPrOpen}/>
                    <PopWeight open={openW} setWOpen={setWOpen}/>
                </React.Fragment>
                }
            </>
        )
    }
    
}

export default Results;