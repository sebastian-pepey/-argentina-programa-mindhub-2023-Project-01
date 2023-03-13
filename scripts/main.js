// Funciones Expresadas

// SearchedCat
// Parámetros: <<arreglo de objetos>> "data" y <<string>> valor buscado "searchedValue".
// Retorna: <<arreglo de objetos>> searchedCat.
// Qué hace: Recorre data comparando los strings normalizados de nombre y descripcion de data con la string searchedValue.

let searchedCat = (data, searchedValue) => {

  let searchedCat = [];

  data.forEach( event => {

    if(event.name.toLowerCase().includes(searchedValue.toLowerCase()) || event.description.toLowerCase().includes(searchedValue.toLowerCase())) {
  
      searchedCat.push(event);
  
    }
  })

  return searchedCat;
  
}

// filteredCat
// Parámetros: <<arreglo de objetos>> "data".
// Retorna: <<arreglo de objetos>> searchedCat(). De esta manera afecta al arreglo "data" y lo pasa a SearchedCat para que
// le aplique el filtro por categoría.
// Qué hace: Recorre data comparando las categorías chequeadas con las correspondientes a las tarjetas.
  
let filteredCat = (data) => {

  let catChecked = Array.from(document.querySelectorAll('.form-check-input:checked'));

  let searchedValue = document.querySelector('input.form-control').value;

  let dataFiltered=[];

  if (catChecked.length === 0) {

    return searchedCat(data, searchedValue);

  } else {

    catChecked.forEach( category => {

      data.forEach( event => {

        if(event.category === category.defaultValue){

          dataFiltered.push(event)

        }
      })
    })

    return searchedCat(dataFiltered, searchedValue);

  }
}
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// Funciones Declaradas

// placeCards
// Parámetros: <<arreglo de objetos>> "data".
// Retorna: Nada.
// Qué hace: Encuentra el div padre con clase "events". Si data no contiene elementos, crea un h2 con la leyenda "La búsqueda
// no arrojó ningún resultado" y lo adjunta al elemento padre.
// Si data contiene elementos, los recorre y crea, por cada uno de ellos, una porción de código HTML que anexa al elemento padre.
  
function placeCards(inputObject) {

  let divEvent = document.querySelector('div.events');

  divEvent.innerHTML = "";

  if(inputObject.length === 0) {

    let sign = document.createElement('h2');

    sign.innerText = 'La búsqueda no arrojó ningún resultado';

    divEvent.appendChild(sign);

  } else {

    let fragment = document.createDocumentFragment();

  inputObject.forEach( element => {

    let div = document.createElement('div');

    div.classList.add('card','mx-2','my-3')

    div.innerHTML = `<img src="${element.image}" class="card-img-top" alt="cinema_picture">
        <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.description}</p>
            <div class="row">
                <div class="col"><p>Price: $${element.price}</p></div>
                <div class="col">
                  <a href="./details.html?id=${element._id}" class="btn btn-primary">See more...</a>
                </div>
            </div>
        </div>`

    fragment.appendChild(div);

  });

  divEvent.appendChild(fragment);

  }
}

// findCategories
// Parámetros: <<arreglo>> "inputObject".
// Retorna: <<arreglo>> "categories".
// Qué hace: Recorre el arreglo y si el elemento del arreglo no se encuentra en categories, lo agrega.
  
function findCategories(inputObject) {

  let categories = [];

  inputObject.forEach( element => {
  
    if(!categories.includes(element.category)) {
      categories.push(element.category);
    }

  })

  return categories;
}

// placeCategories
// Parámetros: <<arreglo>> "categoriesArray".
// Retorna: Nada.
// Qué hace: Encuentra el div padre con clase "categories". Recorre el arreglo y lo anexa secuencialmente al elemento padre.
  
function placeCategories(categoriesArray) {

  let divCategories = document.querySelector('div.categories');

  categoriesArray.forEach( element => {

  divCategories.insertAdjacentHTML('beforeend', `<div class="form-check mx-3">
      <input class="form-check-input" type="checkbox" value="${element}" id="${element}">
      <label class="form-check-label" for="${element}">${element}</label>
    </div>`)
  })

  let button = document.createElement('button');

  button.classList.add('btn','btn-success','clearFilters','py-0');

  button.innerText = "Clear Categories"

  button.addEventListener('click',() => {

    let catCheck = document.querySelectorAll('.form-check-input');
  
    catCheck.forEach( category => category.checked = false);

    fetch(urlApi)
    .then( result => result.json())
    .then(data => {

      placeCards(filteredCat(data.events));

    })  
  })

  divCategories.appendChild(button);
  
}

// filterCategory
// Parámetros: <<arreglo>> "data".
// Retorna: Nada.
// Qué hace: Le agrega a cada checkbox un evento "click", el cual desencadena la función placeCards(), recibiendo como argumento
// filteredCat(data). De esta manera, se aplican los filtros sobre los datos cada vez que se efectúa un click sobre las categorías.
  
function filterCategory(data) {

  let catCheck = document.querySelectorAll('.form-check-input');

  catCheck.forEach( element => element.addEventListener('click',(e) => {

    placeCards(filteredCat(data));
  
  }))
  
}

