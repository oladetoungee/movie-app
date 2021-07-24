
// api_key=a809e5ad094e35b23ba696341513153b

// const APIKEY = 'a809e5ad094e35b23ba696341513153b'
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popualrity.desc&api_key=a809e5ad094e35b23ba696341513153b'
const SEARCHURL = 'https://api.themoviedb.org/3/search/movie?&api_key=a809e5ad094e35b23ba696341513153b&query='


const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


getMovies(APIURL)
async function getMovies(url) {
    const resp = await fetch(url)
    const respData = await resp.json()

        
    showMovies(respData.results)
   
}


function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach(movie => {
        const {poster_path, title,
            backdrop_path, overview, vote_average} = movie

        const movieEl = document.createElement('div')
        
        movieEl.classList.add('movie')
        
        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" 
            alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h4>Overview:</h4>
                ${overview}
            </div>
        `
       main.appendChild(movieEl)
    });
}

function getClassByRate(vote) {
    if (vote>= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm) {

        getMovies(SEARCHURL + searchTerm)
         
        search.value = ''
    }
})

