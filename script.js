// let button = document.querySelector("#search")
// let output = document.querySelector("#output")
// let input = document.querySelector("#artist")


// button.addEventListener('click', (e) => {
//     console.log(input.value)
//     getDataFromYoutube(input.value)
// })

// function getDataFromYoutube(artist) {
//     var url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${artist}&key=AIzaSyBQ1GFSeS6gr-Q4QZgRIdpLik6Ijpbv8mc`
//     console.log(url);


//     fetch(url)
//     .then(data => data.json())
//     .then(data => console.log(data))
// }

gapi.load("client", loadClient);
 
function loadClient() {
    gapi.client.setApiKey("AIzaSyBQ1GFSeS6gr-Q4QZgRIdpLik6Ijpbv8mc");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}


const ytForm = document.getElementById('yt-form');
const keywordInput = document.getElementById('keyword-input');
const maxresultInput = document.getElementById('maxresult-input');
const orderInput = document.getElementById('order-input');
const videoList = document.getElementById('videoListContainer');
var pageToken = '';
 
ytForm.addEventListener('submit', e => {
    e.preventDefault();
    execute();
});
 
function paginate(e, obj) {
    e.preventDefault();
    pageToken = obj.getAttribute('data-id');
    execute();
}
 

function execute() {
    const searchString = keywordInput.value;
    const maxresult = maxresultInput.value;
    const orderby = orderInput.value;
 
    
    var arr_search = {
        "part": 'snippet',
        "type": 'video',
        "order": orderby,
        "maxResults": maxresult,
        "q": searchString
    };
 
    if (pageToken != '') {
        arr_search.pageToken = pageToken;
    }
 
    return gapi.client.youtube.search.list(arr_search)
    .then(function(response) {
        const listItems = response.result.items;

        console.log(arr_search);
        console.log(response.result.items);
        if (listItems) {
            let output = '<h4>Videos</h4><ul>';
 
            listItems.forEach(item => {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;
                output += `
                    <li><a data-fancybox href="https://www.youtube.com/watch?v=${videoId}"><img src="http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg" /></a><p>${videoTitle}</p></li>
                `;
            });
            output += '</ul>';
 
            if (response.result.prevPageToken) {
                output += `<br><a class="paginate" href="#" data-id="${response.result.prevPageToken}" onclick="paginate(event, this)">Prev</a>`;
            }
 
            if (response.result.nextPageToken) {
                output += `<a href="#" class="paginate" data-id="${response.result.nextPageToken}" onclick="paginate(event, this)">Next</a>`;
            }
 
    
            videoList.innerHTML = output;
        }
    },
    function(err) { console.error("Execute error", err); });
}