'use.strict';
const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const listFilm = document.querySelector('.js-listFilm');

//Funcion de busqueda de peliculas con peticion al servidor
let film = input.value; //la defino fuera para poder usarla en mas de una funcion
let movies = [];

function getData() {
  let film = input.value; //quitarlo de aqui
  fetch(`http://api.tvmaze.com/search/shows?q=${film}`)
    .then((filmResponse) => filmResponse.json())
    .then((filmData) => {
      //   console.log(filmData);
      movies = filmData; //guardo fuera de la funcion el array de objetos
      paintFlims()
    });
}

//Funcion que pinte los datos, que la llamo desde la funcion que pide los datos al servidor.

function paintFlims() {
  let ulHtml  = '';
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const showFilm = movie.show;
    console.log(showFilm);
    ulHtml += `<li>`;
    ulHtml += `<h2>${showFilm.name}</h2>`
    ulHtml += `<div>`
    ulHtml += `<img src="${showFilm.image.medium}" alt="imagen ${film}">`
    ulHtml += `</div>`
    ulHtml += `</li>`
  }
  
  listFilm.innerHTML = ulHtml;
}

button.addEventListener('click', getData);
