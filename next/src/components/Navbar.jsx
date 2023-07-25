import style from "../styles/Home.module.css";
import SearchBar from "../components/SearchBar";
import { FaShoppingCart, FaHome } from "react-icons/fa";

function Navbar() {
  return (
    <div className={style.App}>
      <header className={style.header}>
        <div className={style.logo}>
          <a href="/">
            <img
              src="/media/background_remover_Leonardo_Diffusion_Round_logo_of_hallucinogenic_mushrooms_intr_2.png"
              alt="Logo"
              style={{ width: "80px", cursor: "pointer" }}
            />
          </a>

        </div>
        <div className={style.searchbar}>
          <SearchBar />
        </div>
        <nav className={style.navbar}>
          <a href="/cart">
          <FaShoppingCart size={40} style={{ cursor: "pointer" }} />
          </a>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
