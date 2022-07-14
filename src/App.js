import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartIsShown, setcartIsShown] = useState(false);

  const hideCartHandler = () => {
    setcartIsShown(false);
  };

  const showCartHandler = () => {
    setcartIsShown(true);
  };

  return (
    <>
      {cartIsShown && (
        <Cart onHideCart={hideCartHandler} popupState={cartIsShown} />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
