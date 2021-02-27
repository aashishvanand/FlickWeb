const APIContext = {
    getAllMovies: {
        url: "http://localhost:3001/v1/movie/movies",
    },
    getDetails: {
        url: "http://localhost:3001/v1/movie/details"
    },
    searchMovie: {
        url: "http://localhost:3001/v1/movie/search"
    },
    getAllGenre: {
        url: "http://localhost:3001/v1/movie/genre"
    },
    register: {
        url: "http://localhost:3001/v1/auth/register",
    },
    login: {
        url: "http://localhost:3001/v1/auth/login",
    },
    validateUserToken: {
        url: "http://localhost:3001/v1/auth/validateUserToken",
    },
    changePassword: {
        url: "http://localhost:3001/v1/auth/changePassword",
    },
}
export default APIContext;