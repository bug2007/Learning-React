import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
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

    test('renders good to see you if the button was NOT clicked', () => {
        render(<Greeting />)

        const outputElement = screen.getByText('good to see you', {exact: false})
        expect(outputElement).toBeInTheDocument();
    });

    test('renders "Changed!" if the button was clicked', () => {
        // Arrange
        render(<Greeting />)

        // Act: simulate a user clicking a button
        const buttonElement = screen.getByRole('button')
        userEvent.click(buttonElement)

        // Assert
        const outputElement = screen.getByText('Changed!')
        expect(outputElement).toBeInTheDocument();
    })

    test('does not render "good to see you" if the button was clicked', () => {
        // Arrange
        render(<Greeting />)

        // Act
        const buttonElement = screen.getByRole('button')
        userEvent.click(buttonElement)

        // Assert
        const outputElement = screen.queryByText('good to see you', {exact: false}) // using getByText here wud throw an error as u cant 'get' the element with the 'good to see u' text if it disappears after the button is clicked. queryByText wud simply return null if the element isnt found
        expect(outputElement).toBeNull();
    })
})
