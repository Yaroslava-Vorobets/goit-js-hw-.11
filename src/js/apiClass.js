import axios from 'axios';
import { searchBtn, gallery, form, loadBtn, } from './refs';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30652229-d54eee621831264e80866ca26';
const PARAMS = '&image_type=photo&orientation=horizontal&safesearch=true'
export class ApiClass {
    #page = 1;
    #query = '';
    #totalPages = 0;
    #perPage = 40;
 async getPhotos() {
    const url = `${BASE_URL}?key=${KEY}&q=${this.#query}&page=${this.#page}&per_page=${this.#perPage}.`
    const {data} = await axios.get(url, this.PARAMS);
    console.log(url);
    return data;
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
        console.log(total);
        console.log( this.#totalPages);
        return this.#totalPages = Math.ceil(total / this.#perPage);
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


// import axios from 'axios';
// import { searchBtn, gallery, form, loadBtn, } from './refs';
// const BASE_URL = 'https://pixabay.com/api/';
// const KEY = '30652229-d54eee621831264e80866ca26';

// export class ApiClass {
//     #page = 1;
//     #query = '';
//     #totalPages = 0;
//     #perPage = 40;
//     #params = {
//         params: {
//             key: API_KEY,
//             image_type: 'photo',
//             orientation: 'horizontal',
//             safesearch: true,
//         },
//     }

//  async getPhotos(inputSearchQuery) {
//    const url = `${BASE_URL}?key=${KEY}&q=${this.#query}&page=${this.#page}&per_page=${this.#perPage}.`
//    const {data} = await axios.get(url,this.#params);      
//     return data
//     } 

//     resetPage() {
//         this.#page = 1;         
//     }

//     incrementPage() {
//        this.#page += 1; 
//     }

//     set query(newQuery) {
//         this.#query = newQuery
//     }

//     get query() {
//         return this.#query
//     }
//     calculateTotalPages(total) {
//         this.#totalPages = Math.ceil(total/this.#perPage);
//     }

//     clearPage() {
//         this.resetPage()
//         gallery.innerHTML = ''
//         loadBtn.classList.add('is-hidden')
// }
//     get isShowLoadMore() {
//       return  this.#page < this.#totalPages
//     }  
// } 

