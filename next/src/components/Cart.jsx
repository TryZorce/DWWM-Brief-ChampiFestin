import { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import style from "../components/cart.module.css";
import { RiPriceTag2Fill } from "react-icons/ri";
import makeRequest from "@/utils/Fetcher";

function Cart({ products }) {
  const [cartProducts, setCartProducts] = useState(products);
  const [codes, setCodes] = useState([]);
  const [codeData, setCodeData] = useState({});
  const [promo, setPromo] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
    makeRequest({
      url: "http://localhost:8000/api/promotions",
      method: "get",
      data: ""
    }).then((data) => {
      setCodes(data);
    })
  }, [])

  const getPromotion = (value) => {
    return makeRequest({
      url: `http://localhost:8000/api/promotions?code=${value}`,
      method: "get",
      data: ""
    })
    .then((data) => {
      if (data.length > 0) {
        console.log("perfecto => ");
        console.log(data[0]);
        setCodeData(data[0]);
      } else {
        console.log("hubo un error");
      }
    })
    .catch((error) => {
      console.log("Error al obtener la promoción:", error);
    });
  };

  const applyPromoCode = () => {
    const inputPromo = document.querySelector("#promoCodeInput");
    const { value } = inputPromo;
    const match = value.match(/^[a-zA-Z0-9_.,;:!¡¿?@#"\'+&*-]+$/gm);
  
    if (match && match.length > 0) {
      const testCode = match[0];
  
      getPromotion(testCode) // Llamamos a getPromotion sin await
        .then(() => {
          console.log("listo pa");
  
          if (Object.keys(codeData).length > 0) {
            console.log(codeData);
            alert("Código válido");
          }
        })
        .catch((error) => {
          console.log("Error en applyPromoCode:", error);
        });
    } else {
      console.log("El código ingresado no es válido");
    }
    
    
    

    // const validCodes = [];
    // codes.forEach(code => {
    //   validCodes.push(code.code)
    // });
    // if(validCodes.includes(value) && value !== promo){
    //   setPromo(value);
    //   inputPromo.value = ""
    //   console.log("good");
    // }else if(!validCodes.includes(value)){
    //   setError("Invalid promo code!")
    //   console.log("bad");
    // }else{
    //   console.log("wtf bro");
    // }

  }

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

    // if(promo.trim() !== "") {
    //   getPromotion(promo);
    //   if(codeData.percentage){
    //     total -= total * codeData.value / 100
    //   }else{
    //     total -= codeData.value
    //   }
    // }
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
            <input type="text" placeholder="Code promo" id="promoCodeInput" /> <button onClick={applyPromoCode}><RiPriceTag2Fill /></button>
          </>
        )}
      </Panel>
    </div>
  );
}

export default Cart;
