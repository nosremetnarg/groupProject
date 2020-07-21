let button = document.getElementById("search")
let output = document.querySelector("#output")
let input = document.querySelector("#artist")


button.addEventListener('click', getDataFromYoutube)
  

function getDataFromYoutube(event) {
    event.preventDefault()
    let artist = input
    var url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${artist}&key=AIzaSyBQ1GFSeS6gr-Q4QZgRIdpLik6Ijpbv8mc`
    console.log(url);

    function callYoutube(myExpression) {
        var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + myExpression + '&safeSearch=strict&key=AIzaSyBQ1GFSeS6gr-Q4QZgRIdpLik6Ijpbv8mc&type=video';

        console.log(myExpression)

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
}

$(document).ready(function () {
    $('#search-term').submit(function (event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm);
    });
});

function getRequest(searchTerm) {
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'snippet',
        key: 'XXXXXX',
        q: searchTerm
    };
  
    $.getJSON(url, params, showResults);
}

function showResults(results) {
    var html = "";
    var entries = results.items;
    
    $.each(entries, function (index, value) {
        var title = value.snippet.title;
        var thumbnail = value.snippet.thumbnails.default.url;
        html += '<p>' + title + '</p>';
        html += '<img src="' + thumbnail + '">';
    }); 
    
    $('#search-results').html(html);
}