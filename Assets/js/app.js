
const APIController = (function () {
    // keys for spotify
    const clientId = "ec5bc8a3442e44c2932e81c2fccd75b4";
    const clientSecret = "f19cf84e9e7f40ce997c31b8941bb7a4";

    // private methods
    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)

            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    // genre search
    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;

        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 5;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.items;
    }

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    }
})();

// UI Module
const UIController = (function () {

    //object to hold references to html selectors
    const DOMElements = {
        selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        buttonSubmit: '#btn_submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',
        divSonglist: '.song-list'
    }

    // public methods
    return {

        // method to get input fields
        inputField() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                tracks: document.querySelector(DOMElements.divSonglist),
                submit: document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail)

            }
        },

        // need methods to create select list option
        createGenre(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        },

        createPlaylist(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create a track list group item 
        createTrack(id, name) {
            const html = `<td><a href="#" class="custom-song-css" id="${id}">${name}</a></td>`;
            document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create the song detail
        createTrackDetail(img, title, artist) {

            const detailDiv = document.querySelector(DOMElements.divSongDetail);
            // any time user clicks a new song, we need to clear out the song detail div
            detailDiv.innerHTML = '';

            const html =
                `
            <div class="row">
                <img src="${img}" alt="">        
            </div>
            <div class="row">
                <label for="Genre" class="form-label">Song Title: ${title}</label>
            </div>
            <div class="row">
                <label for="artist" class="form-label">By: ${artist}</label>
            </div> 
            `;

            detailDiv.insertAdjacentHTML('beforeend', html)
        },

        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';
        },

        resetTracks() {
            this.inputField().tracks.innerHTML = '';
            this.resetTrackDetail();
        },

        resetPlaylist() {
            this.inputField().playlist.innerHTML = '';
            this.resetTracks();
        },

        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        }
    }
})();

