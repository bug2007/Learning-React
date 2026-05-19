import { createContext, useState } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products.js";

// createContext() always returns an obj that contains a React component. u can set a value inside that can be provided to other/multiple components. context can also be linked to state so that the other/multiple components can have access to the state as well easily.
export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},  // adding to get better auto-complete
    updateItemQuantity: () => {}  // to get better autocomplete
});   


export default function CartContextProvider({ children }) {
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
    });

    function handleAddItemToCart(id) {
        setShoppingCart((prevShoppingCart) => {
        const updatedItems = [...prevShoppingCart.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === id);
            updatedItems.push({
            id: id,
            name: product.title,
            price: product.price,
            quantity: 1,
            });
        }

        return {
            items: updatedItems,
        };
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        setShoppingCart((prevShoppingCart) => {
        const updatedItems = [...prevShoppingCart.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
        };
        });
    }

    const ctxValue = {
        items: shoppingCart.items,
        addItemToCart: handleAddItemToCart,  // exposing the func thru context
        updateItemQuantity: handleUpdateCartItemQuantity
    };

    return <CartContext value={ctxValue}>
        {children}
    </CartContext>
}