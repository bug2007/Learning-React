import { createContext, useState, useReducer } from "react";  // useReducer reduces one or more complex values to a simpler one for state management purposes. can use it in any React component that needs state

import { DUMMY_PRODUCTS } from "../dummy-products.js";

// createContext() always returns an obj that contains a React component. u can set a value inside that can be provided to other/multiple components. context can also be linked to state so that the other/multiple components can have access to the state as well easily.
export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},  // adding to get better auto-complete
    updateItemQuantity: () => {}  // to get better autocomplete
});   

function shoppingCartReducer(state, action) { // here, state is guaranteed to be the latest state snapshot of the state that's managed by useReducer()
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
            id: action.payload,
            name: product.title,
            price: product.price,
            quantity: 1,
            });
        }

        return {
            items: updatedItems,
        };
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
        };
    }
    return state;   // return the updated state
}

export default function CartContextProvider({ children }) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {items:[]}); // 1st one is a variable, 2nd one isn't a state updating func. shoppingCartReducer is the required reducer func. {items:[]} is the initial state for the reducer. will be received by the function outside

    function handleAddItemToCart(id) {
        shoppingCartDispatch({   // this object will be passed to action
            type: 'ADD_ITEM',
            payload: id
        })
    }

    function handleUpdateCartItemQuantity(productId, amount) {
       shoppingCartDispatch({
        type: 'UPDATE_ITEM',
        payload: {
            productId,  // same as productId: productId
            amount
        }
       })
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,  // exposing the func thru context
        updateItemQuantity: handleUpdateCartItemQuantity
    };

    return <CartContext value={ctxValue}>
        {children}
    </CartContext>
}