const APIContext = {
    getAllMovies: {
        url: "https://flickaashish.herokuapp.com/v1/movie/movies",
    },
    getDetails: {
        url: "https://flickaashish.herokuapp.com/v1/movie/details"
    },
    searchMovie: {
        url: "https://flickaashish.herokuapp.com/v1/movie/search"
    },
    getAllGenre: {
        url: "https://flickaashish.herokuapp.com/v1/movie/genre"
    },
    register: {
        url: "https://flickaashish.herokuapp.com/v1/auth/register",
    },
    login: {
        url: "https://flickaashish.herokuapp.com/v1/auth/login",
    },
    validateUserToken: {
        url: "https://flickaashish.herokuapp.com/v1/auth/validateUserToken",
    },
    changePassword: {
        url: "https://flickaashish.herokuapp.com/v1/auth/changePassword",
    },
}
export default APIContext;