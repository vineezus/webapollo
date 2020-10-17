import { stringify } from 'postcss';
import { string } from 'prop-types';
import React, {useState, useContext} from 'react';
import { GlobalContext } from '../../context/GlobalState';
import './App.css';

const Form = ({onGrid}) => {
    const [textId, setTextID] = useState(0);
    const [consum, setConsum] = useState();
    console.log(onGrid)

    const { getSized, getOnSized } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        console.log(onGrid + "@submit")
        switch(onGrid){
            case 0:
                const formAns = {
                    config: {"mod": 50, "batt": 70, "ctr": 60},
                    id: Number(textId), 
                    consum: Number(consum)
                }
                
                getSized(formAns)

                break
            case 1:
                const formAnsOn = {
                    config: {"mod": 250},
                    id: Number(textId), 
                    consum: Number(consum)
                }
                
                getOnSized(formAnsOn)
        }
    
        setTextID()
        setConsum()
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Sua cidade</label>
                    <input type="number" value={textId} onChange={(e) => setTextID(e.target.value)} placeholder="Digite o id..."/>
                </div>
                <div className="form-control">
                    <label htmlFor="consum">Info de consumo</label>
                    <input type="number" value={consum} onChange={(e) => setConsum(e.target.value)} placeholder="Digite a info de consumo..."/>
                </div>
                <button className='btn'>Calcule</button>
            </form>
        </>
    )
}

export default Form;
