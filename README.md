## Demo
You can also view the web version of the at https://aashishvanand.me/FlickWeb/

## Running your project locally
# Getting your mongoDB instance setup
Visit https://www.mongodb.com/cloud/atlas and create an account. Follow https://docs.atlas.mongodb.com/getting-started/ if required.
You need a connection string from the db instance
mongodb+srv://[username:password@]@host/db?retryWrites=true&w=majority

Make sure you add this under the name DB in .env under /flickAPI


# Getting API key from tmdb.org
Visit https://www.themoviedb.org/settings/api and create an account and get the api key.

Make sure you add this under the name tmdbAPIKey in .env under /flickAPI


# Setting jwtSecret
in order to validate user session we use JWT token. Learn more about jwt at https://jwt.io/
key can be any alphanumeric combination
Make sure you add this under the name jwtSecret in .env under /flickAPI


# Running Middleware
Middleware can be found in https://github.com/aashishvanand/FlickWebBackend. Navigate in your IDE to the folder and run the command. Also make sure there is no other service running in port 3001. 

npm run dev

This should start up the Middleware on port 3001


# API Documentation
You can check the Postman Collection at 

# Adding Data to Database
Once the Middleware is up you can POST movie object /v1/movie/movie. You can post 1 movie at a time. You can also bulk upload the data using Mongodb commandLine

sample
        { 
            "_id": "tmdbID",
            "title": "movieName",
            "synopsis": "sampleSynopsis",
            "genre": "sampleGenre",
            "productionYear": "sampleYear",
            "poster": "png/jpg poster"
        }

data
        {
            "_id": "297802",
            "title": "Aquaman",
            "synopsis": "Amphibious superhero Arthur Curry learns what it means to be Aquaman when he must stop the king of Atlantis from waging war against the surface world.",
            "genre": "Adventure",
            "productionYear": "2018",
            "poster": "https://image.tmdb.org/t/p/w500/9QusGjxcYvfPD1THg6oW3RLeNn7.jpg"
        }
        {
            "_id": "293660",
            "title": "Deadpool",
            "synopsis": "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
            "genre": "Action",
            "productionYear": "2016",
            "poster": "https://image.tmdb.org/t/p/w500/en971MEXui9diirXlogOrPKmsEn.jpg"
        }
        {
            "_id": "158852",
            "title": "Tomorrowland",
            "synopsis": "Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.",
            "genre": "Action",
            "productionYear": "2015",
            "poster": "https://image.tmdb.org/t/p/w500/8Nn6rRClhREixqsHJ3eAnZNVfJl.jpg"
        }
        {
            "_id": "12155",
            "title": "Alice in Wonderland",
            "synopsis": "Nineteen-year-old Alice returns to the magical world from her childhood adventure, where she reunites with her old friends and learns of her true destiny: to end the Red Queen's reign of terror.",
            "genre": "Comedy",
            "productionYear": "2010",
            "poster": "https://image.tmdb.org/t/p/w500/20pkC7yJdCV4J1IMKfsCT9QU7zV.jpg"
        }
        {
            "_id": "246655",
            "title": "X-Men: Apocalypse",
            "synopsis": "With mutants Apocalypse and Magneto intent on mankind's destruction, Professor X and his team of young X-Men must battle for the future of humanity.",
            "genre": "Fantasy",
            "productionYear": "2016",
            "poster": "https://image.tmdb.org/t/p/w500/2ex2beZ4ssMeOduLD0ILzXKCiep.jpg"
        }
        {
            "_id": "353486",
            "title": "Jumanji: Welcome to the Jungle",
            "synopsis": "Four high school students get sucked into the jungle setting of a video game, where they embark on a quest as their comically mismatched adult avatars.",
            "genre": "Fantasy",
            "productionYear": "2017",
            "poster": "https://image.tmdb.org/t/p/w500/zJDMuXQDraHjtF53wikmyBQIcYe.jpg"
        }
        {
            "_id": "166428",
            "title": "How to Train Your Dragon: The Hidden World",
            "synopsis": "After meeting an enchanted creature, Hiccup and Toothless set out to find a legendary dragon paradise before evil hunter Grimmel finds them first.",
            "genre": "Children",
            "productionYear": "2019",
            "poster": "https://image.tmdb.org/t/p/w500/lFwykSz3Ykj1Q3JXJURnGUTNf1o.jpg"
        }
        {
            "_id": "454640",
            "title": "The Angry Birds Movie 2",
            "synopsis": "Enemies turn into frenemies when the Pigs call for a truce with the Birds to unite against a formidable new foe that’s threatening all of their homes.",
            "genre": "Children",
            "productionYear": "2019",
            "poster": "https://image.tmdb.org/t/p/w500/k7sE3loFwuU2mqf7FbZBeE3rjBa.jpg"
        }
        {
            "_id": "20352",
            "title": "Despicable Me",
            "synopsis": "Villainous Gru hatches a plan to steal the moon from the sky. But he has a tough time staying on task after three orphans land in his care.",
            "genre": "Children",
            "productionYear": "2010",
            "poster": "https://image.tmdb.org/t/p/w500/3qgOKlTmkvq27zDVzmBOEG4VcjA.jpg"
        }
        {
            "_id": "315635",
            "title": "Spider-Man: Homecoming",
            "synopsis": "Peter Parker returns to routine life as a high schooler until the Vulture's arrival gives him the chance to prove himself as a web-slinging superhero.",
            "genre": "Adventure",
            "productionYear": "2017",
            "poster": "https://image.tmdb.org/t/p/w500/vc8bCGjdVp0UbMNLzHnHSLRbBWQ.jpg"
        }

You can login to cli using your mongo db connection string 
mongo "mongodb+srv://url/dbname" --username username --password password

You need insert movies using the following command
use dbname
db.movies.insertMany([{movie1},{movie2}....{movieN}])


# Running Frontend
Frontend can be found in https://github.com/aashishvanand/FlickWeb. Navigate in your IDE to the folder and run the command. Also make sure there is no other service running in port 3000 and point the src/context/APIContext.js to backend for example (http://localhost:3001/.....)

npm start

This should start the react front end app on port 3000. You can now register as a new user and view the app