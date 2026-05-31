import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
// import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

// Thunk - an action creator func that does NOT return the action obj itself (e.g {type: 'some identifier'}) but instead another func which eventually returns the action. can be used to run async code or side effect code that we cant put in a reducer func. there r two place u can put the async or side effect code: in component (like we've done below before) or using thunks

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [])

  useEffect(() => {
    // const sendCartData = async () => {
      // dispatch(uiActions.showNotification({
      //   status: 'pending',
      //   title: 'Sending...',
      //   message: 'Sending cart data!'
      // }))
      // const response = await fetch('https://react-redux-app-4eee7-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',      // will create a new cart Node in database (firebase) and store the data there. PUT will not add the new data in a list of data unlike POST, instead will override the existing cart
      //   {method: 'PUT',
      //     body: JSON.stringify(cart)
      // }) 

      // if (!response.ok) {
      //   throw new Error('Sending cart data failed.')
      // }

      // dispatch(uiActions.showNotification({
      //   status: 'success',
      //   title: 'Success!',
      //   message: 'Sent cart data successfully!'
      // }))
    // }

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch(error => {
  //     // dispatch(uiActions.showNotification({
  //     //   status: 'error',
  //     //   title: 'Error!',
  //     //   message: 'Sending cart data failed!'
  //     // }))
  //   })

    if (isInitial) {
      isInitial =  false;
      return
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));  // redux will go ahead & execute the func returned by sendCartData() in cart-slice.js
    }

  }, [cart])   // so that this effect func reexecutes whenever the cart in our Redux store changes

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
