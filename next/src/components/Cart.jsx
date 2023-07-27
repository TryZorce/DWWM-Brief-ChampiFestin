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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const errorMessages = ["C'est une hallucination collective!", "Toi par contre t'as trop fumé mon reuf",
  "T'as les crampté?", "Apagnan", "Baguette is not happy with that", "Quoicoubeh", "Quoicoubaka", "Salade tomates oignons",
  "Dev full stack double écran", "Kebab Kebab", "Ouais c'est Greg", "Ouais c'est le fils de Greg", "Allô Bassem?", "Whesh Apex", "ça paye Simplon"]

  useEffect(() => {
    makeRequest({
      url: "http://localhost:8000/api/promotions",
      method: "get",
      data: ""
    }).then((data) => {
      setCodes(data);
    })
  }, [])

  const getPromotion = async (value) => {
    console.log(`http://localhost:8000/api/promotions?code=${value}`);
    return makeRequest({
      url: `http://localhost:8000/api/promotions?code=${value}`,
      method: "get",
      data: ""
    })
    .then((data) => {
      if (data.length > 0) {
        setError("");
        setCodeData(data[0]);
        if(data[0].percentage){
          setSuccess(`You have used the code ${data[0].code} successfully! You saved ${data[0].value}%`)
        }else {
          setSuccess(`You have used the code ${data[0].code} successfully! You saved ${data[0].value}€`)
        }
        
      } else if(value.toLowerCase() === "hitler" || value.toLowerCase() === "adolf" || value.toLowerCase() === "nazi") {
        setError("卐 NEIN NEIN NEIN NEIN 卐")
      }else {
        // Math.floor(errorMessages.length)
        
        setError(errorMessages[Math.floor(Math.random()*errorMessages.length)])
      }
    })
    .catch((error) => {
      console.log("Error al obtener la promoción:", error);
    });
  };

  useEffect(() => {
    calculateTotal()
  }, [codeData])

  const applyPromoCode = () => {
    const inputPromo = document.querySelector("#promoCodeInput");
    const { value } = inputPromo;
    const match = value.match(/^[a-zA-Z0-9_.,;:!¡¿?@#"\'+&*-]+$/gm);
  
    if (match !== null && match.length > 0) {
      const testCode = match[0];
  
      getPromotion(testCode)

    }else{
      setError("Wtf you're trying to do???")
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

    if(Object.keys(codeData).length > 0){

      if(codeData.percentage){
        console.log("c'est un pourcentage");
        total -= total * codeData.value / 100
      }else{
        console.log("c'est en euros => " + codeData.value);
        total -= codeData.value
      }
      
    }

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
            {
              success && (
                <p>{success}</p>
              )
            }
            {
              error && (
                <p>{error}</p>
              )
            }
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
