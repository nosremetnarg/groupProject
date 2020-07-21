// let button = document.getElementById("#band-search")
// let output = document.querySelector("#output")
let input = document.querySelector("#artist")


// button.addEventListener('click', getDataFromYoutube).valueb

document.getElementById("#btn"), addEventListener('click', getDataFromYoutube)
  
// var getDataFromYoutube=function() {
//     console.log("button-search")
//     fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${artist}&key=AIzaSyBQ1GFSeS6gr-Q4QZgRIdpLik6Ijpbv8mc")
//     .then(function (response) {
//         response.json().then(function (data) {
//             console.log(data);
//             var responseContainerEl = document.querySelector("#search-video")

// })
//     }
//     )};


function getDataFromYoutube(event) {
    event.preventDefault()
    let artist = input 
    var url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${artist}&key=AIzaSyBQ1GFSeS6gr-Q4QZgRIdpLik6Ijpbv8mc`
    console.log(url);

    // function callYoutube(myExpression) {
    //     var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + myExpression + '&safeSearch=strict&key=AIzaSyBQ1GFSeS6gr-Q4QZgRIdpLik6Ijpbv8mc&type=video';

        // console.log(myExpression)

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            console.log(response);
            var results = response.items["0"].id.videoId;

            console.log("this is the variable results:" + results)


            $("#youtubeDiv").html('<iframe id="youtubeFrame" style="background-size: cover" src="https://www.youtube.com/embed/' + results + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        })
    }
    // callYoutube();



