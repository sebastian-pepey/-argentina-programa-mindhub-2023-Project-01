let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

fetch(urlApi)
.then( result => result.json())
.then(data => {

    const categories = findCategories(data.events);

    let pastEvents = data.events.filter( element => new Date(element.date) < new Date(data.currentDate));
    
    placeCategories(categories);
    
    placeCards(pastEvents);
    
    filterCategory(pastEvents);
    
    searchBar(pastEvents);

})
