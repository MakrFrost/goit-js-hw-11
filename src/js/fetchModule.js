const API_WEB = 'https://pixabay.com/api/';
const API_KEY = '?key=30054612-8d338f00f07d687f9e2b96ac6&';

function fetchPhotos(needToFind) {
  return fetch(
    `${API_WEB}${API_KEY}q=${needToFind}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchPhotos };
