const API_KEY="38e497c6c1a043d1341416e80915669f";

let selectedMovie=null;

document
.getElementById("search")
.addEventListener("input",async e=>{

const query=e.target.value;

if(query.length<2)return;

const res=await fetch(
`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(query)}`
);

const data=await res.json();

let html="";

data.results.forEach(item=>{

if(!item.poster_path)return;

html+=`
<div class="card"
onclick='selectMovie(${JSON.stringify(item)})'>

<img src="https://image.tmdb.org/t/p/w300${item.poster_path}">

<span>${item.title||item.name}</span>

</div>
`;

});

document.getElementById("results").innerHTML=html;

});

function selectMovie(movie){

selectedMovie=movie;

alert(
(movie.title||movie.name)+" seleccionada"
);

}

function setMode(mode){

document.getElementById("tmdb-mode").style.display=
mode==="tmdb"?"block":"none";

document.getElementById("manual-mode").style.display=
mode==="manual"?"block":"none";

}

function generateLink(){

if(selectedMovie){

const title=
encodeURIComponent(
selectedMovie.title||selectedMovie.name
);

const poster=
encodeURIComponent(
"https://image.tmdb.org/t/p/original"+
selectedMovie.poster_path
);

const backdrop=
encodeURIComponent(
"https://image.tmdb.org/t/p/original"+
selectedMovie.backdrop_path
);

const video=
encodeURIComponent(
document.getElementById("video-url").value
);

const link=
`player.html?title=${title}&poster=${poster}&backdrop=${backdrop}&video=${video}`;

document.getElementById("output")
.innerHTML=`<a href="${link}" target="_blank">${link}</a>`;

}

}
