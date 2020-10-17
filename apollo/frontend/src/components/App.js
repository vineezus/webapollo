import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalProvider } from '../../context/GlobalState';
import SizingArea from './SizingArea';

function App() {
    return (
        <GlobalProvider>
            <SizingArea />
        </GlobalProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));