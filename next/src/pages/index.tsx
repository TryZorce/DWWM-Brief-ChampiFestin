import style from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import PromoStrip from "../components/PromoStrip";
import { Carousel } from "primereact/carousel";
import Image from "next/image";
import { SetStateAction, useState, useEffect, useRef } from "react";
import ProductDetails from "../components/ProductDetails";
import makeRequest from "@/utils/Fetcher";
import {Messages} from "primereact/messages";
import { Skeleton } from 'primereact/skeleton';

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const productDetailsRef = useRef(null);
  const [loading, setLoading] = useState(true);
  

  const msgs = useRef(null);

    

  useEffect(() => {
    makeRequest({
      method: "get",
      url: "http://localhost:8000/api/products",
      data: "",
    }).then((data) => {
      const availableProducts = data.filter((product) => product.available);
      setProducts(availableProducts);
      setLoading(false);
    });
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  function handleProductClick(product) {
    setSelectedProduct(product);
    scrollToProductDetails();
  }

  function handleAddToCart(product) {
    let cartItems = localStorage.getItem("cartItems");
    if (!cartItems) {
      cartItems = [];
    } else {
      cartItems = JSON.parse(cartItems);
    }
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // alert("Le produit a été ajouté au panier !");
    msgs.current.show(
          { sticky: false, severity: 'success', summary: 'Nice', detail: 'Added to cart!', closable: true }
      );
    
  }

  function handleCategoryFilter(category) {
    if (category.name === "Tous les produits") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  }

  function scrollToProductDetails() {
    if (productDetailsRef.current) {
      productDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function productTemplateSkeleton(product) {
    return (
      <div
        className={`${style.product} m-5 bg-bluegray-900 shadow-1 border-round-xl`}
        
      >
        <div className={`p-2 m-4 bg-bluegray-900 ${style.content}`}>
          <div
            className={`content-image bg-cover bg-no-repeat bg-center relative ${style.contentImage}`}
          >
            <div className={style.imageContainer}>
              {/* <Image
                src={"http://localhost:8000/uploads/images" + product.image}
                alt=""
                fill={true}
                objectPosition="relative"
                className={`${style.image} border-round-xl shadow-1`}
              /> */}
              <Skeleton width="100%" height="auto"></Skeleton>
            </div>
          </div>
          <div
            className={`rating mt-1 absolute border-round-sm ml-1 p-2 bg-gray-800	flex align-items-center gap-2 w-8rem ${style.rating}`}
          >
            <i className="pi pi-star-fill text-yellow-400"></i>
            <i className="pi pi-star-fill text-yellow-400"></i>
            <i className="pi pi-star-fill text-yellow-400 "></i>
            <i className="pi pi-star-fill text-gray-600"></i>
            <i className="pi pi-star-fill text-gray-600"></i>
          </div>
        </div>
        <div className={`content-info pt-1 ${style.contentInfo}`}>
          <div
            className={`flex align-items-center justify-content-between py-2 px-3 ${style.infoHeader}`}
          >
            <span className="font-semibold text-gray-400"><Skeleton width="20px" height="5px"></Skeleton></span>
            <i className="pi pi-verified text-green-400"></i>
          </div>

          
          <div
            className={`flex align-items-center justify-content-center pt-2 px-3 gap-2 ${style.buttonRow}`}
          >
            
              <Skeleton width="10rem" height="4rem" className={`p-3 flex align-items-center justify-content-center w-7 gap-2 bg-purple-600 shadow-1 border-none cursor-pointer hover:bg-purple-400 transition-duration-200 ${style.contactButton}`}></Skeleton>
              {/* <i className="pi pi-send text-gray-300"></i> */}
              <Skeleton width="10rem" height="4rem" className={`p-3 flex align-items-center justify-content-center w-7 gap-2 bg-purple-600 shadow-1 border-none cursor-pointer hover:bg-purple-400 transition-duration-200 ${style.contactButton}`}></Skeleton>

            
          </div>
        </div>
      </div>
    );
  }

  function productTemplate(product) {
    return (
      <div
        className={`${style.product} m-5 bg-bluegray-900 shadow-1 border-round-xl`}
        
      >
        <div className={`p-2 m-4 bg-bluegray-900 ${style.content}`}>
          <div
            className={`content-image bg-cover bg-no-repeat bg-center relative ${style.contentImage}`}
          >
            <div className={style.imageContainer}>
              <Image
                src={"http://localhost:8000/uploads/images" + product.image}
                alt=""
                fill={true}
                objectPosition="relative"
                className={`${style.image} border-round-xl shadow-1`}
              />
            </div>
          </div>
          <div
            className={`rating mt-1 absolute border-round-sm ml-1 p-2 bg-gray-800	flex align-items-center gap-2 w-8rem ${style.rating}`}
          >
            <i className="pi pi-star-fill text-yellow-400"></i>
            <i className="pi pi-star-fill text-yellow-400"></i>
            <i className="pi pi-star-fill text-yellow-400 "></i>
            <i className="pi pi-star-fill text-gray-600"></i>
            <i className="pi pi-star-fill text-gray-600"></i>
          </div>
        </div>
        <div className={`content-info pt-1 ${style.contentInfo}`}>
          <div
            className={`flex align-items-center justify-content-between py-2 px-3 ${style.infoHeader}`}
          >
            <span className="font-semibold text-gray-400">{product.name}</span>
            <i className="pi pi-verified text-green-400"></i>
          </div>

          <div
            className={`flex align-items-center justify-content-between py-2 px-3 gap-2 ${style.infoRow}`}
          >
            {product.category.map((cat) => (
              <div key={cat.id} className="flex align-items-center gap-2">
                <i className="pi pi-star-fill "></i>
                <span className="font-small text-gray-600 white-space-nowrap">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
          <div
            className={`flex align-items-center justify-content-center pt-2 px-3 gap-2 ${style.buttonRow}`}
          >
            <button
              className={`p-3 flex align-items-center justify-content-center w-7 gap-2 bg-purple-600 shadow-1 border-none cursor-pointer hover:bg-purple-400 transition-duration-200 ${style.contactButton}`}
              onClick={() => handleProductClick(product)}>
              <span className="font-semibold text-white-300 white-space-nowrap">
                View Details
              </span>
              {/* <i className="pi pi-send text-gray-300"></i> */}
            </button>

            <button
              className={`p-3 flex align-items-center justify-content-center w-7 gap-2 bg-purple-600 shadow-1 border-round cursor-pointer hover:bg-purple-400 transition-duration-200 ${style.contactButton}`}
              onClick={() => handleAddToCart(product)}>
              <span className="font-semibold text-white-300 white-space-nowrap">
              Add to Cart
              </span>
              <i className="pi pi-send text-gray-300"></i>
            </button>

            <div className="p-3 flex align-items-center justify-content-center w-7 gap-2 bg-purple-600 shadow-1 border-round">
              <span className="font-bold">{product.price} €</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.category.some((cat) => cat.name === selectedCategory.name)
      )
    : products;

  const categories = [
    { id: 0, name: "Tous les produits" },
    { id: 1, name: "Enchanterelles" },
    { id: 2, name: "Célestiflores" },
    { id: 3, name: "Sylvalunaires" },
    { id: 4, name: "Ombraethérique" },
    { id: 5, name: "Chronospires" },
  ];

  return (
    <div>
      <Navbar />
      <PromoStrip />
      <Messages ref={msgs} />
      <div>
        <ul className={style.categoryContainer}>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryFilter(category)}
              className={`${style.categoryItem} ${
                selectedCategory && selectedCategory.id === category.id
                  ? "active"
                  : ""
              }`}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={style.carousel}>
      {
        loading && (
          <Carousel
          value={[<Skeleton width="10rem" height="4rem"></Skeleton>, <Skeleton width="10rem" height="4rem"></Skeleton>, <Skeleton width="10rem" height="4rem"></Skeleton>]}
          numVisible={3}
          numScroll={3}
          itemTemplate={productTemplateSkeleton}
          className={style.carouselContainer}
          responsiveOptions={responsiveOptions}
          prevIcon={<i className="pi pi-chevron-left"></i>}
          nextIcon={<i className="pi pi-chevron-right"></i>}
        />
          
        )
      }
      {
        !loading && (
          
        <Carousel
          value={filteredProducts}
          numVisible={3}
          numScroll={3}
          itemTemplate={productTemplate}
          className={style.carouselContainer}
          responsiveOptions={responsiveOptions}
          prevIcon={<i className="pi pi-chevron-left"></i>}
          nextIcon={<i className="pi pi-chevron-right"></i>}
        />
        
      
        )
      }
      </div>
      
      <div ref={productDetailsRef}>
        {selectedProduct && (

            <ProductDetails product={selectedProduct} onAddToCart={handleAddToCart} />
          )}
        </div>
      </div>
    );
  }
  
  export default Home;