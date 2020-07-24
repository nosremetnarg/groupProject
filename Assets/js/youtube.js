let input = document.querySelector("#artist")
const submitArtist= document.querySelector('#topic-search');

submitArtist.addEventListener('click', getDataFromYoutube);

function getDataFromYoutube(event) {
    event.preventDefault()
    let artist = document.getElementById("topic-search-input").value
    // console.log(artist)
    var url="https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=" + artist + "&key=AIzaSyBQ1GFSeS6gr-Q4QZgRIdpLik6Ijpbv8mc";
    // console.log(url);
        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            var results = response.items["0"].id.videoId;
            // console.log("this is the variable results:" + results)
            $("#youtubeDiv1").html('<iframe id="youtubeFrame" width="400" height="200" style="background-size: cover" src="https://www.youtube.com/embed/' + results + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
            var results = response.items["1"].id.videoId;
            // console.log("this is the variable results:" + results)
            $("#youtubeDiv2").html('<iframe id="youtubeFrame" width="400" height="200" style="background-size: cover" src="https://www.youtube.com/embed/' + results + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
            var results = response.items["2"].id.videoId;
            // console.log("this is the variable results:" + results)
            $("#youtubeDiv3").html('<iframe id="youtubeFrame" width="400" height="200" style="background-size: cover" src="https://www.youtube.com/embed/' + results + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
            var results = response.items["3"].id.videoId;
            // console.log("this is the variable results:" + results)
            $("#youtubeDiv4").html('<iframe id="youtubeFrame" width="400" height="200" style="background-size: cover" src="https://www.youtube.com/embed/' + results + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        })
    }