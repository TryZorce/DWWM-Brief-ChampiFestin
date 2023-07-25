import style from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart"; // Importez le composant Cart ici
import { SetStateAction, useState } from "react";
import ProductDetails from "../components/ProductDetails";

function Home() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Supposons que vous ayez des données de produits pour tester
    const products = [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 20 },
        { id: 3, name: "Product 3", price: 15 },
    ];

    function handleProductClick(product: SetStateAction<null>) {
        setSelectedProduct(product);
    }

    return (
        <div className={style.container}>
            <Navbar />
            <h1>Panier</h1>
            {/* Utilisez le composant Cart et passez les produits en tant que prop */}
            <Cart products={products} />
            {selectedProduct && <ProductDetails product={selectedProduct} />}
        </div>
    );
}

export default Home;
