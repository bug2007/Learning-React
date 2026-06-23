import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe('Async component', () => {
    test('renders posts if request succeeds', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({  // using a mock func instead of sending a real http req: overrode built-in fetch() with dummy fetch()
            json: async () => [{id: 'p1', title: 'First post'}]  // setting the value that the promise from fetch() shud return. simulating the success case
        })
        render(<Async />)

        const listItemElements = await screen.findAllByRole('listitem'); // returns an arr of all <li> elements. using getAllByRole will instantly look for <li> elements, but we r sending an http req to fetch the posts and it will take time, so this will throw an error. instead, findByRole returns a promise, waiting for the http req to succeed. by default, test will fail if the results arent on the screen wihtin 1s (u can change that in a 3rd argument). then when they are, the test revaluates and passes. note that sending http reqs in tests is not ideal tho, so 2 approaches r either dont send req or send it to a fake server
        expect(listItemElements).not.toHaveLength(0); // if length is 0, no posts were fetched and as a result, this test will fail
    })
})