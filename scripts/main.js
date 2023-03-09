// Funciones Expresadas

let searchedCat = (data, searchedValue) => {

    let searchedCat = [];
  
    data.forEach( event => {
  
      if(event.name.toLowerCase().includes(searchedValue.toLowerCase()) || event.description.toLowerCase().includes(searchedValue.toLowerCase())) {
    
        searchedCat.push(event);
    
      }
    })
  
    return searchedCat;
  
  }
  
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
                    <a href="./details.html?id=${element.id}" class="btn btn-primary">See more...</a>
                  </div>
              </div>
          </div>`
  
      fragment.appendChild(div);
  
    });
  
    divEvent.appendChild(fragment);
  
    }
  }
  
  function findCategories(inputObject) {
  
    let categories = [];
  
    inputObject.forEach( element => {
  
      // if(categories.indexOf(element.category) === -1) {
      //   categories.push(element.category);
      // }
  
      if(!categories.includes(element.category)) {
        categories.push(element.category);
      }
  
    })
  
    return categories;
  }
  
  function placeCategories(categoriesArray) {
  
    let divCategories = document.querySelector('div.categories');
  
    categoriesArray.forEach( (element,index) => {
  
    divCategories.insertAdjacentHTML('beforeend', `<div class="form-check mx-3">
        <input class="form-check-input" type="checkbox" value="${element}" id="${element}">
        <label class="form-check-label" for="${element}">${element}</label>
      </div>`)
    })
  }
  
  function filterCategory(data) {
  
    let catCheck = document.querySelectorAll('.form-check-input');
  
    catCheck.forEach( element => element.addEventListener('click',(e) => {
  
      placeCards(filteredCat(data));
    
    }))
    
  }
  
  function searchBar(data) {
  
    let searchBar = document.querySelector('input.form-control');
  
    searchBar.addEventListener('input',(e) => {
    
      let searchedValue = document.querySelector('input.form-control').value;
    
      let catChecked = filteredCat(data);
  
      searchedCat(catChecked, searchedValue)
  
      placeCards(searchedCat(catChecked, searchedValue));
  
    })
  
  }
  
  const queryString = location.search;
  
  const params = new URLSearchParams(queryString);
  
  const id = params.get('id');
  
  const eventDetail = data.events.find(event => event.id.toString() === id)
  
  let detail = document.querySelector('div.detail');
  
  if(detail) {
  
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
  