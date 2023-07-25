import React, { useState } from 'react';
import style from './searchBar.module.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Effectuer l'action de recherche avec la valeur de searchQuery
    console.log('Recherche:', searchQuery);
    if(searchQuery === "wtf") {
      
    }
  };

  return (
    <div className={style.searchBar}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher..."
        className={style.searchInput}
      />
      <button className={style.searchButton} onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBar;
