const categories = findCategories(data.events);

let upcomingEvents = data.events.filter( element => new Date(element.date) > new Date(data.currentDate));

placeCategories(categories);

placeCards(upcomingEvents);

filterCategory(upcomingEvents);

searchBar(upcomingEvents);