$( "#btn_submit" ).click( function () {
    var track = $( "#tune" ).val().trim()
    var artist = $( "#artist" ).val().trim()
    searchMusixMatch( track, artist )
} )


function searchMusixMatch( track, artist ) {
    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    var apiKey = "&apikey=4ea638d2b2686b49ed84acc17be2985e"
    var trackQuery = "&q_track=" + track
    var artistQuery = "&q_artist=" + artist
    var baseRoute = "http://api.musixmatch.com/ws/1.1/track.search?page_size=1&page=1&s_track_rating=desc";

    if ( track ) {
        baseRoute += trackQuery
    }
    if ( artist ) {
        baseRoute += artistQuery
    }


    $.get( proxyurl + baseRoute + apiKey )
        .then( function ( response ) {
            response = JSON.parse( response )

            if ( response.message.body.track_list.length === 0 ) {

                $( "#myModal" ).show()
                $( "#modal-message" ).text( "No Song / Artist Found" )
                return
            }

            var track_id = response.message.body.track_list[ 0 ].track.track_id
            searchMusixMatchLyrics( track_id )
        } )
        .catch( function ( error ) {
            console.log( error )
        } );
};

function searchMusixMatchLyrics( id ) {
    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    var apiKey = "&apikey=4ea638d2b2686b49ed84acc17be2985e"
    var trackQuery = "track_id=" + id
    var baseRoute = "http://api.musixmatch.com/ws/1.1/track.lyrics.get?";

    proxyurl += baseRoute + trackQuery + apiKey;
    $.get( proxyurl )
        .then( function ( response ) {
            response = JSON.parse( response )
            console.log( response )

            if ( !response.message.body.lyrics ) {
                $( "#myModal" ).show()
                $( "#modal-message" ).text( "No lyrics found" )
                return
            }

            var lyrics = response.message.body.lyrics.lyrics_body

            $( "#lyrics" ).text( lyrics )
        } )
        .catch( function ( error ) {
            console.log( error )
        } );
}