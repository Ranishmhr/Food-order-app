import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //checks if current item is in previous state
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); //Always return true (boolean value)

    //Returns the existing items from the index and set it to that item
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      //copy the existing item but update the amount
      const updatedItem = {
        ...existingCartItem, //contains one item only
        amount: existingCartItem.amount + action.item.amount, //updating the amount property
      };

      //contains all the list of items in the list
      //creates the new array
      updatedItems = [...state.items];

      //overwrite the old item in index with new value [updatedItem]
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //added for the new items
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    //checks if current item is in previous state
    //return true and index value
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    //storing the item of selected id through index
    const existingItem = state.items[existingCartItemIndex];

    //decreasing the amount of selected item from total amount
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      //filtering throught the list of items so that only the items is added
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      //updating the selected item amount
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      //copying all old items
      updatedItems = [...state.items];
      //updating the amount in selected item
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
