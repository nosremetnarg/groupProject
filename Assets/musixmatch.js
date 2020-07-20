const proxyurl = "https://cors-anywhere.herokuapp.com/";
var baseRoute = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=4ea638d2b2686b49ed84acc17be2985e';
console.log( baseRoute )

$.get( proxyurl + baseRoute )
    .then( function ( response ) {
        response = JSON.parse( response )
        var lyrics = response.message.body.lyrics.lyrics_body
        console.log( lyrics )
        $( "#lyrics" ).text( lyrics )
    } )
    .catch( function ( error ) {
        console.log( error )
    } )