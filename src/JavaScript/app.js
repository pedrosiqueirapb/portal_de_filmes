requisicao("https://api.themoviedb.org/3/movie/popular?api_key=32f42fc190830e705f73dca17d56ebf7");

function requisicao(url){
fetch(url)
    .then(response=>{ 
        return response.json(); // retorna a resposta em formato JSON
    })
    .then(json =>{ // função que manipula o JSON retornado acima
        exibeFilmes(json.results);
    })
}

function exibeFilmes(data){

    document.querySelector('main').innerHTML = `
    <div class="container">
        <div class="row">
        
        </div>
    </div>
    `;

    data.forEach(element => { // para cada resultado do objeto JSON
        const{title, vote_average, overview, poster_path} = element;
        const tag = document.createElement('div'); // cria um elemento <div>
        tag.classList.add('filme', 'col-lg-5'); // adiciona as seguintes classes a esse novo elemento
        tag.innerHTML = `
        <div class="poster">
            <img src="${setPosterPath("https://image.tmdb.org/t/p/w400/" + poster_path)}" alt="${title}">
        </div>
        <div class="infos">
            <div class="titulo">
                <h5>${title}</h5>
                <span id="avaliacao">${alterCasaDecimal(vote_average)}</span>
            </div>

            <div class="sinopse">
                <h5>Sinopse</h5>
                <p>${overview}</p>
            </div>
        </div>
        `; // cria a estrutura da <div>
        
        document.querySelector('.row').appendChild(tag); // adiciona o filme dentro da tag <main>
    });
}

function setPosterPath(path){
    if(path !== "https://image.tmdb.org/t/p/w400/null") // verifica se há um poster para o filme
        return path;
    else
        return '../imgs/padrao.png'; // se não houver, retorna uma imagem informando que não há poster para o filme
}

// função para alterar a nota do filme para um valor padrão
function alterCasaDecimal(vote){
    var string = vote.toString();

    if(string.length == 1)
        return `${string}`+".0";
    else if(string.length == 4)
        return string.slice(0, -1); // extrair o último caractere da string
    else if(string.length == 5)
        return string.slice(0, -2); // extrair os dois últimos caracteres da string
    else
        return string;
}

const form = document.querySelector('#formSearch');
const inputSearch = document.querySelector('#search');
const titulo = document.querySelector('#titulo');

// evento caso o usuário pressione Enter ao digitar algo
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(inputSearch.value.length != 0){ // se o usuário digitar algo
        requisicao(`https://api.themoviedb.org/3/search/movie?api_key=32f42fc190830e705f73dca17d56ebf7&query=${inputSearch.value}`);
        titulo.innerHTML = `<h1 id="titulo">${inputSearch.value}</h1>`;
    }
    else{
        requisicao("https://api.themoviedb.org/3/movie/popular?api_key=32f42fc190830e705f73dca17d56ebf7");
        titulo.innerHTML = `<h1 id="titulo">Filmes Populares</h1>`;
    }
})

const btnSearch = document.querySelector('.bi-search');
// evento caso o usuário clique no botão de pesquisar
btnSearch.addEventListener('click', ()=>{
    if(inputSearch.value.length != 0){
        requisicao(`https://api.themoviedb.org/3/search/movie?api_key=32f42fc190830e705f73dca17d56ebf7&query=${inputSearch.value}`);
        titulo.innerHTML = `<h1 id="titulo">${inputSearch.value}</h1>`;
    }
    else{
        requisicao("https://api.themoviedb.org/3/movie/popular?api_key=32f42fc190830e705f73dca17d56ebf7");
        titulo.innerHTML = `<h1 id="titulo">Filmes Populares</h1>`;
    }
});