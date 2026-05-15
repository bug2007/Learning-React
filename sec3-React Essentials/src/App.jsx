// contains the html that we seeing on the screen. jsx = javascript syntax extension. allows to write html in js file.
// a component is really just a js function that retuns some jsx code.
import { useState } from "react";

import { CORE_CONCEPTS } from "./data.js";
import { EXAMPLES } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max+1));
}

function App() {
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
    <div>
      <Header></Header>
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {/* prop names are up to you */}
            {/* <CoreConcept 
              title={CORE_CONCEPTS[0].title} 
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image} /> */}
            {/* OR */}
            {/* <CoreConcept { ...CORE_CONCEPTS[0]} />
            <CoreConcept { ...CORE_CONCEPTS[1]} />
            <CoreConcept { ...CORE_CONCEPTS[2]} />
            <CoreConcept { ...CORE_CONCEPTS[3]} /> */}
            {/* OR */}
            {CORE_CONCEPTS.map((conceptItem) => <CoreConcept key={conceptItem.title} {...conceptItem} />)}  // key is a special prop that React uses to keep track of list items. it should be unique among siblings. here we can use title as key because its unique among the concepts.
          </ul>
        </section>
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
      </main>
    </div>
  );
}

export default App;
