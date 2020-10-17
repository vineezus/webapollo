import React, { useContext } from 'react';

//recebeu 'transaction' como prop da transactionList

const ResultsItem = ({result}) => {
    
    console.log(result)
    
    return (
        <li className='minus'>
            {result.id}: {result.text}
        </li>
    )
}

export default ResultsItem;