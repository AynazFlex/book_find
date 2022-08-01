import googleBooksApi, { bookfromlistType, openBookType } from "../api/googleBooks";
import { ThunkAction } from "redux-thunk";
import { AppDispatch, RootState } from "./store";

const SET_BOOKS = "SET_BOOKS";
const FETCH_BOOKS = "FETCH_BOOKS";
const ADD_BOOKS = "ADD_BOOKS";
const LOAD_MORE_BOOK = "LOAD_MORE_BOOK";
const GET_BOOK = "OPEN_BOOK";
const OPEN_BOOK = "OPEN_BOOK";

type setOpenType = {
  type: typeof OPEN_BOOK;
  payload: {
    isOpen: boolean;
  };
};

type fetchBooksType = {
  type: typeof FETCH_BOOKS;
  payload: {
    fetching: boolean;
  };
};

type setBooksType = {
  type: typeof SET_BOOKS;
  payload: {
    items: Array<booksType>;
    totalItems: number;
    fetching: boolean;
    isOpen: boolean;
  };
};

type setBookType = {
  type: typeof GET_BOOK;
  payload: {
    openBook: openBookType;
    fetching: boolean;
    isOpen: boolean;
  };
};

type loadMoreType = {
  type: typeof LOAD_MORE_BOOK;
  payload: {
    loadingMore: boolean;
  };
};

type addBookType = {
  type: typeof ADD_BOOKS;
  items: Array<booksType>;
};

export type actionsType =
  | setOpenType
  | fetchBooksType
  | setBooksType
  | setBookType
  | loadMoreType
  | addBookType;

export type booksType = {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
    categories: string;
    authors: Array<string>;
  };
};

const fetchingBooks = (fetching: boolean): fetchBooksType => ({
  type: FETCH_BOOKS,
  payload: { fetching: fetching },
});

const setBooks = (
  items: Array<booksType>,
  totalItems: number,
  fetching: boolean,
  isOpen: boolean
): setBooksType => ({
  type: SET_BOOKS,
  payload: {
    items,
    totalItems,
    fetching,
    isOpen,
  },
});

const setBook = (
  openBook: openBookType,
  fetching: boolean,
  isOpen: boolean
): setBookType => ({
  type: GET_BOOK,
  payload: {
    openBook,
    fetching,
    isOpen,
  },
});

const addBook = (items: Array<booksType>): addBookType => ({
  type: ADD_BOOKS,
  items,
});

const loadMore = (loadingMore: boolean): loadMoreType => ({
  type: LOAD_MORE_BOOK,
  payload: { loadingMore },
});

export const setOpen = (set: boolean): setOpenType => ({
  type: OPEN_BOOK,
  payload: { isOpen: set },
});

export const getBooks =
  (
    search_text: string,
    categories: string,
    sorting_by: string
  ): ThunkAction<Promise<void>, RootState, unknown, actionsType> =>
  async (dispatch) => {
    dispatch(fetchingBooks(true));
    try {
      const response = await googleBooksApi.getBooks(
        search_text,
        categories,
        sorting_by
      );
      const items: Array<booksType> = response.data.items.map(
        (item: bookfromlistType): booksType => ({
          id: item.id,
          volumeInfo: {
            title: item.volumeInfo.title || "",
            imageLinks: {
              thumbnail:
                (item.volumeInfo.imageLinks &&
                  item.volumeInfo.imageLinks.thumbnail) ||
                "http://photos2.fotosearch.com/bthumb/CSP/CSP991/3d-red-book-standing-stock-illustration__k12250768.jpg",
            },
            categories: item.volumeInfo.categories
              ? item.volumeInfo.categories[0]
              : "",
            authors: item.volumeInfo.authors || [""],
          },
        })
      );
      dispatch(setBooks(items, response.data.totalItems, false, false));
    } catch (err) {
      alert(err);
    }
  };

export const getBook =
  (id: string): ThunkAction<void, RootState, unknown, actionsType> =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchingBooks(true));
    try {
      const response = await googleBooksApi.getBook(id);
      dispatch(setBook(response.data, false, true));
    } catch (err) {
      alert(err);
    }
  };

export const loadMoreBooks =
  (): ThunkAction<void, RootState, unknown, actionsType> =>
  async (dispatch) => {
    try {
      dispatch(loadMore(true));
      const response = await googleBooksApi.getMoreBooks();
      const items: Array<booksType> = response.data.items.map(
        (item: bookfromlistType): booksType => {
          return {
            id: item.id,
            volumeInfo: {
              title: item.volumeInfo.title || "",
              imageLinks: {
                thumbnail:
                  (item.volumeInfo.imageLinks &&
                    item.volumeInfo.imageLinks.thumbnail) ||
                  "http://photos2.fotosearch.com/bthumb/CSP/CSP991/3d-red-book-standing-stock-illustration__k12250768.jpg",
              },
              categories: item.volumeInfo.categories
                ? item.volumeInfo.categories[0]
                : "",
              authors: item.volumeInfo.authors || [""],
            },
          };
        }
      );
      dispatch(addBook(items));
    } catch (err) {
      dispatch(loadMore(false));
      alert(err);
    }
  };

export type loadMoreBooksType = typeof loadMoreBooks;

const initialState: initialStateType = {
  items: [],
  totalItems: 0,
  fetching: false,
  openBook: null,
  loadingMore: false,
  isOpen: false,
};

type initialStateType = {
  items: Array<booksType>,
  totalItems: number,
  fetching: boolean,
  openBook: null | openBookType
  loadingMore: boolean
  isOpen: boolean
};

const booksReducer = (
  state = initialState,
  action: actionsType
): initialStateType => {
  switch (action.type) {
    case SET_BOOKS:
    case FETCH_BOOKS:
    case GET_BOOK:
    case OPEN_BOOK:
    case LOAD_MORE_BOOK:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_BOOKS:
      return {
        ...state,
        items: [...state.items, ...action.items],
        loadingMore: false,
      };
    default:
      return state;
  }
};

export default booksReducer;
