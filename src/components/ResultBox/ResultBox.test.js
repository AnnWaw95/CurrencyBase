import ResultBox from './ResultBox';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {formatAmountInCurrency} from './../../utils/formatAmountInCurrency';
  
describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={50} />);
        cleanup();
    });

    const testCases = [
        { amount: 100, from: 'PLN', to: 'USD' },
        { amount: 20, from: 'USD', to: 'PLN' },
        { amount: 200, from: 'PLN', to: 'USD' },
        { amount: 345, from: 'USD', to: 'PLN' },
      ]; 

    const testCasesBelowZero = [
        { amount: '-1', from: 'PLN', to: 'USD' },
        { amount: '-50', from: 'USD', to: 'PLN' },
        { amount: '-100', from: 'PLN', to: 'USD' },
        { amount: '-200', from: 'USD', to: 'PLN' },
      ];

    
    for (const testObj of testCases)
    {
        it('should render proper info about conversion when PLN -> USD', () => {
            render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
            const result = screen.getByTestId('result');
            expect(result).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${formatAmountInCurrency(testObj.amount/3.5, 'USD')}`.replace(/\u00a0/g, ' '));
            cleanup();
        });
    }

   for (const testObj of testCases)
    {
        it('should render proper info about conversion when USD -> PLN', () => {
            render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
            const result = screen.getByTestId('result');
            expect(result).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${formatAmountInCurrency(testObj.amount*3.5, 'PLN')}`.replace(/\u00a0/g, ' '));
            cleanup();
        
        });
    }

    for (const testObj of testCases)
    {
        it('should render proper info about conversion when USD -> USD', () => {
        render(<ResultBox from="USD" to="USD" amount={testObj.amount} />);
        const result = screen.getByTestId('result');
        expect(result).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${formatAmountInCurrency(testObj.amount, 'USD')}`.replace(/\u00a0/g, ' '));
        cleanup();
        });
    }

    for (const testObj of testCases)
    {
        it('should render proper info about conversion when PLN -> PLN', () => {
        render(<ResultBox from="PLN" to="PLN" amount={testObj.amount} />);
        const result = screen.getByTestId('result');
        expect(result).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${formatAmountInCurrency(testObj.amount, 'PLN')}`.replace(/\u00a0/g, ' '));
        cleanup();
        });
    }  

    for (const testObj of testCasesBelowZero)
    {
        it('should render proper info if value less then zero', () => {
        render(<ResultBox from={testObj.from} to={testObj.to} amount={Number(testObj.amount)} />);
        const result = screen.getByTestId('result');
        expect(result).toHaveTextContent('Wrong value');
        cleanup();
        });
    }   
});