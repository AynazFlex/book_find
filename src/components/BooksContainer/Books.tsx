import React, {FC} from "react";
import { useSelector, useDispatch } from "react-redux";
import Book from "./Book";
import { loadMoreBooks, booksType } from "../../store/booksReducer";
import { AppDispatch, RootState } from "../../store/store";
import "./Books.css";

const Books: FC<{}> = (props) => {
  const items = useSelector((state: RootState) => state.books.items);
  const totalItems = useSelector((state: RootState) => state.books.totalItems);
  const loadingMore = useSelector((state: RootState) => state.books.loadingMore);
  const dispatch: (action: any) => AppDispatch = useDispatch();

  return items.length ? (
    <div>
      <div
        className="book-totalItems"
      >{`Найдено ${totalItems} результатов`}</div>
      <div className="book-booksContainer">
        {items.map((item: booksType, i: number) => (
          <Book
            key={i}
            title={item.volumeInfo.title}
            img={item.volumeInfo.imageLinks}
            category={item.volumeInfo.categories}
            authors={item.volumeInfo.authors}
            id={item.id}
          />
        ))}
      </div>
      {totalItems > 30 && (loadingMore ? <div className="book-loadMore">загрузка...</div> : <button onClick={() => dispatch(loadMoreBooks())} className="book-loadMore">еще книг</button>)}
    </div>
  ) : (
    <div className="book-cover">Начните поиск книг</div>
  );
};

export default Books;
