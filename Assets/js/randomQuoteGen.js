// Random generated quote. Click the Random button to recieve random quote
var searches = JSON.parse(localStorage.getItem("searches")) || [];

document.getElementById("random-btn").addEventListener("click", myRandomFunction)
var myRandomFunction = function () {

    console.log("random search was called");
    fetch("https://quote-garden.herokuapp.com/api/v2/quotes/random")
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                console.log(data.quote.quoteText);
                var responseContainerEl = document.querySelector("#random-response-container");
                var randomresponseContainerEl = document.querySelector("#random-response-author");
                responseContainerEl.innerHTML = data.quote.quoteText;
                randomresponseContainerEl.innerHTML = "- " + data.quote.quoteAuthor;
                var quoteEl = document.createElement("div");
                quoteEl.setAttribute("class", "randomquoteHere");
                var authorEl = document.createElement("div");
                authorEl.setAttribute("class", "randomAuthorHere");
            });
        });
}
myRandomFunction();

// // Search Term Quote. Using User input to search for a quote
// document.getElementById("btn").addEventListener("click", myFunction) 
// var myFunction = function () {
// var searchTerm = document.querySelector("#searchTerm").value;
// console.log("Your search term was " + searchTerm);
// console.log("Search function was called");
// fetch(`https://quote-garden.herokuapp.com/api/v2/authors/${searchTerm}?page=1&limit=10`)
// .then(function (response) {
//     response.json().then(function(data) { 
//         console.log(data);
//         console.log(data.quotes[0].quoteText);
//         var searchContainerEl = document.querySelector("#search-container");
//         searchContainerEl.innerHTML = data.quotes[0].quoteText + " - " + data.quotes[0].quoteAuthor;
//         var searchEl = document.createElement("div");
//         searchEl.setAttribute("class", "randomquote");

//         // searchContainerEl.appendChild(data.quote.quoteText);
//     });
// });
// }

// trying to connect the buttons for giphy and random quote
// Search Term Quote. Using User input to search for a quote
// document.getElementById("btn").addEventListener("click", myFunction) 
var myFunction = function () {
    var searchTerm = document.querySelector("#topic-search-input").value;
    console.log("Your search term was " + searchTerm);
    localStorage.setItem("searchTerm", searchTerm);
    console.log("Search function was called");
    fetch(`https://quote-garden.herokuapp.com/api/v2/authors/${searchTerm}?page=1&limit=10`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    var searchContainerEl = document.querySelector(".randomquoteHere");
                    searchContainerEl.innerHTML = data.quotes[0].quoteText;
                    var searchEl = document.createElement("div");
                    searchEl.setAttribute("class", "randomquote");
                    var randomresponseContainerEl = document.querySelector("#random-response-author");
                    randomresponseContainerEl.innerHTML = "- " + data.quotes[0].quoteAuthor;
                    var authorEl = document.createElement("div");
                    authorEl.setAttribute("class", "randomAuthorHere");
                    // searchContainerEl.appendChild(data.quote.quoteText);

                    // LOCAL STORAGE
                    // localStorage.setItem("randomQuote", data.quotes[0].quoteText, data.quotes[0].quoteAuthor);
                });
            }
        });
}
// gets giphy related to the user search
giphyFunction = function () {
    var searchTerm = document.querySelector("#topic-search-input").value;
    console.log(searchTerm);

    fetch("http://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=AdVi5Mrcl5ShIUm7GR1xlk3sOWLeV0sT"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response.data[0]);
            var responseContainerEl = document.querySelector("#response-container");
            responseContainerEl.innerHTML = "";
            var gifImg = document.createElement("img");
            gifImg.setAttribute("src", response.data[0].images.fixed_height.url)
            responseContainerEl.appendChild(gifImg);

            // localStorage.setItem("giphy", response.data[0].images.fixed_height.url)
            

        });
}
console.log("This is localStorage", localStorage);

// revert to last search
goBackFunction = function () {
    // var searchTerm = JSON.parse(localStorage.getItem("searchTerm")) || [];
console.log("goback has been clicked", searchTerm);

};
for (let i = 0; index < searchTerm.length; i++) {
    myFunction(searchTerm[i])
};
// var saveSearches = function () {
//     localStorage.setItem("searches", JSON.stringify(searchTerm));
//     event.preventDefault();
// };

// saveSearchFunction = function () {
//     e.preventDefault();

//     const searchValue = {
//         key: searchValue
//     };
// }