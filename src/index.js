import axios from "axios";
import'./css/main.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ApiClass } from "./js/apiClass";
import { createMarkup } from './js/markup'
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import {searchBtn, gallery, form, loadBtn,} from './js/refs'

const apiClass = new ApiClass();
const lightbox = new SimpleLightbox('.gallery a', {
'captionPosition': "bottom",
'captionDelay': 250,
});
 
const onSearch = async e => {
  e.preventDefault();  
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  const inputSearchQuery = searchQuery.value.trim().toLowerCase();
  
  if (!inputSearchQuery) {
    Notify.failure('Sorry, your search query is empty!');
    return;
  } 
  

  apiClass.query = inputSearchQuery
  apiClass.clearPage()
 
  try {
    const { totalHits, hits } = await apiClass.getPhotos()
    const markup = createMarkup(hits)
    gallery.innerHTML = markup
    apiClass.calculateTotalPages(totalHits)
    console.log(apiClass)
    lightbox.refresh()
    if (apiClass.isShowLoadMore) {
    loadBtn.classList.remove('is-hidden')  
    }
    if (hits.length === 0) {
      Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
      return;
    } else {
       Notify.success(`Hooray! We found ${totalHits} images.`)
      }   
  }
  catch (error)  {
  Notify.failure(error.message)
  apiClass.clearPage()
  }   
}

const onLoadMore = async () => {
  try {
  apiClass.incrementPage();
   if (!apiClass.isShowLoadMore) {
    loadBtn.classList.add('is-hidden');
    Notify.failure(`We're sorry, but you've reached the end of search results.`)
  }
  const {totalHits, hits } = await apiClass.getPhotos();
//
  console.log(apiClass.calculateTotalPages(totalHits));
    const markup = createMarkup(hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh()
  }
  catch(error) {
  console.log(error.message);
  apiClass.clearPage()
  }
}

form.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', onLoadMore);