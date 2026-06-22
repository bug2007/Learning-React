import { render, screen } from '@testing-library/react';
import App from './App';

// 'npm test' to run the test

// test('renders learn react link', () => { // 1st argument: desc. of the test (upto us). 2nd arugment: contains the actual testing code
//   render(<App />);  // App is rendered on a virtual screen (simulated browser)
//   const linkElement = screen.getByText(/learn react/i);  // grabs an element from the virtual screen. identifying the element by the text that is rendered inside of it in a case insensitive way. it's a regular exp.
//   expect(linkElement).toBeInTheDocument();  // check if the element is actually in the actual document
// });
 