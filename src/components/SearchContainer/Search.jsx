import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getBooks } from "../../store/booksReducer";
import style from "./Search.module.css";

const Select = ({ name, defval, register, options }) => (
  <div>
    <label className={style.lable}>{name}</label>
    <select className={style.select} defaultValue={defval} {...register(name)}>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const Search = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) =>
    dispatch(getBooks(data.search_text, data.categories, data["sorting by"]));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.search_panel}>
        <input
          className={style.search_input}
          placeholder="Начните поиск книг"
          {...register("search_text")}
        />
        <input className={style.submit_button} type="submit" value="Поиск" />
      </div>
      <div className={style.select_panel}>
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
          name="sorting by"
          defval="relevance"
          register={register}
          options={["relevance", "newest"]}
        />
      </div>
    </form>
  );
};

export default Search;
