import React from "react";
import style from "./Books.module.css";
import { useDispatch } from "react-redux";
import { getBook } from "../../store/booksReducer";

const Book = ({ img, category, title, authors, id }) => {
  const dispatch = useDispatch();
  const openBook = (id) => {
    dispatch(getBook(id));
  };
  return (
    <div className={style.bookContainer}>
      <img
        className={style.image}
        src={
          img
            ? img.thumbnail
            : "http://photos2.fotosearch.com/bthumb/CSP/CSP991/3d-red-book-standing-stock-illustration__k12250768.jpg"
        }
      />
      <div className={style.info}>
        <div onClick={() => openBook(id)} className={style.title}>
          {title}
        </div>
        <div className={style.authors}>
          {authors ? authors.join(", ") : authors}
        </div>
        <div className={style.category}>{category}</div>
      </div>
    </div>
  );
};

export default Book;
