import { useState } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import style from "../components/cart.module.css";

function Cart({ products }) {
  const [cartProducts, setCartProducts] = useState(products);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  function removeProduct(productId) {
    const updatedCart = cartProducts.filter((product) => product.id !== productId);
    setCartProducts(updatedCart);
  }

  function calculateTotal() {
    let total = 0;
    cartProducts.forEach((product) => {
      total += product.price;
    });
    return total;
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCustomerInfo((prevCustomerInfo) => ({
      ...prevCustomerInfo,
      [name]: value,
    }));
  }

  function confirmOrder() {
    const orderMessage = `Thank you for your order, ${customerInfo.name}! Your order is confirmed. You can pick it up in 3 hours.`;
    alert(orderMessage);
    console.log("Customer Information:", customerInfo);
    console.log("Order Products:", cartProducts);

    setCustomerInfo({
      name: "",
      surname: "",
      email: "",
      phone: "",
    });
    setCartProducts([]);
  }

  return (
    <div className={style.cart}>
      <Panel header="Cart" className={style.panel}>
        {cartProducts.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className={style.productList}>
              {cartProducts.map((product) => (
                <li key={product.id} className={style.productItem}>
                  <span>{product.name}</span>
                  <span>{product.price} €</span>
                  <Button
                    label="Delete"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => removeProduct(product.id)}
                  />
                </li>
              ))}
            </ul>
            <div className={style.total}>
              <span>Total :</span>
              <span>{calculateTotal()} €</span>
            </div>
          </>
        )}
        <div className={style.customerInfo}>
          <h2>Customer Information</h2>
          <div className={style.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={customerInfo.surname}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
            />
          </div>
          <Button
            label="Confirm Order"
            className="p-button-success"
            onClick={confirmOrder}
          />
        </div>
      </Panel>
    </div>
  );
}

export default Cart;
