'use.strict';
const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const listFilm = document.querySelector('.js-listFilm');
const imgPlaceholder = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
const film = input.value; //la defino fuera para poder usarla en mas de una funcion
const listfavoritesfilm = document.querySelector ('.js-listFavorites')
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
      // paintFavorite ();
      // setLocalStorage ();
      
    });
}

//Funcion que pinte los datos, que la llamo desde la funcion que pide los datos al servidor.

function paintFlims() {
  let ulHtml = '';
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const showFilm = movie.show;
    //Añadir clase para favorito
    let classF;
    const favoriteIndex = favoriteFilm.indexOf(i); //AQUI ME BUSCA EL ID PERO QUIERO QUE ME BUSQUE EL OBJETO
    const favorite = favoriteIndex !== -1;
    if (favorite === false){
      classF = 'background_title_color'
    } else {classF= ''}
    //Añadir clase para favorito

    ulHtml += `<li class ="${classF} js_film_item" id = '${i}}'>`;
    ulHtml += `<h2>${showFilm.name}</h2>`;
    ulHtml += `<div>`;
    if (showFilm.image!== null) {
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
  // const film = input.value;
  getData(film);
}
button.addEventListener('click', searchFilms);

//FAVORITOS

function favoriteListFilm(ev) {
  const clicked = parseInt(ev.currentTarget.id);
  const indexFav = favoriteFilm.indexOf(movies[clicked]);

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

  // const indexFav = favoriteFilm.indexOf(clicked);
  const isFavorite = indexFav !== -1;
  console.log(isFavorite);

  if (isFavorite === false) {
    console.log('lo meto');
    favoriteFilm.push(movies[clicked]); //AQUI QUIERO QUE ME META EL OBJETO. NO EL ID!!!
  } else {
    console.log('lo quito');
    favoriteFilm.splice(indexFav, 1);
  }
  console.log(favoriteFilm);

 
  paintFlims();
  listentListFilms();
  // paintFavorite ();
}


// function paintFavorite () {
//   const listfavoritesfilm = document.querySelector ('.js-listFavorites')

//   let ulhtmlFavorite = "";
  
//   for (let i = 0; i< favoriteFilm.length; i++) {
//     const itemFavorite = favoriteFilm[i];
//     console.log(itemFavorite);
//     console.log (favoriteFilm);
//     ulhtmlFavorite += `<li id = '${favoriteFilm[i].show.id}'>`;
//     ulhtmlFavorite += `<h2>${itemFavorite.show.name}</h2>`;
//     ulhtmlFavorite += `<div>`;
//     if (showFilm.image!== null) {
//       ulhtmlFavorite += `<img src="${itemFavorite.show.image.medium}" alt="${film}" />`;
//     } else {
//       ulhtmlFavorite += `<img src="${imgPlaceholder}" alt="${film}" />`;
//     }
//     ulhtmlFavorite += `</div>`;
//     ulhtmlFavorite += `</li>`;
//   }
  
//   listfavoritesfilm.innerHTML = ulhtmlFavorite;
//   }

  // una funcion del que escucha el evento, donde: se recoge la lista de peliculas (no la podemos poner fuera porque no existe al arrancar la pagina), y el evento). Esta funcion la ponemos en getData

function listentListFilms() {
  const listFilm = document.querySelectorAll('.js_film_item');

  for (const itemFilm of listFilm) {
    itemFilm.addEventListener('click', favoriteListFilm);
  }
}

//Local Storage

// function setLocalStorage (){
//   localStorage.setItem ("FavoritesFilm", JSON.stringify(favoriteFilm));
// }
// //cuando esta vacio el localstorage hacer la peticion al servidor y si no esta vacio se la hacemos al local

// function getLocalStorage () {
//   const localFavoriteFilm = localStorage.getItem ("FavoriteFilm")
//   const localFavoriteFilmJ = JSON.parse (localFavoriteFilm);
//   if (localFavoriteFilmJ === null) {
//     getData()
// } else {
//   favoriteFilm = localFavoriteFilmJ;
//   paintFlims();
//   listentListFilms ();
// }
// getData ();