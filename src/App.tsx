import React, {FC} from "react";
import Search from "./components/SearchContainer/Search";
import Books from "./components/BooksContainer/Books"
import { useSelector } from "react-redux";
import Preloader from "./components/PreloaderContainer/Preloader";
import OpenBook from "./components/openBookContainer/OpenBook";
import { RootState } from "./store/store"
import "./App.css"

const App: FC<{}> = () => {
  
  const isFetch: boolean = useSelector((state: RootState) => state.books.fetching);
  const isOpen: boolean = useSelector((state: RootState) => state.books.isOpen);

  return (
    <div className="app-wrapper">
      <header className="app-title">Search for books</header>
      <Search />
      {isFetch ? <Preloader /> : isOpen ? <OpenBook /> : <Books />}
    </div>
  );
}

export default App;
