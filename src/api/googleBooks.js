import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/",
});


const googleBooksApi = {
    key: 'AIzaSyBAmf5Tknr43RquBRW0L4V1MT0LT73xrB4',
    search_text: '',
    categories: '',
    sorting_by: '',
    index: '',

    createUrl(search_text, categories, sorting_by, index = 0) {
        return search_text ? `volumes?q=${search_text}${categories === 'all' ? '' : '+subject:' + categories}&orderBy=${sorting_by}&maxResults=30&startIndex=${index}&key=${this.key}` : 
        `volumes?q=${categories === 'all' ? '+' : '+subject:' + categories + '&'}orderBy=${sorting_by}&maxResults=30&startIndex=${index}&key=${this.key}`
    },

    getBooks(search_text, categories, sorting_by) {
        this.search_text = search_text;
        this.categories = categories;
        this.sorting_by = sorting_by;
        this.index = 0;
        return instance.get(this.createUrl(search_text, categories, sorting_by));
    },

    getMoreBooks() {
        this.index += 30;
        return instance.get(this.createUrl(this.search_text, this.categories, this.sorting_by, this.index));
    },

    getBook(id) {
        return instance.get(`volumes/${id}`);
    }
}

export default googleBooksApi;