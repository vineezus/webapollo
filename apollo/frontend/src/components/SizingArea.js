import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState';
import Loader from 'react-loader-spinner';
import Form from './Form'
import Results from './Results'

const SizingArea = () => {

    const [onGrid, setOnGrid] = useState(0); // '0' => off-grid / '1' => on-grid
    
    const { gotResults } = useContext(GlobalContext);

        return (
            <div>
                {
                gotResults?
                <Results
                    onGrid={onGrid}
                    setOnGrid={setOnGrid}
                />
                :
                <React.Fragment>
                <Form
                    onGrid={onGrid}
                    setOnGrid={setOnGrid}
                />
                </React.Fragment>
                }
            </div>
        )
    }

export default SizingArea
