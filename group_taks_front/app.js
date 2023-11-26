let topShowIds = ['tt2861424','tt2356777','tt0903747','tt7366338','tt3032476','tt6741278','tt3581920','tt5180504','tt14688458','tt8772296','tt0306414','tt13622776'];
var baseUrl = 'https://api.tvmaze.com/lookup/shows';
var scheduledUrl = 'https://api.tvmaze.com/schedule/web';
var date = new Date();


function constructShowScheduleUrl()
{
    const formattedDate = date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    return new URL(`?date=${formattedDate}`,scheduledUrl).toString();
}

async function getScheduledMovies()
{
    const response = await fetch(constructShowScheduleUrl());
    const movies = await response.json();
    return movies;
}

function constructShowImdbId(id)
{
    let url = new URL(`?imdb=${id}`,baseUrl).toString();
    return url;
}


async function getImageUrl(url)
{    
    const response = await fetch(url);
    const movie = await response.json();
    const image = movie.image.medium;
    console.log(image);
    return image;
}

async function loadTopShows()
{
    let topshows = document.getElementsByClassName('topshows')[0];
    
    let urls = topShowIds.map(imdbid => constructShowImdbId(imdbid));
    let container = topshows.getElementsByClassName('card-slider-container')[0];
    
    urls.forEach(async url =>
        {
            let a = document.createElement('a');
            a.href = url;
            a.classList.add('card');
            let img = document.createElement('img');
            img.src = await getImageUrl(url);
            a.appendChild(img);
            container.appendChild(a);
        });

    // urls.forEach(async url => container.appendChild(`<a class="card" href="${url}">
    // <img src="${await getImageUrl(url)}"></img></a>`));

    return urls;
}

async function loadNowShows()
{
    let scheduledShows = await getScheduledMovies();
    console.log(scheduledShows);

    let topshows = document.getElementsByClassName('nowshows')[0];
    
    let container = topshows.getElementsByClassName('card-slider-container')[0];
    
    scheduledShows.forEach(async show =>
        {
            let a = document.createElement('a');
            a.href = '$';
            a.classList.add('card');
            let img = document.createElement('img');
            img.src = show._embedded.show.image.medium;
            a.appendChild(img);
            container.appendChild(a);
        });

}


loadTopShows();
loadNowShows();


