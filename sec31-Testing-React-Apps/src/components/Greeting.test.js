import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

// we can group tests into test suites
describe('Greeting component', () => {  // 1st parameter: desc. of the category to which the tests belong. 2nd parameter: the actual tests. can have multiple tests per test suite
    test('renders Hello World as a text', () => {
        // Arrange
        render(<Greeting />)
    
        // Act
        // ...nothing
    
        // Assert
        const helloWorldElement = screen.getByText('Hello World', {exact: false});
        expect(helloWorldElement).toBeInTheDocument();
    })
})
