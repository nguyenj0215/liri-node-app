require("dotenv").config();

//[2] will call a function, [3] will pass the argument for that function
var userCommand = process.argv[2];
var userInput = process.argv[3];

var request = require('request')
var keys = require("./keys");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

//run proper function with argument 
switch (userCommand) {
    case 'concert-this':
        concertThis(userInput)
        break;
    case 'spotify-this-song':
        spotifyThis(userInput)
        break;
    case 'movie-this':
        movieThis(userInput)
        break;
    default:
        console.log("Not one of options")
}

//concert-this input at process.argv[2] with artist/band name at process.argv[3]
//display: name of venue, venue location, date of event formatted MM/DD/YYYY
function concertThis(userInput) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"

    request(queryUrl, function (error, response, body) {
        if (!error) {
            var concertInfo = JSON.parse(body)
            for (var i = 0; i < concertInfo.length; i++) {
                console.log("Venue name: " + concertInfo[i].venue.name)
                console.log("Venue location: " + concertInfo[i].venue.city)
                console.log("Date: " + concertInfo[i].datetime)
            }
        } else {
            console.log("Error")
        }
    })

}

//spotify-this-song input at process.argv[2] with song name at process.argv[3]
//Client ID 8a01da7f2fbd4bd79690b9648a720fcf
//Client Secret 5bfcf1c916454532ac3459c554fd9893
//display: artist, song name, preview link from spotify, album
//default for no song input is "The Sign" by Ace of Base

//movie-this input at process.argv[2] with movie name input at process.argv[3]
//display: title,release year,IMDB rating,rotten tom rating, country produced,language, plot,actors
//default for no movie name input is Mr.Nobody
//omdb api with trilogy api key