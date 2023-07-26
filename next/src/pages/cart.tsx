import style from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart"; // Importez le composant Cart ici
import { SetStateAction, useState } from "react";
import ProductDetails from "../components/ProductDetails";

function Home() {
    // Utilisation du hook useState pour gérer l'état du produit sélectionné
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Supposons que vous ayez des données de produits pour tester
    const products = [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 20 },
        { id: 3, name: "Product 3", price: 15 },
    ];

    // Fonction de gestion de clic de produit pour mettre à jour l'état du produit sélectionné
    function handleProductClick(product: SetStateAction<null>) {
        setSelectedProduct(product);
    }

    return (
        <div className={style.container}>
            {/* Affichage du composant Navbar */}
            <Navbar />

            {/* Titre de la section panier */}
            <h1>Panier</h1>

            {/* Affichage du composant Cart avec les produits passés en props */}
            <Cart products={products} />

            {/* Affichage du composant ProductDetails si un produit est sélectionné */}
            {selectedProduct && <ProductDetails product={selectedProduct} />}
        </div>
    );
}

export default Home;
