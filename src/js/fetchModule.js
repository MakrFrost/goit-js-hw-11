const API_WEB = 'https://pixabay.com/api/';
const API_KEY = '?key=30054612-8d338f00f07d687f9e2b96ac6&';
const API_ORDER = 8;

export default class PhotoApiService {
  constructor() {
    this.needToFind = '';
    this.page = 1;
  }

  fetchPhotos() {
    return fetch(
      `${API_WEB}${API_KEY}q=${this.needToFind}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${API_ORDER}&page=${this.page}`
    )
      .then(responce => responce.json())
      .then(data => {
        this.incrementPage();
        console.log(data);
        return data.hits;
      });
  }

  addPhotos() {
    this.page += 1;
  }

  resetPhotos() {
    this.page = 1;
  }

  get query() {
    return this.needToFind;
  }

  set query(newQuery) {
    this.needToFind = newQuery;
  }
}

//? код без класса(олд)
// const API_WEB = 'https://pixabay.com/api/';
// const API_KEY = '?key=30054612-8d338f00f07d687f9e2b96ac6&';

// function fetchPhotos(needToFind, page) {
//   return fetch(
//     `${API_WEB}${API_KEY}q=${needToFind}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${page}`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// export { fetchPhotos };