// searchBar
// Parámetros: <<arreglo>> "data".
// Retorna: Nada.
// Qué hace: Le agrega a cada checkbox un evento "input" (permitiendo no sólo escribir sino pegar datos sobre la barra de input),
// el cual desencadena la función placeCards(), recibiendo como argumento searchedCat().
// De esta manera, se aplican los filtros sobre los datos cada vez que se efectúa un cambio en el input.
  

function searchBar(data) {

  let searchBar = document.querySelector('input.form-control');

  searchBar.addEventListener('input',(e) => {
  
    let searchedValue = document.querySelector('input.form-control').value;
  
    let catChecked = filteredCat(data);

    placeCards(searchedCat(catChecked, searchedValue));

  })

}

// Captura de parámetro id de la URL, guardado en variable y renderización por medio de manipulación del DOM.

let detail = document.querySelector('div.detail');

if(detail) {

  const queryString = location.search;

  const params = new URLSearchParams(queryString);

  const id = params.get('id');

  let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

  fetch(urlApi)
  .then( result => result.json())
  .then(data => {

    const eventDetail = data.events.find(event => event._id.toString() === id)

    detail.insertAdjacentHTML('beforeend', `<div class="row border border-2 rounded-3 my-4 detail-card">
    <div class="col-lg-8 g-0">
      <img src="${eventDetail.image}" class="w-100 p-3 object-fit-cover rounded-2" alt="food_fair_picture">
    </div>
    <div class="col-lg-4 p-3 g-0 d-flex flex-column justify-content-end rounded-2">
      <div class="row m-0 bg-dark text-light">
        <h2>${eventDetail.name}</h2>
      </div>
      <div class="row border border-dark border-opacity-50 mx-0 my-2 rounded-2">
        <p>${eventDetail.description}</p>
      </div>
      <div class="row align-middle m-0">
        <div class="col bg-info d-flex justify-content-center align-items-center rounded me-2"><p class="m-0">Price: $${eventDetail.price}</p></div>
        <div class="col g-0">
          <a href="./index.html" class="btn btn-danger w-100">Back</a>
        </div>
      </div>
    </div>
    </div>`)

  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function stats() {

  let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

  fetch(urlApi)
  .then( result => result.json())
  .then(data => {
    let statistics = {
      capacity:[],
      assistance:[]
    }

    let upcomingEvents = [];
    let pastEvents = [];

    data.events.forEach( element => {
      if(element.assistance) {
        statistics.capacity.push([element.name,element.capacity]);
        statistics.assistance.push([element.name,element.assistance]);

        let index = pastEvents.findIndex(event => event[0] === element.category);

        if (index === -1) {
          pastEvents.push([element.category, element.price * element.assistance, element.assistance])

        } else {
          pastEvents[index][1] += element.price * element.assistance;
          pastEvents[index][2] += element.assistance;
        }

      } else {

        let index = upcomingEvents.findIndex(event => event[0] === element.category);

        if (index === -1) {
          upcomingEvents.push([element.category, element.price * element.estimate, element.estimate])

        } else {
          upcomingEvents[index][1] += element.price * element.estimate;
          upcomingEvents[index][2] += element.estimate;
        }
        
      }
    })

    let totalAttUpcoming = upcomingEvents.reduce((accumulator, currentValue) => accumulator + currentValue[2],0);
    let totalAttPast = pastEvents.reduce((accumulator, currentValue) => accumulator + currentValue[2],0);

    let upcomingTable = document.querySelector('.upcoming-attendance');
    let pastTable = document.querySelector('.past-attendance');

    orderElements(upcomingEvents, 0, false);
    orderElements(pastEvents, 0, false);
    orderElements(statistics.capacity, 1, true);
    orderElements(statistics.assistance, 1, true);

    placeValues('#highestAttendance',statistics.assistance[statistics.assistance.length-1][0]);
    placeValues('#lowestAttendance',statistics.assistance[0][0]);
    placeValues('#largestCapacity',statistics.capacity[statistics.assistance.length-1][0])

    placeRows(upcomingEvents, upcomingTable, totalAttUpcoming);

    placeRows(pastEvents, pastTable, totalAttPast);

    filterCaret('.orderUpcoming', upcomingEvents, upcomingTable, totalAttUpcoming);

    filterCaret('.orderPast', pastEvents, pastTable, totalAttPast);

  })

}

function placeValues(id,value) {
  let element = document.querySelector(id);

  element.innerText = value;
}

function placeRows(object, parentElement, total) {

  parentElement.innerHTML = '';
  
  let fragment = document.createDocumentFragment();

  object.forEach( element => {

    let tr = document.createElement('tr');

    tr.innerHTML = `<td>${element[0]}</td>
    <td>$${element[1]}</td>
    <td>${(element[2]/total).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}</td>`

    fragment.appendChild(tr);
  })

  parentElement.appendChild(fragment);
}

function orderElements(arrayToOrder, index, numeric) {
  if(numeric){
    arrayToOrder.sort((a,b)=>b[index]-a[index]);
  } else {
    arrayToOrder.sort();
  }
}

function filterCaret(itemClass,object, parentElement, total) {

  let iterable = Array.from(document.querySelectorAll(itemClass));

  iterable.forEach( element => {
    element.addEventListener('click',(e) => {
      orderElements(object, parseInt(e.target.id), typeof object[0][parseInt(e.target.id)] === 'number');
      placeRows(object, parentElement, total);
    })
  })

}

