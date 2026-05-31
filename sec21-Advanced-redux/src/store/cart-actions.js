import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

// Thunk to send data to database & store there
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const sendRequest = async() => {
            const response = await fetch('https://react-redux-app-4eee7-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',      // will create a new cart Node in database (firebase) and store the data there. PUT will not add the new data in a list of data unlike POST, instead will override the existing cart
                {method: 'PUT',
                body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity})
            }) 

            if (!response.ok) {
                throw new Error('Sending cart data failed.')
            }
        }    

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!'
            }))
        } catch(error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }))
        }    
    }
}

// Another thunk to fetch data from database and load them when the app starts
export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async() => {
            const response = await fetch('https://react-redux-app-4eee7-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json')

            if (!response.ok) {
                throw new Error('Could not fetch cart data!')
            }

            const data = await response.json();

            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!'
            }))
        }
    }
}