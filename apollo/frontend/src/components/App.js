import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalProvider } from '../../context/GlobalState';
import SizingArea from './SizingArea';
import Sidebar from './Sidebar';
import FVPage from '../pages/FVPage';
import HowPage from '../pages/HowPage';
import About from '../pages/About';
import Charts from './Charts';
import Alerts from './Alerts';
import './style/App.css';

function App() {
    return (
        <GlobalProvider>
            <div className='appContainer'>
                <Router>
                    <Sidebar />
                    <Alerts />
                    <Switch>
                        <Route exact path="/" component={SizingArea}/>
                        <Route exact path="/how" component={HowPage}/>
                        <Route exact path="/fv" component={FVPage}/>
                        <Route exact path="/about" component={About}/>                    
                    </Switch>
                </Router>
            </div>
        </GlobalProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));