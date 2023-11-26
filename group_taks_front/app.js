let topShowIds = ['tt2861424','tt2356777','tt0903747','tt7366338','tt3032476','tt6741278','tt3581920','tt5180504','tt14688458','tt8772296','tt0306414','tt13622776'];
var baseUrl = 'https://api.tvmaze.com/lookup/shows';



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
    let urls = topShowIds.map(imdbid => constructShowImdbId(imdbid));
    let container = document.getElementsByClassName('card-slider-container')[0];
    
    

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


loadTopShows();
