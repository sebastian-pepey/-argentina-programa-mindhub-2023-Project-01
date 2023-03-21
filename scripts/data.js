let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

// let urlApi = './scripts/data.json';

async function fetchData(url, callback) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        callback(data);
    }
    catch {
        error => console.log(error);
    }   
}