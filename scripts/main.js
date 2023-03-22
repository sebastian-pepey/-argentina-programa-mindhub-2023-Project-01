// Funciones Expresadas

// SearchedCat
// Parámetros: <<arreglo de objetos>> "data" y <<string>> valor buscado "searchedValue".
// Retorna: <<arreglo de objetos>> searchedCat.
// Qué hace: Recorre data comparando los strings normalizados de nombre y descripcion de data con la string searchedValue.

let searchedCat = (data, searchedValue) => {
  let searchedCat = [];
  data.forEach(event => {
      if (event.name.toLowerCase().includes(searchedValue.toLowerCase()) || event.description.toLowerCase().includes(searchedValue.toLowerCase())) {
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
  let dataFiltered = [];
  if (catChecked.length === 0) {
      return searchedCat(data, searchedValue);
  } else {
    catChecked.forEach(category => {
      data.forEach(event => {
        if (event.category === category.defaultValue) {
          dataFiltered.push(event)
        }
      })
    })
    return searchedCat(dataFiltered, searchedValue);
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  if (inputObject.length === 0) {
    let sign = document.createElement('h2');
    sign.innerText = 'La búsqueda no arrojó ningún resultado';
    divEvent.appendChild(sign);
  } else {
    let fragment = document.createDocumentFragment();
    inputObject.forEach(element => {
      let div = document.createElement('div');
      div.classList.add('card', 'mx-2', 'my-3')
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
  inputObject.forEach(element => {
    if (! categories.includes(element.category)) {
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
  categoriesArray.forEach(element => {
    divCategories.insertAdjacentHTML('beforeend', `<div class="form-check mx-3">
      <input class="form-check-input" type="checkbox" value="${element}" id="${element}">
      <label class="form-check-label" for="${element}">${element}</label>
    </div>`)
  })
  let button = document.createElement('button');
  button.classList.add('btn', 'btn-success', 'clearFilters', 'py-0');
  button.innerText = "Clear Categories"
  button.addEventListener('click', () => {
    let catCheck = document.querySelectorAll('.form-check-input');
    catCheck.forEach(category => category.checked = false);
    fetchData(urlApi, clearCategories);
  })
  divCategories.appendChild(button);
}

function clearCategories(data) {
  placeCards(filteredCat(data.events));
}

// filterCategory
// Parámetros: <<arreglo>> "data".
// Retorna: Nada.
// Qué hace: Le agrega a cada checkbox un evento "click", el cual desencadena la función placeCards(), recibiendo como argumento
// filteredCat(data). De esta manera, se aplican los filtros sobre los datos cada vez que se efectúa un click sobre las categorías.

function filterCategory(data) {
  let catCheck = document.querySelectorAll('.form-check-input');
  catCheck.forEach(element => element.addEventListener('click', (e) => {
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
  searchBar.addEventListener('input', (e) => {
    let searchedValue = document.querySelector('input.form-control').value;
    let catChecked = filteredCat(data);
    placeCards(searchedCat(catChecked, searchedValue));
  })
}

// Captura de parámetro id de la URL, guardado en variable y renderización por medio de manipulación del DOM.

let detail = document.querySelector('div.detail');
if (detail) {
  fetchData(urlApi, placeDetails);
}

function placeDetails(data) {
  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get('id');
  const eventDetail = data.events.find(event => event._id.toString() === id);
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
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

function stats(data) {

  let statistics = {
    upcomingEvents: {},
    pastEvents: {}
  }

  data.events.forEach(element => {
    if (element.assistance) {
      if(!(element.category in statistics.pastEvents)){
        statistics.pastEvents[element.category] = [] 
      }
      statistics.pastEvents[element.category].push(
        [
          element.name,
          element.capacity,
          element.price * element.assistance,
          element.assistance,
          element.assistance/element.capacity
        ]
      )
    } else {
      if(!(element.category in statistics.upcomingEvents)){
        statistics.upcomingEvents[element.category] = [] 
      }
      statistics.upcomingEvents[element.category].push(
        [
          element.name,
          element.capacity,
          element.price * element.estimate,
          element.estimate,
          element.estimate/element.capacity
        ]
      )
    }
  })

  let initialRegister = 5;
  let arrayStatistics = Object.values(statistics.pastEvents).flat();
  let lastElementStats = arrayStatistics.length-1;
  orderElements(arrayStatistics, 4, true,-1);
  let maxMinTable = document.querySelector('tbody#max-min-values');
  let upcomingTable = document.querySelector('tbody#upcoming-attendance');
  let pastTable = document.querySelector('tbody#past-attendance');
  let select = document.querySelector('select.form-select');
  arrayStatistics.forEach((element,index)=>{
    select.innerHTML +=`<option value="${index+1}" ${index === initialRegister-1? " selected":""}>${index+1}</option>`
  })

  orderElementsByEvent(arrayStatistics, lastElementStats, initialRegister, maxMinTable)
  
  select.addEventListener('change',(e) => {
    maxMinTable.innerHTML ='';
    orderElementsByEvent(arrayStatistics, lastElementStats, parseInt(e.target.value), maxMinTable)
  });
  

  placeRows(reduceObject(statistics.upcomingEvents), upcomingTable);
  placeRows(reduceObject(statistics.pastEvents), pastTable);
  filterCaret('.orderUpcoming', reduceObject(statistics.upcomingEvents), upcomingTable);
  filterCaret('.orderPast', reduceObject(statistics.pastEvents), pastTable);

}

function orderElementsByEvent(array, indexMax, lastElement, parentElement) {
  for(let i = 0; i < lastElement ; i++ ) {
    parentElement.innerHTML += `<tr>
      <td> 
        ${array[indexMax-i][0]} (${array[indexMax-i][4].toLocaleString(undefined, {style: 'percent',minimumFractionDigits: 2})})
      </td>
      <td> 
        ${array[i][0]} (${array[i][4].toLocaleString(undefined, {style: 'percent',minimumFractionDigits: 2})})
      </td>
    </tr>`
  }
  let capacity = array.map( element => element.slice(0,2));
  orderElements(capacity, 1, true, 1);
  let tr = Array.from(parentElement.querySelectorAll('tr'));
  tr.forEach((element, index) => {
    element.innerHTML += `<td>${capacity[index][0]} (${capacity[index][1]} places)</td>`
  })
}

function placeRows(array, parentElement) {
  parentElement.innerHTML = '';
  let fragment = document.createDocumentFragment();
  array.forEach( element => {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${element[0]}</td>
    <td>$${element[1]}</td>
    <td>${element[2].toLocaleString(undefined, {style: 'percent',minimumFractionDigits: 2})}</td>`
    fragment.appendChild(tr);
  })
  parentElement.appendChild(fragment);
}

function orderElements(arrayToOrder, index, numeric, invert) {
  if (numeric) {
      arrayToOrder.sort((a, b) => invert*(b[index] - a[index]));
  } else {
      arrayToOrder.sort();
  }
}

function filterCaret(itemClass, object, parentElement) {
  let iterable = Array.from(document.querySelectorAll(itemClass));
  iterable.forEach(element => {
    element.addEventListener('click', (e) => {
      orderElements(object, parseInt(e.target.id), typeof object[0][parseInt(e.target.id)] === 'number', 1);
      placeRows(object, parentElement);
    })
  })
}

function reduceObject(object) {
  let result = [];
  for(category in object) {
    result.push([category,
    object[category].reduce((accumulator,currentValue) => accumulator + currentValue[2],0),
    object[category].reduce((accumulator,currentValue) => accumulator + currentValue[3],0) / object[category].reduce((accumulator,currentValue) => accumulator + currentValue[1],0)
    ])
  }

  return result;
}