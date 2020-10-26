'use.strict';
const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const listFilm = document.querySelector('.js-listFilm');
const imgPlaceholder =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const film = input.value;
const listfavoritesfilm = document.querySelector('.js-listFavorites');
let movies = [];
let favoriteFilm = [];

function getData() {
  const film = input.value; //si la quito aqui no me funciona
  fetch(`//api.tvmaze.com/search/shows?q=${film}`)
    .then((filmResponse) => filmResponse.json())
    .then((filmData) => {
      //   console.log(filmData);
      movies = filmData; //guardo fuera de la funcion el array de objetos
      paintFlims();
      listentListFilms();
    });
}
getLocalStorage();

//Funcion que pinte los datos, que la llamo desde la funcion que pide los datos al servidor.

function paintFlims() {
  let ulHtml = '';
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const showFilm = movie.show;
    //Añadir clase para favorito
    let classF;
    const favoriteIndex = favoriteFilm.filter(
      (favIndex) => favIndex.show.id === movie.show.id
    );
    if (favoriteIndex.length > 0 === true) {
      classF = 'background_title_color';
    } else {
      classF = '';
    }
    console.log (favoriteIndex)
    // if (favoriteFilm.length > 0 === true) {
    //   classF = 'background_title_color';
    // } else {
    //   classF = '';
    // }
    //DOM
    ulHtml += `<li class = "${classF} js_film_item" id = '${i}}'>`;
    ulHtml += `<h2>${showFilm.name}</h2>`;
    ulHtml += `<div>`;
    if (showFilm.image !== null) {
      ulHtml += `<img src="${showFilm.image.medium}" alt="${film}" />`;
    } else {
      ulHtml += `<img src="${imgPlaceholder}" alt="${film}" />`;
    }
    ulHtml += `</div>`;
    ulHtml += `</li>`;
  }

  listFilm.innerHTML = ulHtml;
}

// metemos la funcion get data en la funcion search movie, para que cuando le demos al boton llame a la funcion get data, que esa a su vez llama a la funcion paintfilms

function searchFilms() {
  getData(film);
}
button.addEventListener('click', searchFilms);

//FAVORITOS

function favoriteListFilm(ev) {
  const clicked = parseInt(ev.currentTarget.id);
  const indexFav = favoriteFilm.indexOf(movies[clicked]);
  const isFavorite = indexFav !== -1;
  console.log(isFavorite);

  if (isFavorite === false) {
    console.log('lo meto');
    favoriteFilm.push(movies[clicked]);
  } else {
    console.log('lo quito');
    favoriteFilm.splice(indexFav, 1);
  }
  console.log(favoriteFilm);

  paintFlims();
  listentListFilms();
}

function paintFavorite() {
  const listfavoritesfilm = document.querySelector('.js-listFavorites');
  let ulhtmlFavorite = '';
  ulhtmlFavorite += `<h2>Mis series favoritas</h2>`;
  for (let i = 0; i < favoriteFilm.length; i++) {
    const itemFavorite = favoriteFilm[i];
    ulhtmlFavorite += `<li class = ""id = '${favoriteFilm[i].show.id}'>`;
    ulhtmlFavorite += `<h2>${itemFavorite.show.name}</h2>`;
    ulhtmlFavorite += `<div>`;
    if (itemFavorite.show.image !== null) {
      ulhtmlFavorite += `<img src="${itemFavorite.show.image.medium}" alt="${film}" />`;
    } else {
      ulhtmlFavorite += `<img src="${imgPlaceholder}" alt="${film}" />`;
    }
    ulhtmlFavorite += `</div>`;
    ulhtmlFavorite += `</li>`;
  }

  listfavoritesfilm.innerHTML = ulhtmlFavorite;
}

// una funcion del que escucha el evento, donde: se recoge la lista de peliculas (no la podemos poner fuera porque no existe al arrancar la pagina), y el evento). Esta funcion la ponemos en getData

function listentListFilms() {
  const listFilm = document.querySelectorAll('.js_film_item');

  for (const itemFilm of listFilm) {
    itemFilm.addEventListener('click', favoriteListFilm);
  }
  paintFavorite();
  setLocalStorage();
}

//Local Storage

function setLocalStorage() {
  localStorage.setItem('FavoritesFilm', JSON.stringify(favoriteFilm));
}
//cuando esta vacio el localstorage hacer la peticion al servidor y si no esta vacio se la hacemos al local

function getLocalStorage() {
  const localFavoriteFilm = localStorage.getItem('FavoriteFilm');
  const localFavoriteFilmJ = JSON.parse(localFavoriteFilm);
  if (localFavoriteFilmJ === null) {
    getData();
  } else {
    favoriteFilm = localFavoriteFilmJ;
    paintFlims();
    listentListFilms();
  }
}
getLocalStorage();
