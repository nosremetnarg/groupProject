// Random generated quote. Click the Random button to recieve random quote

document.getElementById("random-btn").addEventListener("click", myRandomFunction) 
var myRandomFunction = function () {

console.log("random search was called");
fetch("https://quote-garden.herokuapp.com/api/v2/quotes/random")
.then(function (response) {
    response.json().then(function(data) { 
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