const APPController = (function (UICtrl, APICtrl) {

    // get input field object ref
    const DOMInputs = UICtrl.inputField();

    // get genres on page load
    const loadGenres = async () => {
        //get the token
        const token = await APICtrl.getToken();
        //store the token onto the page
        UICtrl.storeToken(token);
        //get the genres
        const genres = await APICtrl.getGenres(token);
        //populate our genres select element
        genres.forEach(element => UICtrl.createGenre(element.name, element.id));
    }

    // create genre change event listener
    DOMInputs.genre.addEventListener('change', async () => {
        //reset the playlist
        UICtrl.resetPlaylist();
        //get the token that's stored on the page
        const token = UICtrl.getStoredToken().token;
        // get the genre select field
        const genreSelect = UICtrl.inputField().genre;
        // get the genre id associated with the selected genre
        const genreId = genreSelect.options[genreSelect.selectedIndex].value;
        // ge the playlist based on a genre
        const playlist = await APICtrl.getPlaylistByGenre(token, genreId);
        // create a playlist list item for every playlist returned
        playlist.forEach(p => UICtrl.createPlaylist(p.name, p.tracks.href));
    });


    // create submit button click event listener
    DOMInputs.submit.addEventListener('click', async (e) => {
        // prevent page reset
        e.preventDefault();
        // clear tracks
        UICtrl.resetTracks();
        //get the token
        const token = UICtrl.getStoredToken().token;
        // get the playlist field
        const playlistSelect = UICtrl.inputField().playlist;
        // get track endpoint based on the selected playlist
        const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
        // get the list of tracks
        const tracks = await APICtrl.getTracks(token, tracksEndPoint);
        // create a track list item
        tracks.forEach(el => UICtrl.createTrack(el.track.href, el.track.name))

    });

    // create song selection click event listener
    DOMInputs.tracks.addEventListener('click', async (e) => {
        // prevent page reset
        e.preventDefault();
        UICtrl.resetTrackDetail();
        // get the token
        const token = UICtrl.getStoredToken().token;
        // get the track endpoint
        const trackEndpoint = e.target.id;
        //get the track object
        const track = await APICtrl.getTrack(token, trackEndpoint);
        // load the track details
        UICtrl.createTrackDetail(track.album.images[2].url, track.name, track.artists[0].name);
        console.log(track.name);
        console.log(track.artists[0].name);
        const trackResult = track.artists[0].name;

        // // gets giphy related to the user selection
        giphyFunction = function () {
            // var searchTerm = document.querySelector("#band-search").value;
            // console.log(searchTerm);
            fetch("http://api.giphy.com/v1/gifs/search?q=" + trackResult + "&api_key=AdVi5Mrcl5ShIUm7GR1xlk3sOWLeV0sT"
            )
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response.data[0]);
                    console.log("this is ", trackResult);
                    var responseContainerEl = document.querySelector("#response-container");
                    // responseContainerEl.innerHTML = "";
                    var gifImg = document.createElement("img");
                    gifImg.setAttribute("src", response.data[0].images.fixed_height.url);
                    responseContainerEl.appendChild(gifImg);
                    // responseContainerEl.removeChild(responseContainerEl.childNodes[1]);
                });
        }
        giphyFunction(trackResult);
// display song lyrics
        var getSongLyrics = function () {

            var songApi = `https://api.lyrics.ovh/v1/` + track.artists[0].name + "/" + track.name;
            // var songApi = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=humble.&q_artist=Kendrick%20Lamar&apikey=6393f83d3ee7bda4a593005636bb6560`;
            // make fetch
            fetch(songApi).then(function (response) {
                return response.json().then(function (data) {
                    // displayLyrics(data, song);
                    console.log(data.lyrics);
                    var responseContainerEl = document.querySelector("#lyric-container");
                    responseContainerEl.innerHTML = data.lyrics;
                    var gifImg = document.createElement("span");
                    // gifImg.setAttribute("src", data.lyrics);
                    responseContainerEl.appendChild(gifImg);;
                });
            })
        }
        getSongLyrics();

        // // this function generates a quote based on the clicked song artist
        // var myFunction = function () {
        //     fetch("https://quote-garden.herokuapp.com/api/v2/authors/" + trackResult + "?page=1&limit=10")
        //         .then(function (response) {
        //             if (response.ok) {
        //                 response.json().then(function (data) {
        //                     console.log(data);
        //                     console.log(data.quotes[0].quoteText);
        //                     var searchContainerEl = document.querySelector(".randomquoteHere");
        //                     searchContainerEl.innerHTML = data.quotes[0].quoteText;
        //                     var searchEl = document.createElement("div");
        //                     searchEl.setAttribute("class", "randomquote");
        //                     var randomresponseContainerEl = document.querySelector("#random-response-author");
        //                     randomresponseContainerEl.innerHTML = "- " + data.quotes[0].quoteAuthor;
        //                     var authorEl = document.createElement("div");
        //                     authorEl.setAttribute("class", "randomAuthorHere");
        //                     // searchContainerEl.appendChild(data.quote.quoteText);
        //                     // LOCAL STORAGE
        //                     localStorage.setItem("searchTerm", data.quotes[0].quoteText, data.quotes[0].quoteAuthor);
        //                 });
        //             } 
        //         });
        // } 
        // myFunction(trackResult);
    });

    return {
        init() {
            console.log('App is starting');
            loadGenres();
        }
    }
})(UIController, APIController);
// will need to call a method to load the genres on page load
APPController.init();
// end of spotify function




// // this function generates a quote based on the clicked song artist
// var myFunction = function () {
//     var searchTerm = document.querySelector("#band-search").value;
//     console.log("Your search term was " + searchTerm);
//     console.log("Search function was called");
//     fetch(`https://quote-garden.herokuapp.com/api/v2/authors/${searchTerm}?page=1&limit=10`)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     console.log(data);
//                     console.log(data.quotes[0].quoteText);
//                     var searchContainerEl = document.querySelector(".randomquoteHere");
//                     searchContainerEl.innerHTML = data.quotes[0].quoteText;
//                     var searchEl = document.createElement("div");
//                     searchEl.setAttribute("class", "randomquote");
//                     var randomresponseContainerEl = document.querySelector("#random-response-author");
//                     randomresponseContainerEl.innerHTML = "- " + data.quotes[0].quoteAuthor;
//                     var authorEl = document.createElement("div");
//                     authorEl.setAttribute("class", "randomAuthorHere");
//                     // searchContainerEl.appendChild(data.quote.quoteText);

//                     // LOCAL STORAGE
//                     localStorage.setItem("searchTerm", data.quotes[0].quoteText, data.quotes[0].quoteAuthor);
//                 });
//             } 
//         }); 
// }
