function showCardsPast(data) {
    let pastEvents = data.events.filter( element => new Date(element.date) < new Date(data.currentDate));
    const categories = findCategories(pastEvents);
    placeCategories(categories);
    placeCards(pastEvents);
    filterCategory(pastEvents);
    searchBar(pastEvents);
}

fetchData(urlApi,showCardsPast);