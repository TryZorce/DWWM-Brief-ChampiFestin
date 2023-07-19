import style from "../styles/Home.module.css";
import SearchBar from "../components/SearchBar";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import Image from "next/image";
function Home() {
  const responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];
  function productTemplate(product) {
    return (
      <div className={style.product}>
        <div className={`p-2 m-8 border-round-xl bg-bluegray-900 ${style.content}`}>
          <div
            className={`content-image bg-cover bg-no-repeat bg-center relative ${style.contentImage}`}
          >
            <div className={style.imageContainer}>
          <Image src="/media/Leonardo_Diffusion_Hyper_realistic_of_hallucinogenic_mushrooms_0.jpg" alt="" fill={true} objectPosition="relative" className={style.image}/>
            </div>
            <div className={`rating mt-2 absolute border-round-sm ml-2 p-2 bg-white flex align-items-center gap-2 opacity-90 w-8rem ${style.rating}`}>
              <i className="pi pi-star-fill text-gray-900"></i>
              <i className="pi pi-star-fill text-gray-900"></i>
              <i className="pi pi-star-fill text-gray-900 "></i>
              <i className="pi pi-star-fill text-gray-600"></i>
              <i className="pi pi-star-fill text-gray-600"></i>
            </div>
          </div>
          <div className={`content-info pt-1 ${style.contentInfo}`}>
            <div className={`flex align-items-center justify-content-between py-2 px-3 ${style.infoHeader}`}>
              <span className="font-medium text-gray-600">Night Mushroom</span>
              <i className="pi pi-verified text-gray-600"></i>
            </div>
            <div className={`flex align-items-center justify-content-between py-2 px-3 gap-2 ${style.infoRow}`}>
              <div className="flex align-items-center gap-2">
                <i className="pi pi-star-fill "></i>
                <span className="font-small text-gray-600 white-space-nowrap">Dark Type</span>
              </div>
              <div className="flex align-items-center gap-2">
                <i className="pi pi-star-fill "></i>
                <span className="font-small text-gray-600 white-space-nowrap">Smooth</span>
              </div>
            </div>
            <div className={`flex align-items-center justify-content-between py-2 px-3 gap-2 ${style.infoRow}`}>
              <div className="flex align-items-center justify-content-center gap-1 border-right-1 surface-border pr-2">
                <i className="pi pi-bolt "></i>
                <span className="font-small text-gray-600 white-space-nowrap">Power</span>
              </div>
              <div className="flex align-items-center gap-1 justify-content-center gap-1 border-right-1 surface-border px-2">
                <i className="pi pi-wifi "></i>
                <span className="font-small text-gray-600 white-space-nowrap">Relax</span>
              </div>
              <div className="flex align-items-center gap-1 justify-content-center gap-1 pl-2">
                <i className="pi pi-book "></i>
                <span className="font-small text-gray-600 white-space-nowrap">Sleepy</span>
              </div>
            </div>
            <div className={`flex align-items-center justify-content-center pt-2 px-3 gap-2 ${style.buttonRow}`}>
              <button className={`p-3 flex align-items-center justify-content-center w-7 gap-2 bg-purple-900 shadow-1 border-none cursor-pointer hover:bg-black-alpha-20 transition-duration-200 ${style.contactButton}`}>
                <span className="font-medium text-gray-600 white-space-nowrap">Add To Shop</span>
                <i className="pi pi-send text-gray-600"></i>
              </button>
              <button className={`p-3 flex align-items-center justify-content-center w-5 gap-2 bg-gray-900 shadow-1 border-none cursor-pointer hover:bg-gray-800 transition-duration-200 ${style.rateButton}`}>
                <span className="font-medium text-white white-space-nowrap">Rate</span>
                <i className="pi pi-thumbs-up-fill text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.App}>
      <header className={style.header}>
        <div className={style.logo}>
          <h2>LOGO</h2>
        </div>
        <div className={style.searchbar}>
          <SearchBar />
        </div>
        <nav className={style.navbar}>
          <h1>NavBar</h1>
        </nav>
      </header>
      <div className={style.slogan}>
        {/* <h1>Halluciner</h1> */}
      </div>
      <div className={style.carousel}>
        <Carousel
          value={["A", "B", "C", "D", "E", "F", "G", "H", "I"]}
          numVisible={4}
          numScroll={3}
          itemTemplate={productTemplate}
          className={style.carouselContainer}
          responsiveOptions={responsiveOptions}
        />
      </div>
      <div className="card flex justify-content-center">
        <Button label="Check" icon="pi pi-check" />
      </div>
    </div>
  );
}

export default Home;
