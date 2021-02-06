import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState';
import Loader from 'react-loader-spinner';
import Form from './Form'
import Results from './Results'

const SizingArea = () => {

    const [onGrid, setOnGrid] = useState(0); // '0' => off-grid / '1' => on-grid
    
    const { gotResults } = useContext(GlobalContext);

        return (
            <>
                {
                gotResults?
                <React.Fragment>
                    <div className="resultsContainer">
                        <Results
                            onGrid={onGrid}
                            setOnGrid={setOnGrid}
                        />
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <div className="container">
                        <Form
                            onGrid={onGrid}
                            setOnGrid={setOnGrid}
                        />
                    </div>
                </React.Fragment>
                }
            </>
        )
    }

export default SizingArea
