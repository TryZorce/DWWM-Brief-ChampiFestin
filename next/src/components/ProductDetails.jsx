import { Panel } from "primereact/panel";
import { Rating } from "primereact/rating";
import { useState } from "react";
import { Button } from "primereact/button";
import style from "../components/productDetail.module.css";

function ProductDetails({ product, onAddToCart }) {
  const [ratingValue, setRatingValue] = useState(product.rating);

  const handleChange = (e) => {
    setRatingValue(e.value);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <Panel header={product.name} className={`${style.productDetails} ${style.holographicEffect}`}>
      <div className={style.productImage}>
        <img
          src={"http://localhost:8000/uploads/images" + product.image}
          alt={product.name}
        />
      </div>
      <div className={style.productInfo}>
        <h1 className={style.productName}>{product.name}</h1>
        <Rating
          value={ratingValue}
          onChange={handleChange}
          stars={5}
          cancel={false}
        />
        <p className={style.productDescription}>{product.description}</p>
        <div className={style.productPrice}>
          <i className="pi pi-tag"></i>
          <span className={style.priceLabel}>Price:</span>
          <span className={style.priceValue}>{product.price} €</span>
        </div>
        <div className={style.productCategories}>
          <span className={style.categoryLabel}>Category:</span>
          {product.category.map((category) => (
            <span key={category.id} className={style.category}>
              {category.name}
            </span>
          ))}
        </div>
        <Button
          label="Add to Cart"
          className={style.addToCartButton}
          onClick={handleAddToCart}
        />
      </div>
    </Panel>
  );
}

export default ProductDetails;
