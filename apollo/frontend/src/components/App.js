import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import { GlobalProvider } from '../../context/GlobalState';
import Form from './Form';

function App() {
    return (
        <GlobalProvider>
            <Form />
        </GlobalProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));