import React, {useState, useContext} from 'react';
import { GlobalContext } from '../../context/GlobalState';

const Form = () => {
    const [textId, setTextID] = useState();
    const [consum, setConsum] = useState();

    const { getSized } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const formAns = {
            id: +textId, 
            consum: +consum //maneira de converter a string em number
        }

        console.log(textId, consum, formAns)
        getSized(formAns)
        setTextID()
        setConsum()
    }

    return (
        <>
            <h3>Adicione nova transação</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Texto</label>
                    <input type="number" value={textId} onChange={(e) => setTextID(e.target.value)} placeholder="Digite o id..."/>
                </div>
                <div className="form-control">
                    <label htmlFor="consum"
                    >Quantia <br />
                    (Negativo = Despesa, Positivo = Entrada)
                    </label>
                    <input type="number" value={consum} onChange={(e) => setConsum(e.target.value)} placeholder="Digite a info de consumo..."/>
                </div>
                <button className='btn'>E lá vamos nós!</button>
            </form>
        </>
    )
}

export default Form;
