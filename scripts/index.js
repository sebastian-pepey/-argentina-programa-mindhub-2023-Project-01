let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

fetch(urlApi)
.then( result => result.json())
.then(data => {

    const categories = findCategories(data.events);
  
    placeCategories(categories);

    placeCards(data.events);

    filterCategory(data.events);

    searchBar(data.events);

})

