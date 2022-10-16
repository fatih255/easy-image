const API_BASE_URL = 'https://localhost:5000';


const api = {

    combineImages: (formdata) => fetch(API_BASE_URL, { method: 'POST', body: formdata })
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.error(error);
        })
}


