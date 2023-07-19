import style from '../styles/Home.module.css';
import SearchBar from '../components/SearchBar'
// import Carousel from '../components/Carousel'

function Home() {
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
          <h1> NavBar</h1>
        </nav>
      </header>
      <div className={style.carousel}>
        {/* <Carousel /> */}
      </div>
      <div className={style.slogan}>
        <h1>Halluciner</h1>
      </div>
    </div>
  );
}
export default Home;
