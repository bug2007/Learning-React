import { useState } from "react";
import TabButton from "./TabButton.jsx";
import { EXAMPLES } from "../data.js";

export default function Examples() {
    const [ selectedTopic, setSelectedTopic ] = useState(); // useState returns an array. state is what React uses to store data that can change over time. when state changes, React re-renders the component which is important to update the UI with the newly changed data as without state inside a component, React will render the component only once by default and wont update the UI even if data changes.

    function handleSelect(selectedButton) {
        setSelectedTopic(selectedButton);
    }

    let tabContent = <p>Please select a topic.</p>;

    if (selectedTopic) {
        tabContent = (
        <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
            <code>{EXAMPLES[selectedTopic].code}</code>
            </pre>
        </div>
        );
    }

    return (
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            {/* prop names are up to you */}
            <TabButton isSelected={selectedTopic === 'components'} onSelect={() => handleSelect('components')}>Components</TabButton>
            <TabButton isSelected={selectedTopic === 'jsx'} onSelect={() => handleSelect('jsx')}>JSX</TabButton>
            <TabButton isSelected={selectedTopic === 'props'} onSelect={() => handleSelect('props')}>Props</TabButton>
            <TabButton isSelected={selectedTopic === 'state'} onSelect={() => handleSelect('state')}>State</TabButton>
          </menu>
          {tabContent}
        </section>
    );
}