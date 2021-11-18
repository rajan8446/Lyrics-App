const form=document.getElementById('form');
const search=document.getElementById('search');
const result=document.getElementById('result');
const more = document.getElementById("more");

const apiURL = 'https://api.lyrics.ovh';

form.addEventListener('submit', e => {
    e.preventDefault();
    searchValue = search.value.trim();

    if (!searchValue) {
        alert('There is nothing to search !!!!')
    } else {
        searchSong(searchValue)
    }
})

//Search Song
async function searchSong(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    showData(data)
}

// DOM manipulation
function showData(data) {
    result.innerHTML = `
    <div id="div1"><ul class="song-list">
    ${data.data.map(song=>`<li class="list">
                            <div>
                                <strong>
                                ${song.artist.name}
                                </strong> -${song.title}
                            </div>
                            <span data-artist="${song.artist.name}" data-songtitle="${song.title}">
                                Get lyrics
                            </span>
                            </li>
                               
    `).join('')
    }
    </ul></div>
    `
}


result.addEventListener('click', e => {
    const clickedElement = e.target;

    if (clickedElement.tagName === 'SPAN') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        try {
            getLyrics(artist, songTitle)
        } catch (err) {
            alert("Lyrics not available for this song !!!!")
        }
    }
})

async function getLyrics(artist, songTitle) {
    try{
        const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
        const data = await res.json();
    
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br/>');
        result.innerHTML = `  <h2 id="h2"> <strong> 
                                 ${artist} 
                                 </strong> - ${songTitle}
                            </h2>
                            <p id="p"> ${lyrics} </p>
                            <div id="div"><h1>Thank You🙂</h1></div>
                        `
    }catch(err){
        alert("Lyrics Not Found☹️");
    }
}
