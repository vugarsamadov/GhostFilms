async function main() {

    var params = (new URL(document.location)).searchParams;
    var id = params.get("id");
    const baseUrl = 'https://api.tvmaze.com/shows/';
    
    const imageElement = document.getElementsByClassName('movie-thumbnail')[0];
    const movieNameElement = document.getElementsByClassName('movie-name')[0];
    const movieGenresContainerElement = document.getElementsByClassName('genres-container')[0];
    const movieSynopsisElement = document.getElementsByClassName('movie-synopsis')[0];
    const movieReviewElement = document.getElementsByClassName('movie-review')[0];
    const movieSmalDetailElement = document.getElementsByClassName('movie-smal-details')[0];
    const castContainer = document.getElementsByClassName('detailcard-container')[0];


    

    console.log(baseUrl + id+'?embed=cast');
    var response = await fetch(baseUrl + id+'?embed=cast');
    const movie = await response.json();
    const cast = movie._embedded.cast;
    console.log(cast);
    

    const image = movie.image.medium;
    imageElement.src = image;

    const name = movie.name;
    movieNameElement.innerHTML = name;

    const genres = movie.genres;

    genres.forEach(genre => {
        let genreElement = document.createElement('button');
        genreElement.classList.add('genre');
        genreElement.innerHTML = genre;
        movieGenresContainerElement.appendChild(genreElement);
    });

    const synopsis = movie.summary;
    movieSynopsisElement.innerHTML = synopsis;

    const review = movie.rating.average;
    movieReviewElement.innerHTML = review;

    const premierdate = movie.premiered;
    const enddate = movie.ended ?? 'now';

    movieSmalDetailElement.innerHTML = premierdate+' - '+enddate;


    cast.forEach(c => 
        {
            castContainer.innerHTML +=
            `    <div class="detailcard">
        
            <div class="deatilcard-details">
                <p class="person">${c.person.name}</p>
                <p class="character">${c.character.name}</p>
            </div>
            <img class="detailcard-thumbnail" src="${c.person.image.medium}"  >
        </div>`
        });

}

main();

