let topShowIds = ['tt2861424','tt2356777','tt0903747','tt7366338','tt3032476','tt6741278','tt3581920','tt5180504','tt14688458','tt8772296','tt0306414','tt13622776'];
var baseUrl = 'https://api.tvmaze.com/lookup/shows';
var scheduledUrl = 'https://api.tvmaze.com/schedule/web';
var detailsUrl = './filmdetail.html';
var date = new Date();
var searchterm = '';
var searchmode = false;

document.getElementsByClassName("searchbar")[0].addEventListener('input', search);
document.getElementById("searchsubmit").addEventListener('click',searchsubmit);
const nonsearch = document.getElementById("non-search-section");
const searchsection = document.getElementById("search-section");
const searchinfo = document.getElementById("searchinfo");
const searchresultarea = document.getElementById("searchresultarea");

async function search()
{    
    console.log(this.value);
    searchterm = this.value ?? '';
    if(searchterm != '')
    {
        SearchMode();
        searchinfo.innerHTML = `Search result for: ${this.value}`;
        await searchsubmit();
    }
    else
    NonSearchMode();  
}
async function searchsubmit()
{
    await loadSearchResult();
}

async function loadSearchResult()
{
    searchresultarea.innerHTML = '';
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchterm}`);
    const shows = await response.json();
    shows.forEach(s=>
        {            
            searchresultarea.innerHTML += `<a class="search-card" href="${detailsUrl}?id=${s.show.id}">
            <img  src="${s.show.image.medium}"></img>
        </a>`;
        });
    
}



function SearchMode()
{
    nonsearch.classList.add('invisible');
    searchsection.classList.add('visible');
    searchmode = true;
}
function NonSearchMode()
{
    searchmode = false;
    nonsearch.classList.remove('invisible');
    searchsection.classList.remove('visible');
}


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


async function getMovieDetails(url)
{    
    const response = await fetch(url);
    const movie = await response.json();
    const image = movie.image.medium;
    const id = movie.id;

    return [image,id];
}

async function loadTopShows()
{
    let topshows = document.getElementsByClassName('topshows')[0];
    
    let urls = topShowIds.map(imdbid => constructShowImdbId(imdbid));
    let container = topshows.getElementsByClassName('card-slider-container')[0];
    

    urls.forEach(async url =>
        {
            let a = document.createElement('a');
            const [imgsrc,id] = await getMovieDetails(url);
            a.href = `${detailsUrl}?id=${id}`;
            a.classList.add('card');
            let img = document.createElement('img');
            img.src = imgsrc;
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
            a.href = `${detailsUrl}?id=${show._embedded.show.id}`;
            a.classList.add('card');
            let img = document.createElement('img');
            img.src = show._embedded.show.image.medium;
            a.appendChild(img);
            container.appendChild(a);
        });

}


loadTopShows();
loadNowShows();


