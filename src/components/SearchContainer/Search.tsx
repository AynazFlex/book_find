import React from "react";
import { useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getBooks } from "../../store/booksReducer";
import { AppDispatch } from "../../store/store";
import "./Search.css";

const search_text = "search_text"
const categories = "categories"
const sorting_by = "sorting_by"

type dataType = {
  search_text: typeof search_text
  categories: typeof categories
  sorting_by: typeof sorting_by
}

type selectType = {
  name: typeof search_text | typeof categories | typeof sorting_by
  defval: string
  register: UseFormRegister<dataType>
  options: Array<string>
}

const Select : React.FC<selectType> = ({ name, defval, register, options }) => (
  <div>
    <label className="search-lable">{name.split('_').join(' ')}</label>
    <select className="search-select" defaultValue={defval} {...register(name)}>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const Search : React.FC<{}> = (props) => {
  const dispatch: (AnyAction: any) => AppDispatch = useDispatch();
  const { register, handleSubmit } = useForm<dataType>();

  const onSubmit: SubmitHandler<dataType> = (data) =>
    dispatch(getBooks(data.search_text, data.categories, data.sorting_by));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="search-panel">
        <input
          className="search-input"
          placeholder="Начните поиск книг"
          {...register("search_text")}
        />
        <input className="search-submit_button" type="submit" value="Поиск" />
      </div>
      <div className="search-select_panel">
        <Select
          name="categories"
          defval="all"
          register={register}
          options={[
            "all",
            "art",
            "history",
            "biography",
            "computers",
            "poetry",
            "medical",
          ]}
        />
        <Select
          name="sorting_by"
          defval="relevance"
          register={register}
          options={["relevance", "newest"]}
        />
      </div>
    </form>
  );
};

export default Search;
