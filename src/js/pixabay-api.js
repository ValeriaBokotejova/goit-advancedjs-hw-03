import { createCardsMarkup } from './render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loader = document.querySelector('.loader');

export function onSearchFormSubmit(event) {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.search.value.trim();
  if (!inputValue) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  var API_KEY = '47763813-4917f5b92d54ff8a268fbe2f8';
  var URL = `https://pixabay.com/api/?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`;

  loader.style.display = 'flex';
  fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.total === 0) {
        iziToast.info({
          title: 'No Results',
          message: `Sorry, there are no images matching your search query. Please try again!`,
        });
        return;
      }
      createCardsMarkup(data.hits);
      document.querySelector('.search-form input[name="search"]').value = '';
    })
    .catch(err => {
      console.error(err);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later!',
      });
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}
