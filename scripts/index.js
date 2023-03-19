function showCards(data) {
    const categories = findCategories(data.events);
    placeCategories(categories);
    placeCards(data.events);
    filterCategory(data.events);
    searchBar(data.events);
}

fetchData(urlApi,showCards);