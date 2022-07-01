import React from "react";
import style from "./Books.module.css";
import { useSelector, useDispatch } from "react-redux";
import Book from "./Book";
import { loadMoreBooks } from "../../store/booksReducer";

const Books = (props) => {
  const items = useSelector((state) => state.books.items);
  const totalItems = useSelector((state) => state.books.totalItems);
  const loadingMore = useSelector((state) => state.books.loadingMore);
  const dispatch = useDispatch();

  return items.length ? (
    <div>
      <div
        className={style.totalItems}
      >{`Найдено ${totalItems} результатов`}</div>
      <div className={style.booksContainer}>
        {items.map((item, i) => (
          <Book
            key={i}
            title={item.volumeInfo.title || ""}
            img={item.volumeInfo.imageLinks || ""}
            category={item.volumeInfo.categories && item.volumeInfo.categories[0] || ""}
            authors={item.volumeInfo.authors || ""}
            id={item.id}
          />
        ))}
      </div>
      {totalItems > 30 && (loadingMore ? <div className={style.loadMore}>загрузка...</div> : <button onClick={() => dispatch(loadMoreBooks())} className={style.loadMore}>еще книг</button>)}
    </div>
  ) : (
    <div className={style.cover}>Начните поиск книг</div>
  );
};

export default Books;
