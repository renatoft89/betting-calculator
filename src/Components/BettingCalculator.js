import React, { useState } from 'react';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import Button from './Button';
import '..//Styles/BettingCalculator.css';

const BettingCalculator = () => {
    const [bankroll, setBankroll] = useState('');
    const [odd, setOdd] = useState('');
    const [units, setUnits] = useState(100); // Default value of 100 units
    const [recommendedUnits, setRecommendedUnits] = useState(100); // Default value of 100 units
    const [result, setResult] = useState('');
    const [profit, setProfit] = useState('');

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const calculateUnits = () => {
        try {
            const bankrollValue = parseFloat(bankroll.replace(/[^\d.-]/g, ''));
            const oddValue = parseFloat(odd);
            const unitsValue = parseInt(units);

            if (isNaN(bankrollValue) || isNaN(oddValue) || isNaN(unitsValue)) {
                setResult('Por favor, insira valores válidos.');
                setProfit('');
                return;
            }

            const unitValue = bankrollValue / unitsValue;
            const recommendedBet = unitValue / (oddValue - 1);
            const expectedProfit = recommendedBet * (oddValue - 1);

            setResult(`Valor de Cada Unidade: ${formatCurrency(unitValue)}\nAposta Recomendada: ${formatCurrency(recommendedBet)}`);
            setProfit(`Lucro Esperado: ${formatCurrency(expectedProfit)}`);
        } catch (error) {
            setResult('Por favor, insira valores válidos.');
            setProfit('');
        }
    };

    const calculateRecommendedUnits = () => {
        try {
            const bankrollValue = parseFloat(bankroll.replace(/[^\d.-]/g, ''));
            if (isNaN(bankrollValue) || bankrollValue <= 0) {
                setRecommendedUnits('Por favor, insira um valor válido para a banca.');
                return;
            }
            const recommendedUnits = Math.floor(bankrollValue / (bankrollValue * 0.01));
            setRecommendedUnits(recommendedUnits);
        } catch (error) {
            setRecommendedUnits('Por favor, insira um valor válido para a banca.');
        }
    };

    return (
        <div className="calculator">
            <h1>Calculadora de Unidades para Apostas</h1>
            <InputField label="Valor da Banca (R$):" value={bankroll} onChange={(e) => setBankroll(e.target.value)} />
            <Button onClick={calculateRecommendedUnits} text="Calcular Unidades Recomendadas" />
            <p>Unidades Recomendadas: {recommendedUnits}</p>
            <InputField label="Odd:" value={odd} onChange={(e) => setOdd(e.target.value)} />
            <InputField label="Número de Unidades:" value={units} onChange={(e) => setUnits(e.target.value)} />
            <Button onClick={calculateUnits} text="Calcular" />
            <ResultDisplay result={result} profit={profit} />
        </div>
    );
};

export default BettingCalculator;
