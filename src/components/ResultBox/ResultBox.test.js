import ResultBox from './ResultBox';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {formatAmountInCurrency} from './../../utils/formatAmountInCurrency';
  
describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={50} />);
    });

    const testCases = [
        { amount: 100, from: 'PLN', to: 'USD' },
        { amount: 20, from: 'USD', to: 'PLN' },
        { amount: 200, from: 'PLN', to: 'USD' },
        { amount: 345, from: 'USD', to: 'PLN' },
      ]; 

    
    for (const testObj of testCases)
    {
        it(`should render proper info about conversion when testObj.from -> testObj.to`, () => {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const result = screen.getByTestId('result');
            console.log(result.textContent)
            expect(result).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, testObj.from)} = ${formatAmountInCurrency(testObj.amount/3.5, testObj.to)}`.replace(/\u00a0/g, ' '));
            cleanup();
        });
    }
   
    //   it('should render proper info about conversion when USD -> PLN', () => {
    //     for (const testObj of testCases)
    //     {render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
    //     const result = screen.getByTestId('result');
    //     expect(result).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${formatAmountInCurrency(testObj.amount*3.5, 'PLN')}`.replace(/\u00a0/g, ' '));
    //     cleanup();
    // }
    // });
    // it('should render proper info about conversion when USD -> USD', () => {
    //     for (const testObj of testCases)
    //     {render(<ResultBox from="USD" to="USD" amount={testObj.amount} />);
    //     const result = screen.getByTestId('result');
    //     expect(result).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${formatAmountInCurrency(testObj.amount, 'USD')}`.replace(/\u00a0/g, ' '));
    //     cleanup();
    // }
    // });
    // it('should render proper info about conversion when PLN -> PLN', () => {
    //     for (const testObj of testCases)
    //     {render(<ResultBox from="PLN" to="PLN" amount={testObj.amount} />);
    //     const result = screen.getByTestId('result');
    //     expect(result).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${formatAmountInCurrency(testObj.amount, 'PLN')}`.replace(/\u00a0/g, ' '));
    //     cleanup();
    // }
    // });
});