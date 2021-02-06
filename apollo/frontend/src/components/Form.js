import React, {useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import Switch from 'react-input-switch';
import Loader from 'react-loader-spinner';
import AutoSug from './AutoSug';
import style from './style/AutoSug.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const Form = (props) => {
    //const [cityId, setCityId] = useState()
    const [consum, setConsum] = useState();

    const { getSized, getOnSized, getCities, id, loading, loadUpdate } = useContext(GlobalContext);

    useEffect(() => {
        console.log(loading+` @form`)
    }, [])


    const onSubmit = e => {
        e.preventDefault();

        loadUpdate()
        
        switch(props.onGrid){
            case 0:
                const formAns = {
                    config: {"mod": 50, "batt": 70, "ctr": 30},
                    id: Number(id), 
                    consum: Number(consum)
                }
                
                getSized(formAns)
                break

            case 1:
                const formAnsOn = {
                    config: {"mod": 250},
                    id: Number(id), 
                    consum: Number(consum)
                }
                
                getOnSized(formAnsOn)
                break
            }
    
        getCities()
    }

    return (
        <>
            {
            loading?
            <Loader type="Oval" color="#ff8800f6" height={50} width={50} />
            :
            <React.Fragment>
                <div className="switch">
                    <label>Off-Grid</label>
                    <Switch on={1} off={0} value={props.onGrid} onChange={props.setOnGrid}/>
                    <label>On-Grid</label>
                </div>
                <form className='form' onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="text">Sua cidade</label>
                        <AutoSug theme={style}/>
                    </div>
                    <div>
                        <label htmlFor="consum">Info de consumo</label>
                        <input className='input' type="number" 
                        onGrid={props.onGrid}
                        value={consum}
                        onChange={(e) => setConsum(e.target.value)}
                        placeholder={props.onGrid>0? 'Demanda mensal consumo  (kWh)' : 'Demanda diária de consumo (W)'}/>
                    </div>
                    <button className='btn'>Calcule</button>
                </form>
            </React.Fragment>
            }
        </>
    )
}

export default Form;
