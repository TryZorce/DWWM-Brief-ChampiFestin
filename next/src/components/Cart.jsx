import { useState } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import style from "../components/cart.module.css";

function Cart({ products }) {
  const [cartProducts, setCartProducts] = useState(products);

  // Supprimer un produit du panier
  function removeProduct(productId) {
    const updatedCart = cartProducts.filter((product) => product.id !== productId);
    setCartProducts(updatedCart);
  }

  // Calculer le total du panier
  function calculateTotal() {
    let total = 0;
    cartProducts.forEach((product) => {
      total += product.price;
    });
    return total;
  }

  return (
    <div className={style.cart}>
      <Panel header="Mon Panier" className={style.panel}>
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
                    label="Supprimer"
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
      </Panel>
    </div>
  );
}

export default Cart;
