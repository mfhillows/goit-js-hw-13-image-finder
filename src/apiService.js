const BASE_URL =
  "https://pixabay.com/api/?image_type=photo&orientation=horizontal";
const apiKey = "19384115-1709a722da452eb21e7422a94";

export default class Api {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }
  fetchImage() {
    const url = `${BASE_URL}&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;

    return fetch(url)
      .then((response) => response.json())
      .then(({ hits }) => {
        this.page += 1;
        return hits;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
