import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState';
import Switch from 'react-input-switch';
import Form from './Form'
import Results from './Results'

const SizingArea = () => {

    const [onGrid, setOnGrid] = useState(0); // '0' => off-grid / '1' => on-grid

    const { getSized, gotResults, loading, form } =  useContext(GlobalContext);

        return (
            <div>
                {
                gotResults?
                <Results />
                :
                <React.Fragment>
                <label>Off-Grid</label>,
                <Switch on={1} off={0} value={onGrid} onChange={setOnGrid} />,
                <label>On-Grid</label>,
                <Form onGrid={onGrid}/>
                </React.Fragment>
                }
            </div>
        )
    }

export default SizingArea
