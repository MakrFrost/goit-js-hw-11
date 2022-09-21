import { fetchPhotos } from './fetchModule';
import Notiflix from 'notiflix';
const axios = require('axios');

const inputEl = document.querySelector('[name="searchQuery"]');
const buttonEl = document.querySelector('.search-button');

const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

buttonEl.addEventListener('click', onFormSubmit);
inputEl.addEventListener('input', onInputActive);
//!
loadMoreButton.addEventListener('click', onLoadMorePressed);

let pages = 1;

//! функционал
function onInputActive(event) {}

function onFormSubmit(event) {
  event.preventDefault();
  let searchPhotos = inputEl.value.trim();

  fetchPhotos(searchPhotos, pages).then(data => {
    if (data.total > 1) {
      gallery.innerHTML = '';
      createPhotoEl(data.hits);
      Notiflix.Notify.success(`We find you photo!`);
      onLoadMorePressed();
      createPhotoEl(data.hits);
      loadMoreButton.style.cssText = 'visibility: visible';
    } else if (data.total === 0) {
      gallery.innerHTML = '';
      Notiflix.Notify.failure(
        '"Sorry, there are no images matching your search query. Please try again."'
      );
    }

    // console.log(data.hits)
  });
}

//? разметка для создания галереи
function createPhotoEl(photos) {
  const photoList = photos.map(photo => {
    return `<div class="photo-card">
  <img src="${photo.largeImageURL}" alt="${photo.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes <span>${photo.likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views <span>${photo.views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments <span>${photo.comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads <span>${photo.downloads}</span></b>
    </p>
  </div>
</div>`;
  });
  photoList.forEach(markupPhoto => {
    gallery.insertAdjacentHTML('beforeend', markupPhoto);
  });
}

//!
function onLoadMorePressed() {
  pages += 1;
  console.log(pages);
}
