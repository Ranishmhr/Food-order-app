import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./Store/CartProvider";

function App() {
  const [cartIsShown, setcartIsShown] = useState(false);

  const hideCartHandler = () => {
    setcartIsShown(false);
  };

  const showCartHandler = () => {
    setcartIsShown(true);
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onHideCart={hideCartHandler} popupState={cartIsShown} />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
