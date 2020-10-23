'use.strict';
const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const listFilm = document.querySelector('.js-listFilm');
const film = input.value; //la defino fuera para poder usarla en mas de una funcion
let movies = [];
let favoriteFilm = [];

function getData() {
  const film = input.value; //si la quito aqui no me funciona
  fetch(`http://api.tvmaze.com/search/shows?q=${film}`)
    .then((filmResponse) => filmResponse.json())
    .then((filmData) => {
      //   console.log(filmData);
      movies = filmData; //guardo fuera de la funcion el array de objetos
      paintFlims();
      listentListFilms();
    });
}

//Funcion que pinte los datos, que la llamo desde la funcion que pide los datos al servidor.

function paintFlims() {
  let ulHtml = '';
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const showFilm = movie.show;
    console.log(showFilm);
    ulHtml += `<li class ="background_title_color js_film_item" id = '${i}'>`;
    ulHtml += `<h2>${showFilm.name}</h2>`;
    ulHtml += `<div>`;
    ulHtml += `<img src="${showFilm.image.medium}" alt="imagen ${film}">`;
    // ulHtml += `<img`
    // if (showFilm.image === undefined) {
    //     src=`"https://placeholder.com" `
    // } else {src=`"${showFilm.image.medium}" `}
    // `alt="imagen ${film}">`
    ulHtml += `</div>`;
    ulHtml += `</li>`;
  }

  listFilm.innerHTML = ulHtml;
}

// metemos la funcion get data en la funcion search movie, para que cuando le demos al boton llame a la funcion get data, que esa a su vez llama a la funcion paintfilms

function searchFilms() {
  // const film = input.value;
  getData(film);
}
button.addEventListener('click', searchFilms);

//FAVORITOS

function favoriteListFilm(ev) {
  const clicked = parseInt(ev.currentTarget.id);

  // const isFavorite = favoriteFilm.indexOf(clicked);
  // console.log(isFavorite);

  // if (isFavorite === -1) {
  //   console.log('lo meto');
  //   favoriteFilm.push(clicked);
  // } else {
  //   console.log('lo quito');
  //   favoriteFilm.splice(clicked);
  // }
  // console.log(favoriteFilm);

  const indexFav = favoriteFilm.indexOf(clicked);
  const isFavorite = indexFav !== -1;
  console.log(isFavorite);

  if (isFavorite === false) {
    console.log('lo meto');
    favoriteFilm.push(clicked);
  } else {
    console.log('lo quito');
    favoriteFilm.splice(indexFav,1);
  }
  console.log(favoriteFilm);

  
  // paintFlims();
  // listentListFilms();
}


// una funcion del que escucha el evento, donde: se recoge la lista de peliculas (no la podemos poner fuera porque no existe al arrancar la pagina), y el evento). Esta funcion la ponemos en getData

function listentListFilms() {
  const listFilm = document.querySelectorAll('.js_film_item');

  for (const itemFilm of listFilm) {
    itemFilm.addEventListener('click', favoriteListFilm);
  }
}
