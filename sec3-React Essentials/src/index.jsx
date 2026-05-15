import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App />);  // injects the App component into the root div in index.html. createRoot() sets the root div as the root of the react project.
