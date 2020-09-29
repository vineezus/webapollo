import React, { useContext, useEffect } from 'react';
import { ResultsItem } from './ResultsItem';

import { GlobalContext } from '../../context/GlobalState';

export const TransactionList = () => {
    const { results } = useContext(GlobalContext);

    return (
        <>
            <h3>Histórico</h3>
            <ul id="list" className="list">
                {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} /*passando o item de transação como prop*/ />))}
            </ul>
        </>
    )
}