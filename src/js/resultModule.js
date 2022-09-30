import Notiflix from 'notiflix';
import PhotoApiService from './fetchModule';

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

const photoApiService = new PhotoApiService();

//! функционал
function onFormSubmit(event) {
  event.preventDefault();

  photoApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  photoApiService.resetPhotos();

  if (photoApiService.query === '') {
    loadMoreBtn.style.cssText = 'visibility: hidden;';
    gallery.innerHTML = '';
    return Notiflix.Notify.warning('Please enter 1 character!');
  }

  photoApiService
    .fetchPhotos()
    .then(data => {
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
    })
    .catch('Error on function');
}

async function onLoadMore() {
  await photoApiService
    .fetchPhotos()
    .then(data => {
      createPhotoEl(data.hits);
    })
    .catch('Error on function', error);
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
