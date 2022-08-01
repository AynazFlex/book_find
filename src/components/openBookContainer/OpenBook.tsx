import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../../store/booksReducer";
import "./OpenBook.css";
import parse from "html-react-parser";
import { AppDispatch, RootState } from "../../store/store";

const OpenBook: FC = () => {
  const data = useSelector((state: RootState) => state.books.openBook?.volumeInfo);
  const dispatch: (AnyAction: any) => AppDispatch = useDispatch();

  return (
    <div className="openBook_container">
      <div className="openBook_image_block">
        <img
          className="openBook_image"
          src={
            data?.imageLinks
              ? data.imageLinks.thumbnail
              : "http://photos2.fotosearch.com/bthumb/CSP/CSP991/3d-red-book-standing-stock-illustration__k12250768.jpg"
          }
          alt="book"
        />
      </div>
      <div className="openBook_info_block">
        <button
          className="openBook_button"
          onClick={() => dispatch(setOpen(false))}
        >
          &laquo; назад
        </button>
        <div className="openBook_categories">{data?.categories || ""}</div>
        <div className="openBook_title">{data?.title || ""}</div>
        <div className="openBook_authors">
          {data?.authors ? data.authors.join(", ") : ""}
        </div>
        <div className="openBook_description">
          {data?.description ? parse(data.description) : "без описания"}
        </div>
      </div>
    </div>
  );
};

export default OpenBook;
