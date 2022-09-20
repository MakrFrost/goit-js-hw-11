import { fetchPhotos } from './fetchModule';
import Notiflix from 'notiflix';
const axios = require('axios');

console.log(fetchPhotos('India').then(data => console.log(data)));
Notiflix.Notify.info(`Мы нашли твои фото`);

//? разметка для создания галереи
function createPhotoEl(photos) {
  return `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
}
