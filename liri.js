require("dotenv").config();

//[2] will call a function, [3]+ will pass the argument for that function
var userCommand = process.argv[2];
//Allows user to input more than one word without quotations
var userInput = process.argv.slice(3).join(" ")

var moment = require('moment');
var request = require('request')
var keys = require("./keys");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

//switch/case to run proper function with user command argument
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
        console.log("Not one of liris functions")
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
                var formatDate = moment(concertInfo[i].datetime).format('MM/DD/YYYY')
                console.log("Date: " + formatDate)
            }
        } else {
            console.log("Error")
            return
        }
    })

}

//spotify-this-song input at process.argv[2] with song name at process.argv[3]
//Client ID 8a01da7f2fbd4bd79690b9648a720fcf
//Client Secret 5bfcf1c916454532ac3459c554fd9893
//display: artist, song name, preview link from spotify, album

function spotifyThis(userInput) {
    //default for no song 
    if (userInput === undefined) {
        userInput = "The Sign Ace of Base"
    }

    spotify.search(
        {
            type: "track",
            query: userInput
        },
        function(error, data) {
            if (error) {
                console.log("Error")
                return
            }
            var songInfo = data.tracks.items

            for (var j=0;j<songInfo.length;j++){
                console.log("Song artist: " + songInfo[j].artists[0].name)
                console.log("Song name: " + songInfo[j].name)
                console.log("Preview link : " + songInfo[j].preview_url)
                console.log("Song album: " + songInfo[j].album.name)
            }
        }
    )
}

//movie-this input at process.argv[2] with movie name input at process.argv[3]
//display: title,release year,IMDB rating,rotten tom rating, country produced,language, plot,actors
//default for no movie name input is Mr.Nobody
//omdb api with trilogy api key