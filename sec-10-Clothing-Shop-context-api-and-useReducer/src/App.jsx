import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import CartContextProvider from './store/shopping-cart-context.jsx';

function App() {
  
  return (
    // wrap the context around the components that should be able to access the context. their child components will also be able to access. do provide the context value in value={{items: []}} (items array will remain empty that way), or link context to state like value={shoppingCart} if u wanna share state across multiple components, or ctxValue to share both state and state updating functions or properties from the App component with other components
    <CartContextProvider>  
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
