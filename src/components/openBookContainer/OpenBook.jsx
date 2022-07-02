import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../../store/booksReducer";
import style from "./OpenBook.module.css";
import parse from "html-react-parser";

const OpenBook = (props) => {
  const data = useSelector((state) => state.books.openBook.volumeInfo);
  const dispatch = useDispatch();

  return (
    <div className={style.book_container}>
      <div className={style.image_block}>
        <img
          className={style.image}
          src={
            data.imageLinks
              ? data.imageLinks.thumbnail
              : "http://photos2.fotosearch.com/bthumb/CSP/CSP991/3d-red-book-standing-stock-illustration__k12250768.jpg"
          }
          alt="book"
        />
      </div>
      <div className={style.info_block}>
        <button
          className={style.button}
          onClick={() => dispatch(setOpen(false))}
        >
          &laquo; назад
        </button>
        <div className={style.categories}>{data.categories || ""}</div>
        <div className={style.title}>{data.title || ""}</div>
        <div className={style.authors}>
          {data.authors ? data.authors.join(", ") : ""}
        </div>
        <div className={style.description}>
          {data.description ? parse(data.description) : "без описания"}
        </div>
      </div>
    </div>
  );
};

export default OpenBook;
