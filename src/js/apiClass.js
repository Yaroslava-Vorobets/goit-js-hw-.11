import axios from 'axios';
import { searchBtn, gallery, form, loadBtn, } from './refs';
BASE_URL = 'https://pixabay.com/api/';
KEY = '30652229-d54eee621831264e80866ca26';
PARAMS = '&image_type=photo&orientation=horizontal&safesearch=true'
export class ApiClass {
    #page = 1;
    #query = '';
    #totalPages = 0;
    #perPage = 40;

 async getPhotos(inputSearchQuery) {
    const url = `${BASE_URL}?key=${KEY}&q=${this.query}&page=${this.page}&per_page=${this.#perPage}.`
    const {data} = await axios.get(url, this.PARAMS)        
    return data
    } 

    resetPage() {
        this.#page = 1;         
    }

    incrementPage() {
       this.#page += 1; 
    }

    set query(newQuery) {
        this.#query = newQuery
    }

    get query() {
        return this.#query
    }
    calculateTotalPages(total) {
        this.#totalPages = Math.ceil(total/this.#perPage);
    }

    clearPage() {
        this.resetPage()
        gallery.innerHTML = ''
        loadBtn.classList.add('is-hidden')
}
    get isShowLoadMore() {
      return  this.#page < this.#totalPages
    }  
} 

