import { createContext } from "react";

// createContext() always returns an obj that contains a React component. u can set a value inside that can be provided to other/multiple components. context can also be linked to state so that the other/multiple components can have access to the state as well easily.
export const CartContext = createContext({
    items: []
});  