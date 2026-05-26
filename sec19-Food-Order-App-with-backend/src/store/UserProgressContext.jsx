import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '', // '' if dont wanna show any modal, 'cart' if the user is viewing the cart or 'checkout' if the user is proceeding to the checkout page
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
})

export function UserProgressContextProvider({children}) {
    const [userProgress, setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    function hideCheckout() {
        setUserProgress('');
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (<UserProgressContext value={userProgressCtx}>{children}</UserProgressContext>)
}


export default UserProgressContext;