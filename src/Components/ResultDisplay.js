import React from 'react';

const ResultDisplay = ({ result, profit }) => {
    return (
        <div className="result-display">
            <p>{result}</p>
            <p>{profit}</p>
        </div>
    );
};

export default ResultDisplay;
