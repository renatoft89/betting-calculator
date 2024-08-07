import React, { useState } from 'react';
import '../Styles/SurebetCalculator.css';

const SurebetCalculator = () => {
    const [odd1, setOdd1] = useState('');
    const [odd2, setOdd2] = useState('');
    const [odd3, setOdd3] = useState('');
    const [betAmount, setBetAmount] = useState('');
    const [result, setResult] = useState('');
    const [profitableOdd, setProfitableOdd] = useState('');
    const [type, setType] = useState('double'); // 'double' or 'triple'
    const [stakes, setStakes] = useState([]);

    const calculateSurebet = () => {
        const odd1Value = parseFloat(odd1);
        const odd2Value = parseFloat(odd2);
        const odd3Value = type === 'triple' ? parseFloat(odd3) : null;
        const betAmountValue = parseFloat(betAmount);

        if (isNaN(odd1Value) || isNaN(odd2Value) || (type === 'triple' && isNaN(odd3Value)) || isNaN(betAmountValue)) {
            setResult('Por favor, insira valores válidos.');
            setProfitableOdd('');
            setStakes([]);
            return;
        }

        const surebetCondition = type === 'double'
            ? (1 / odd1Value + 1 / odd2Value)
            : (1 / odd1Value + 1 / odd2Value + 1 / odd3Value);

        if (surebetCondition < 1) {
            const profit = betAmountValue * (1 - surebetCondition);
            setResult(`Aposta lucrativa! Lucro esperado: R$ ${profit.toFixed(2)}`);

            // Cálculo das apostas proporcionais
            const totalStake = betAmountValue;
            const stake1 = totalStake / odd1Value / surebetCondition;
            const stake2 = totalStake / odd2Value / surebetCondition;
            const stake3 = type === 'triple' ? totalStake / odd3Value / surebetCondition : null;

            setStakes([
                { odd: odd1Value, stake: stake1.toFixed(2) },
                { odd: odd2Value, stake: stake2.toFixed(2) },
                ...(type === 'triple' ? [{ odd: odd3Value, stake: stake3.toFixed(2) }] : [])
            ]);
        } else {
            const requiredOdd = type === 'double'
                ? (1 / (1 - (1 / odd1Value + 1 / odd2Value))).toFixed(2)
                : (1 / (1 - (1 / odd1Value + 1 / odd2Value + 1 / odd3Value))).toFixed(2);
            setResult('Aposta não é lucrativa.');
            setProfitableOdd(`Para ser lucrativa, uma das odds deve ser pelo menos: ${requiredOdd}`);
            setStakes([]);
        }
    };

    return (
        <div className="surebet-calculator">
            <h1>Calculadora de Surebet</h1>
            <div className="input-field">
                <label>Odd 1:</label>
                <input type="number" value={odd1} onChange={(e) => setOdd1(e.target.value)} step="0.01" />
            </div>
            <div className="input-field">
                <label>Odd 2:</label>
                <input type="number" value={odd2} onChange={(e) => setOdd2(e.target.value)} step="0.01" />
            </div>
            {type === 'triple' && (
                <div className="input-field">
                    <label>Odd 3:</label>
                    <input type="number" value={odd3} onChange={(e) => setOdd3(e.target.value)} step="0.01" />
                </div>
            )}
            <div className="input-field">
                <label>Valor da Aposta (R$):</label>
                <input type="number" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} step="0.01" />
            </div>
            <div className="input-field">
                <label>Tipo de Aposta:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="double">Dupla Hipótese</option>
                    <option value="triple">Tripla Hipótese</option>
                </select>
            </div>
            <button className="calculate-button" onClick={calculateSurebet}>Calcular</button>
            <div className="result-display">
                <p>{result}</p>
                <p>{profitableOdd}</p>
                {stakes.length > 0 && (
                    <div className="stakes-display">
                        <h2>Montantes para Apostar:</h2>
                        <ul>
                            {stakes.map((stake, index) => (
                                <li key={index}>Odd {index + 1}: R$ {stake.stake}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SurebetCalculator;
