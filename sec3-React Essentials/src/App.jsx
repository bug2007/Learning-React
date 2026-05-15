// contains the html that we seeing on the screen. jsx = javascript syntax extension. allows to write html in js file.
// a component is really just a js function that retuns some jsx code.

import Header from "./components/Header/Header.jsx";
import CoreConcepts from "./components/CoreConcepts.jsx";
import Examples from "./components/Examples.jsx";

function genRandomInt(max) {
  return Math.floor(Math.random() * (max+1));
}

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;
