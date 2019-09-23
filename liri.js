require("dotenv").config();

//[2] will call a function, [3]+ will pass the argument for that function
var userCommand = process.argv[2];
//Allows user to input more than one word without quotations
var userInput = process.argv.slice(3).join(" ")

var moment = require('moment');
var axios = require("axios");
var request = require('request')
var fs = require("fs");
var keys = require("./keys");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

startLiri(userCommand, userInput)

//switch/case to run proper function with user command argument
function startLiri(userCommand, userInput) {
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
        case 'do-what-it-says':
            doRandomTxt()
            break;
        default:
            console.log("Not one of liris functions")
    }
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

                //log text 
                fs.appendFileSync("log.txt", "\r\n\r\n" + concertInfo[i].venue.name + " , ")
                fs.appendFileSync("log.txt", "\r\n" + concertInfo[i].venue.city + " , ")
                fs.appendFileSync("log.txt", "\r\n" + formatDate + " , ")
                
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
    if (!userInput || userInput === undefined) {
        userInput = "The Sign Ace of Base"
    }

    spotify.search(
        {
            type: "track",
            query: userInput
        },
        function (error, data) {
            if (error) {
                console.log("Error: " + error)
                return
            }
            var songInfo = data.tracks.items

            for (var j = 0; j < songInfo.length; j++) {
                console.log("Song artist: " + songInfo[j].artists[0].name)
                console.log("Song name: " + songInfo[j].name)
                console.log("Preview link : " + songInfo[j].preview_url)
                console.log("Song album: " + songInfo[j].album.name)

                fs.appendFileSync("log.txt",  "\r\n\r\n" + songInfo[j].artists[0].name + " , ")
                fs.appendFileSync("log.txt",  "\r\n" + songInfo[j].name + " , ")
                fs.appendFileSync("log.txt",  "\r\n" + songInfo[j].preview_url + " , ")
                fs.appendFileSync("log.txt",  "\r\n" + songInfo[j].album.name + " , ")
            }
        }
    )
}

//movie-this input at process.argv[2] with movie name input at process.argv[3]
//display: title,release year,IMDB rating,rotten tom rating, country produced,language, plot,actors
//default for no movie name input is Mr.Nobody
//omdb api with trilogy api key
function movieThis() {

    //Default to Mr.Nobody
    if (!userInput || userInput === undefined) {
        userInput = "Mr.Nobody"
    }
    var queryUrl2 = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl2).then(
        function (response) {
            var movieInfo = response.data
            console.log("Movie title: " + movieInfo.Title)
            console.log("Release Year: " + movieInfo.Year)
            console.log("IMDB Rating: " + movieInfo.imdbRating)
            console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1])
            console.log("Country Produced: " + movieInfo.Country)
            console.log("Language: " + movieInfo.Language)
            console.log("Plot: " + movieInfo.Plot)
            console.log("Actors: " + movieInfo.Actors)

            fs.appendFileSync("log.txt",  "\r\n\r\n" + movieInfo.Title + " , ")
            fs.appendFileSync("log.txt",  "\r\n" + movieInfo.Year + " , ")
            fs.appendFileSync("log.txt",  "\r\n" + movieInfo.imdbRating + " , ")
            fs.appendFileSync("log.txt",  "\r\n" + movieInfo.Ratings[1] + " , ")
            fs.appendFileSync("log.txt",  "\r\n" + movieInfo.Country + " , ")
            fs.appendFileSync("log.txt",  "\r\n" + movieInfo.Language + " , ")
            fs.appendFileSync("log.txt",  "\r\n" + movieInfo.Plot + " , ")
            fs.appendFileSync("log.txt",  "\r\n" + movieInfo.Actors + " , ")


        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

//take text from random.txt and use to run function using fs package
function doRandomTxt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("Error: " + error)
            return
        }
        var dataArr = data.split(",");
        startLiri(dataArr[0], dataArr[1])
    })
}