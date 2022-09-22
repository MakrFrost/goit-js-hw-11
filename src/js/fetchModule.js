const axios = require('axios');

const API_WEB = 'https://pixabay.com/api/';
const API_KEY = '?key=30054612-8d338f00f07d687f9e2b96ac6&';
const API_OPTIONS =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=';
const API_ORDER = 40;

export default class PhotoApiService {
  constructor() {
    this.needToFind = '';
    this.page = 1;
  }

  async fetchPhotos() {
    try {
      const responce = await fetch(
        `${API_WEB}${API_KEY}q=${this.needToFind}${API_OPTIONS}${API_ORDER}&page=${this.page}`
      ).catch(error => console.log('Error on fetch...catch', error));

      const data = await responce.json();
      this.addPhotos();

      console.log(data);

      return data;
    } catch (error) {
      console.log('Error on try...catch', error);
    }
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
