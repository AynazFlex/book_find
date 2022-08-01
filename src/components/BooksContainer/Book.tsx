import React, {FC} from "react";
import { useDispatch } from "react-redux";
import { getBook } from "../../store/booksReducer";
import { AppDispatch } from "../../store/store"
import "./Books.css";

type propsType = {
  img: {
    thumbnail?: string
  }
  category: string
  title: string
  id: string
  authors: Array<string>
}

const Book: FC<propsType> = ({ img, category, title, authors, id }) => {
  const dispatch: (AnyAction: any) => AppDispatch = useDispatch();
  const openBook = (id: string) => {
    dispatch(getBook(id));
  };

  return (
    <div className="book-bookContainer">
      <img
        className="book-image"
        src={img.thumbnail}
        alt="book"
      />
      <div className="book-info">
        <div onClick={() => openBook(id)} className="book-title">
          {title}
        </div>
        <div className="book-authors">
          {authors ? authors.join(", ") : authors}
        </div>
        <div className="book-category">{category}</div>
      </div>
    </div>
  );
};

export default Book;
