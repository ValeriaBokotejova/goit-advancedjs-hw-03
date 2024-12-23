import { onSearchFormSubmit } from './js/pixabay-api';

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', onSearchFormSubmit);
