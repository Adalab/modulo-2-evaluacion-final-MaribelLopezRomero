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
  const film = input.value;
  fetch(`//api.tvmaze.com/search/shows?q=${film}`)
    .then((filmResponse) => filmResponse.json())
    .then((filmData) => {
      movies = filmData;
      paintFlims();
      listentListFilms();
    });
}

function searchFilms() {
  getData(film);
}
button.addEventListener('click', searchFilms);

//Funcion que pinte los datos al buscar.

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

//FAVORITOS

// Funcion del que escucha el evento sobre cada li que se genera al hacer la busqueda.

function listentListFilms() {
  const listFilm = document.querySelectorAll('.js_film_item');

  for (const itemFilm of listFilm) {
    itemFilm.addEventListener('click', favoriteListFilm);
  }
  paintFavorite();
  setLocalStorage();
}

// Funcion manejadora del evento.

function favoriteListFilm(ev) {
  const clicked = parseInt(ev.currentTarget.id);
  const indexFav = favoriteFilm.findIndex(
    (fav) => fav.show.id === movies[clicked].show.id
  );
  const isFavorite = indexFav !== -1;
  console.log(isFavorite);

  if (isFavorite === false) {
    favoriteFilm.push(movies[clicked]);
  } else {
    favoriteFilm.splice(indexFav, 1);
  }
  paintFlims();
  listentListFilms();
}
//Funcion que pinta la lista de favoritos
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

//Local Storage

function setLocalStorage() {
  localStorage.setItem('FavoritesFilm', JSON.stringify(favoriteFilm));
}
function getLocalStorage() {
  const localFavoriteFilm = localStorage.getItem('FavoritesFilm');
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
