export class ApiClass {
    getPhotos(searchQuery) {
        const url = "https://pixabay.com/api/?key=30652229-d54eee621831264e80866ca26&image_type=photo&orientation=horizontal&safesearch=true"
        return fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json
        })     
    }
} 

// const BASE_URL = 'https://pixabay.com/api/';
// const KEY = '30652229-d54eee621831264e80866ca26';
// const params = `?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

