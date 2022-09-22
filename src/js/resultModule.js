import Notiflix from 'notiflix';
import PhotoApiService from './fetchModule';
const axios = require('axios');

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

const photoApiService = new PhotoApiService();

//! функционал
async function onFormSubmit(event) {
  event.preventDefault();

  photoApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  photoApiService.resetPhotos();

  if (photoApiService.query === '') {
    loadMoreBtn.style.cssText = 'visibility: hidden;';
    gallery.innerHTML = '';
    return Notiflix.Notify.warning('Please enter 1 character!');
  }

  await photoApiService.fetchPhotos().then(data => {
    if (data.total > 1) {
      gallery.innerHTML = '';
      createPhotoEl(data.hits);
      Notiflix.Notify.success(`We find you photo!`);
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
      loadMoreBtn.style.cssText = 'visibility: visible';
    }
    if (data.total === 0) {
      gallery.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      loadMoreBtn.style.cssText = 'visibility: hidden;';
    }
    if (data.total <= 40) {
      loadMoreBtn.style.cssText = 'visibility: hidden;';
    }
  });
}

async function onLoadMore() {
  await photoApiService.fetchPhotos().then(data => {
    createPhotoEl(data.hits);
  });
  Notiflix.Notify.success(`You load next photos page!`);
}

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

// //! лайтбокс
// let boxGallery = new SimpleLightbox('.gallery a');

// let captionsData = (boxGallery.options.captionsData = 'alt');
// let captionDelay = (boxGallery.options.captionDelay = 250);

// TODO кусок кода с сылкой под лайтбокс
// `<a href="${photo.largeImageURL}"
//   ><div class="photo-card">
//     <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
//     <div class="info">
//       <p class="info-item">
//         <b>Likes <span>${photo.likes}</span></b>
//       </p>
//       <p class="info-item">
//         <b>Views <span>${photo.views}</span></b>
//       </p>
//       <p class="info-item">
//         <b>Comments <span>${photo.comments}</span></b>
//       </p>
//       <p class="info-item">
//         <b>Downloads <span>${photo.downloads}</span></b>
//       </p>
//     </div>
//   </div></a
// >
// `;

//? код без класса(олд)
// import { fetchPhotos } from './fetchModule';
// import Notiflix from 'notiflix';

// const axios = require('axios');

// const inputEl = document.querySelector('[name="searchQuery"]');
// const buttonEl = document.querySelector('.search-button');
// const gallery = document.querySelector('.gallery');
// const loadMoreButton = document.querySelector('.load-more');

// buttonEl.addEventListener('click', onFormSubmit);
// //!
// loadMoreButton.addEventListener('click', onLoadMorePressed);

// let pages = 1;

// //! функционал
// function onFormSubmit(event) {
//   event.preventDefault();
//   let searchPhotos = inputEl.value.trim();

//   fetchPhotos(searchPhotos, pages).then(data => {
//     if (data.total > 1) {
//       gallery.innerHTML = '';
//       createPhotoEl(data.hits);
//       Notiflix.Notify.warning(`Hooray! We found ${data.totalHits} images.`);
//       Notiflix.Notify.success(`We find you photo!`);
//       // onLoadMorePressed();
//       createPhotoEl(data.hits);
//       loadMoreButton.style.cssText = 'visibility: visible';
//       pages = 1;
//     } else if (data.total === 0) {
//       gallery.innerHTML = '';
//       Notiflix.Notify.failure(
//         '"Sorry, there are no images matching your search query. Please try again."'
//       );
//     }

//     // console.log(data.hits)
//   });
// }

// //? разметка для создания галереи
// function createPhotoEl(photos) {
//   const photoList = photos.map(photo => {
//     return `<div class="photo-card">
//   <img src="${photo.largeImageURL}" alt="${photo.tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes <span>${photo.likes}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Views <span>${photo.views}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Comments <span>${photo.comments}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Downloads <span>${photo.downloads}</span></b>
//     </p>
//   </div>
// </div>`;
//   });
//   photoList.forEach(markupPhoto => {
//     gallery.insertAdjacentHTML('beforeend', markupPhoto);
//   });
// }

// //!
// function onLoadMorePressed() {
//   pages++;
//   console.log(pages);
//   onFormSubmit(event);
// }
