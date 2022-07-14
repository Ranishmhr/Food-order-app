import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const items = cartCtx.item;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartCtx.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes["button-alt"]}>
          Close
        </button>
        <button onClick={props.onHideCart} className={classes.button}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
