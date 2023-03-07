import React from "react";
import "../styles/Cart.css";

const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  const cartItems = cart.map((item) => (
    <div key={item.id} className="cart_items_container">
      <div className="info_container">
        <h1>{item.title}</h1>
        <h3>
          {item.price} $ {item.quantity}x
        </h3>
      </div>
      <div className="action_container">
        <p>Total: {parseFloat(item.price * item.quantity).toFixed(2)} $</p>
        <button
          className="trash_btn"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  ));

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePurchase = () => {
    localStorage.removeItem("cart");
    alert("Thank you for your purchase!");
    window.location.reload();
  };

  return (
    <div className="cart_container">
      <h2>CART</h2>
      {cartItems.length ? (
        <>
          {cartItems}
          <h3 className="total_h3">
            Total Cart: {parseFloat(total).toFixed(2)} $
          </h3>
          <button className="purchase-button" onClick={handlePurchase}>
            Purchase
          </button>
        </>
      ) : (
        <div className="cart_empty">
          <p>Your cart is empty</p>
          <i className="fa-sharp fa-solid fa-cart-shopping"></i>
          <div className="purchase_container">
            <button className="purchase-button" disabled>
              Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
