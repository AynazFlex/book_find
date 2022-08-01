import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/",
});

export type openBookType = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title?: string;
    authors?: Array<string>;
    publisher?: string;
    publishedDate?: string;
    description?: string
    industryIdentifiers?: Array<{
      type?: string;
      identifier?: string;
    }>;
    readingModes?: {
      text?: boolean;
      image?: boolean;
    };
    pageCount?: number;
    printedPageCount?: number;
    printType?: string;
    categories?: Array<string>;
    maturityRating?: string;
    allowAnonLogging?: boolean;
    contentVersion?: string;
    panelizationSummary?: {
      containsEpubBubbles?: boolean;
      containsImageBubbles?: boolean;
    };
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
  };
  saleInfo?: {
    country?: string;
    saleability?: string;
    isEbook?: boolean;
    listPrice?: {
      amount?: number;
      currencyCode?: string;
    };
    retailPrice?: {
      amount?: number;
      currencyCode?: string;
    };
    buyLink?: string;
    offers?: Array<{
      finskyOfferType?: number;
      listPrice?: {
        amountInMicros?: number;
        currencyCode?: string;
      };
      retailPrice?: {
        amountInMicros?: number;
        currencyCode?: string;
      };
    }>;
  };
  accessInfo?: {
    country?: string;
    viewability?: string;
    embeddable?: boolean;
    publicDomain?: boolean;
    textToSpeechPermission?: string;
    epub?: {
      isAvailable?: boolean;
    };
    pdf?: {
      isAvailable?: boolean;
      acsTokenLink?: string;
    };
    webReaderLink?: string;
    accessViewStatus?: string;
    quoteSharingAllowed?: boolean;
  };
};

export type bookfromlistType = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title?: string;
    authors?: Array<string>;
    publisher?: string;
    publishedDate?: string;
    industryIdentifiers?: Array<{
      type?: string;
      identifier?: string;
    }>;
    readingModes?: {
      text?: boolean;
      image?: boolean;
    };
    printType?: string;
    categories?: Array<string>;
    maturityRating?: string;
    allowAnonLogging?: boolean;
    contentVersion?: string;
    panelizationSummary?: {
      containsEpubBubbles?: boolean;
      containsImageBubbles?: boolean;
    };
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
  };
  saleInfo?: {
    country?: string;
    saleability?: string;
    isEbook?: boolean;
    listPrice?: {
      amount?: number;
      currencyCode?: string;
    };
    retailPrice?: {
      amount?: number;
      currencyCode?: string;
    };
    buyLink?: string;
    offers?: Array<{
      finskyOfferType?: number;
      listPrice?: {
        amountInMicros?: number;
        currencyCode?: string;
      };
      retailPrice?: {
        amountInMicros?: number;
        currencyCode?: string;
      };
    }>;
  };
  accessInfo?: {
    country?: string;
    viewability?: string;
    embeddable?: boolean;
    publicDomain?: boolean;
    textToSpeechPermission?: string;
    epub?: {
      isAvailable?: boolean;
    };
    pdf?: {
      isAvailable?: boolean;
      acsTokenLink?: string;
    };
    webReaderLink?: string;
    accessViewStatus?: string;
    quoteSharingAllowed?: boolean;
  };
  searchInfo?: {
    textSnippet?: string;
  };
};

type booksType = {
  kind: string;
  totalItems: number;
  items: Array<bookfromlistType>;
};

const googleBooksApi = {
  key: "AIzaSyBAmf5Tknr43RquBRW0L4V1MT0LT73xrB4",
  search_text: "",
  categories: "",
  sorting_by: "",
  index: 0,

  createUrl(
    search_text: string,
    categories: string,
    sorting_by: string,
    index = 0
  ): string {
    return search_text
      ? `volumes?q=${search_text}${
          categories === "all" ? "" : "+subject:" + categories
        }&orderBy=${sorting_by}&maxResults=30&startIndex=${index}&key=${
          this.key
        }`
      : `volumes?q=${
          categories === "all" ? "+" : "+subject:" + categories + "&"
        }orderBy=${sorting_by}&maxResults=30&startIndex=${index}&key=${
          this.key
        }`;
  },

  getBooks(search_text: string, categories: string, sorting_by: string) {
    this.search_text = search_text;
    this.categories = categories;
    this.sorting_by = sorting_by;
    this.index = 0;
    return instance.get<booksType>(
      this.createUrl(search_text, categories, sorting_by)
    );
  },

  getMoreBooks() {
    this.index += 30;
    return instance.get<booksType>(
      this.createUrl(
        this.search_text,
        this.categories,
        this.sorting_by,
        this.index
      )
    );
  },

  getBook(id: string) {
    return instance.get<openBookType>(`volumes/${id}`);
  },
};

export default googleBooksApi;
