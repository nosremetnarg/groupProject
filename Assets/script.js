// button.addEventListener('click', function () {
//     GET https://api.spotify.com/v1/artists/{id}

//     curl -X "GET" "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQC_fAZ1y1KHvau90abcLSJKHtQrnSZ2UfUhGqIU5VcIa9k-yqMRwl0_WlKOH_hrwIkCNVleyaKq-Ew1apvtto56RncCbQfdRXEcud0fksLeYTDESqKkTekVaLIbmVtAyaKiQ03nXJ5LmSh31A"
// })


// gets giphy related to the user search
giphyFunction = function () {
    var searchTerm = document.querySelector("#band-search").value;
    console.log(searchTerm);
    console.log("this is called");
    fetch("http://api.giphy.com/v1/gifs/search?q=" + 
    searchTerm + "&api_key=AdVi5Mrcl5ShIUm7GR1xlk3sOWLeV0sT"
    )
    .then(function(response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response.data[0]);
        var responseContainerEl = document.querySelector("#response-container");
        responseContainerEl.innerHTML = "";
        var gifImg = document.createElement("img");
        gifImg.setAttribute("src", response.data[0].images.fixed_height.url)
        responseContainerEl.appendChild(gifImg);
    });
}
// end if giphy search function

// spotify playlist function
