import React from "react";
import style from "./App.module.css"
import Search from "./components/SearchContainer/Search";
import Books from "./components/BooksContainer/Books"
import { useSelector } from "react-redux";
import Preloader from "./components/PreloaderContainer/Preloader";
import OpenBook from "./components/openBookContainer/OpenBook";

function App() {
  
  const isFetch = useSelector(state => state.books.fetching);
  const isOpen = useSelector(state => state.books.isOpen);

  return (
    <div className={style.wrapper}>
      <header className={style.title}>Search for books</header>
      <Search />
      {isFetch ? <Preloader /> : isOpen ? <OpenBook /> : <Books />}
    </div>
  );
}

export default App;
