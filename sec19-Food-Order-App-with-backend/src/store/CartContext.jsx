import { createContext, useReducer } from "react";

const CartContext = createContext({  // no need to set this value here because we're gonna set it later anyway but u can give this value now for better autocompletion
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
})

function cartReducer(state, action) {   // we cud have used only useState inside the CartContextProvider component for state management but since the state logic is a bit complex, we're using useReducer which makes state management easier (it is used for state management purposes) and allows us to define a useReducer func outside the component
    if (action.type === 'ADD_ITEM') {
        // ...update the state to add a meal item
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)
        const updatedItems = [...state.items] // here, we will add the new item. we'll not change the original state 

        if (existingCartItemIndex > -1) {  // making sure the item is not already added in the items array
            const updatedItem = {
                ...state.items[existingCartItemIndex],
                quantity: state.items[existingCartItemIndex].quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({...action.item, quantity: 1})
        }

        return {...state, items: updatedItems}
    }

    
    if (action.type === 'REMOVE_ITEM') {
        // ...update the state to remove a meal item
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItem, 1)
        } else {
            const updatedItem = {...existingCartItem, quantity: existingCartItem.quantity - 1}
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {...state, items: updatedItems}
    }

    return state;
}

export function CartContextProvider({children}) {  // the CartContext is only about spreading the data (the value). It's not about changing any values, managing state, triggering component updates. Those will be done by the CartContextProvider 
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []})  // state: {items:[]}

    function addItem(item) {
        dispatchCartAction({type: 'ADD_ITEM', item})
    }

    function removeItem(id) {
        dispatchCartAction({type: 'REMOVE_ITEM', id})
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    }

    return <CartContext value={cartContext}>{children}</CartContext>
}

export default CartContext;