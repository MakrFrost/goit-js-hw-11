import { fetchPhotos } from './fetchModule';
import Notiflix from 'notiflix';
const axios = require('axios');

const inputEl = document.querySelector('[name="searchQuery"]');
const buttonEl = document.querySelector('.search-button');
const gallery = document.querySelector('.gallery');

buttonEl.addEventListener('click', onFormSubmit);
inputEl.addEventListener('input', onInputActive);

//! функционал

function onInputActive(event) {}

function onFormSubmit(event) {
  event.preventDefault();
  let searchPhotos = inputEl.value.trim();

  fetchPhotos(searchPhotos).then(
    data => createPhotoEl(data.hits)
    // console.log(data.hits)
  );
  Notiflix.Notify.info(`Мы нашли твои фото`);
}

//? разметка для создания галереи
function createPhotoEl(photos) {
  const photoList = photos.map(photo => {
    return `<div class="photo-card">
  <img src="${photo.largeImageURL}" alt="${photo.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes : ${photo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views : ${photo.views}</b>
    </p>
    <p class="info-item">
      <b>Comments : ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads : ${photo.downloads}</b>
    </p>
  </div>
</div>`;
  });
  photoList.forEach(markupPhoto => {
    gallery.insertAdjacentHTML('beforeend', markupPhoto);
  });
}

// function makeCountryList(countries) {
//   const countryList = countries.map(country => {
//     return `<li class="country-list__item">
//             <img src=${country.flags.png} width="80" alt="flag">
//             <span>${country.name.official}</span>
//         </li>`;
//   });
//   countryList.forEach(markupCountry => {
//     countryListEl.insertAdjacentHTML('beforeend', markupCountry);
//     console.log('выполнилась функция makeCountryList для стран');
//   });
// }
