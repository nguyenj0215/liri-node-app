# liri-node-app

The liri-node-app is a play off of Apple's Siri that takes specific commands via nodeJS  and retrieves relevant information from apis.  The application was written using javascript, and nodeJS.

Commands currently available include: 
1) spotify-this-song, which takes a song name and searches spotifys api
2) concert-this, which takes an artist or band and searches the bandsintown api
3) movie-this, which takes a movie title and searches OMDBs api
4) do-what-it-says, which will perform the command currently written in random.txt

Requests should be formatted in the following way: 

    node liri.js "COMMAND" "ARGUMENT"
    
    Example: node liri.js spotify-this-song The Sign Ace of Base

Link to the github repo: [GitHub Repo](https://github.com/nguyenj0215/liri-node-app)

Screenshots: 
spotify-this-song:
![Spotify-this](/spotify.png)
concert-this:
![Concert-this](/concert.png)
movie-this:
![Movie-this](/movie.png)
do-what-it-says:
![Do-what-it-says](/doit.png)
