import googleBooksApi from "../api/googleBooks";

const SET_BOOKS = "SET_BOOKS";
const FETCH_BOOKS = "FETCH_BOOKS";
const ADD_BOOKS = "ADD_BOOKS";
const LOAD_MORE_BOOK = "LOAD_MORE_BOOK";
const GET_BOOK = "OPEN_BOOK";
const OPEN_BOOK = "OPEN_BOOK";

export const setOpen = (set) => ({
  type: OPEN_BOOK,
  payload: { isOpen: set },
});

export const getBooks =
  (search_text, categories, sorting_by) => async (dispatch) => {
    dispatch({ type: FETCH_BOOKS, payload: { fetching: true } });
    try {
      const response = await googleBooksApi.getBooks(
        search_text,
        categories,
        sorting_by
      );
      dispatch({
        type: SET_BOOKS,
        payload: {
          items: response.data.items,
          totalItems: response.data.totalItems,
          fetching: false,
          isOpen: false,
        },
      });
    } catch (err) {
      alert(err);
    }
  };

export const getBook = (id) => async (dispatch) => {
  dispatch({ type: FETCH_BOOKS, payload: { fetching: true } });
  try {
    const response = await googleBooksApi.getBook(id);
    dispatch({
      type: GET_BOOK,
      payload: {
        openBook: response.data,
        fetching: false,
        isOpen: true,
      },
    });
  } catch (err) {
    alert(err);
  }
};

export const loadMoreBooks = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_MORE_BOOK, payload: { loadingMore: true } });
    const response = await googleBooksApi.getMoreBooks();
    dispatch({
      type: ADD_BOOKS,
      items: response.data.items,
    });
  } catch (err) {
    alert(err);
  }
};

const initialState = {
  items: [],
  totalItems: 0,
  fetching: false,
  openBook: null,
  loadingMore: false,
  isOpen: false,
};

const booksReducer = (state = initialState, action) => {
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
