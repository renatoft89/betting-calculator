import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BettingCalculator from './Components/BettingCalculator';
import SurebetCalculator from './Components/SurebetCalculator';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<BettingCalculator />} />
                    <Route path="/surebet" element={<SurebetCalculator />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
