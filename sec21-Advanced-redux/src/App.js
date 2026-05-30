import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    fetch('https://react-redux-app-4eee7-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',      // will create a new cart Node in database (firebase) and store the data there. PUT will not add the new data in a list of data unlike POST, instead will override the existing cart
      {method: 'PUT',
        body: JSON.stringify(cart)
      }) 
  }, [cart])   // so that this effect func reexecutes whenever the cart in our Redux store changes

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
