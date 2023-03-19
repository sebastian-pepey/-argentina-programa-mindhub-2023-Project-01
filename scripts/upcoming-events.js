function showCardsUpcoming(data) {
    let upcomingEvents = data.events.filter( element => new Date(element.date) > new Date(data.currentDate));
    const categories = findCategories(upcomingEvents);
    placeCategories(categories);
    placeCards(upcomingEvents);
    filterCategory(upcomingEvents);
    searchBar(upcomingEvents);
}

fetchData(urlApi,showCardsUpcoming);