import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ApiClass } from "./js/apiClass";
import { refs } from './js/refs'
import {createMarkup} from './js/markup'
const gallery = document.querySelector('.gallery')
const form = document.querySelector('.search-form')
const apiClass = new ApiClass();
 
onSearchBtn = e => {
  e.preventDefault();

const {
    elements: {searchQuery},
  } = e.target; 
  const inputSearchQuery = searchQuery.value.trim().toLowerCase();
  
  if (!inputSearchQuery) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;    
  }
  apiClass.getPhotos(inputSearchQuery).then(data => {
  console.log(data)
  // const markup = data.map(createMarkup)
  // gallery.insertAdjacentHTML('beforeend',markup.join(''))
})
}




form.addEventListener('submit', onSearchBtn)