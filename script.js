let button = document.querySelector("#search")
let output = document.querySelector("#output")
let input = document.querySelector("#artist")


button.addEventListener('click', (e) => {
    console.log(input.value)
    getDataFromYoutube(input.value)
})

function getDataFromYoutube(artist) {
    var url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${artist}&key=AIzaSyBQ1GFSeS6gr-Q4QZgRIdpLik6Ijpbv8mc`
    console.log(url);


    fetch(url)
    .then(data => data.json())
    .then(data => {console.log(data); 
})