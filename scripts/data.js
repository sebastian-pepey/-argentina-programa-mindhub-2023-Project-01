let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

let urlLocal = './scripts/data.json'

async function fetchData(url) {
    try {

        const response = await fetch(url);

        const parsedResponse = await response.json();

        return parsedResponse.events;

    }

    catch {
        error => console.log(error)
    }   
}

const data = fetchData(urlApi);

console.log(data)