import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";
import APIContext from "../../context/APIContext";
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
var _ = require('lodash');
const axios = require('axios');

export default function Dashboard(props) {
  var classes = useStyles();

  localStorage.removeItem('selectedMovie');
  localStorage.removeItem('selectedMovieTitle');
  localStorage.removeItem('selectedMovieSynopsis');

  var [getMovieDataFetched, setMovieGetDataFetched] = useState(false);
  var [getGenreDataFetched, setGetGenreDataFetched] = useState(false);
  var [validateTokenDone, setValidateTokenDone] = useState(false);
  var [movies, setMovies] = useState([]);
  var [moviesBackup, setMoviesBackup] = useState([]);
  var [genre, setGenre] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const validateToken = async () => {
    let token = localStorage.getItem('token');
    const jwt_regex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/;
    if (!jwt_regex.exec(token)) {
      console.log("Invalid jwt");
    }
    else {

      if (!validateTokenDone) {
        let validateRequestBody = {
          token: token,
          user: localStorage.getItem('user'),
        };

        const validateOptions = {
          method: "POST",
          data: validateRequestBody,
          baseURL: APIContext.validateUserToken.url
        };

        axios(validateOptions)
          .then(function (response) {
            if (!response.data.error && response.status === 200) {
              setValidateTokenDone(true)
            }
            else if (response.data.error) {

            }
          })
          .catch(function (error) {
            localStorage.clear();
          })
          .finally(function () {
          });
      }

    }
  }
  const handleReset = (event) => {
    setMovies(moviesBackup)
    setSortBy('')
    setFilterBy('')
  }

  const handleChange = (event, value) => {
    axios
      .get(APIContext.getAllMovies.url, {
        params: {
          "page": value
        },
        headers: {
          "token": localStorage.getItem('token')
        }
      })
      .then(response => {
        setMovies(response.data.message.docs);
        setCurrentPage(value);
      })
      .catch(error => console.log(error))
      .finally(() => { });

  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value)
    setMovies(_.filter(moviesBackup, { genre: event.target.value }))
  }


  const handleSortChange = (event) => {
    setSortBy(event.target.value)
    if (event.target.value === "Year ↑") {
      setMovies(_.orderBy(movies, 'productionYear'))
    }
    if (event.target.value === "Year ↓") {
      setMovies(_.orderBy(movies, 'productionYear', 'desc'))
    }
    if (event.target.value === "Alphabetical ↑") {
      setMovies(_.orderBy(movies, 'title'))
    }
    if (event.target.value === "Alphabetical ↓") {
      setMovies(_.orderBy(movies, 'title', 'desc'))
    }
  }

  const getData = async () => {
    if (!getMovieDataFetched) {
      axios
        .get(APIContext.getAllMovies.url, {
          headers: {
            "token": localStorage.getItem('token')
          }
        })
        .then(response => {
          setMovies(response.data.message.docs);
          setMoviesBackup(response.data.message.docs);
          setTotalPages(response.data.message.totalPages)
          setCurrentPage(response.data.message.page)
          setMovieGetDataFetched(response.data ? true : false);
        })
        .catch(error => console.log(error))
        .finally(() => { });
    }
    if (!getGenreDataFetched) {
      axios
        .get(APIContext.getAllGenre.url, {
          headers: {
            "token": localStorage.getItem('token')
          }
        })
        .then(response => {
          setGenre(response.data.message);
          setGetGenreDataFetched(response.data ? true : false);
        })
        .catch(error => console.log(error))
        .finally(() => { });
    }
  }

  useEffect(() => {
    getData();
    validateToken();
  }, []);

  return (
    <>
      <PageTitle title="Dashboard" />
      <div className={classes.fcContainer}>
        <div className={classes.fcItem}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="filter-label">Filter</InputLabel>
            <Select
              autoWidth
              id="filter-label"
              value={filterBy}
              onChange={handleFilterChange}
            >
              {genre.length ? genre.map((genre, index) => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              )) : ""}
            </Select>
          </FormControl>
        </div>
        <div className={classes.fcItem}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="sort-label">Sort</InputLabel>
            <Select
              autoWidth
              id="sort-label"
              value={sortBy}
              onChange={handleSortChange}
            >
              <MenuItem key={"Year ↑"} value={"Year ↑"}>Year ↑</MenuItem>
              <MenuItem key={"Year ↓"} value={"Year ↓"}>Year ↓</MenuItem>
              <MenuItem key={"Alphabetical ↑"} value={"Alphabetical ↑"}>Alphabetical ↑</MenuItem>
              <MenuItem key={"Alphabetical ↓"} value={"Alphabetical ↓"}>Alphabetical ↓</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.fc_item}>
          <Button size="large" fullWidth
            className={classes.button}
            onClick={handleReset}
            variant="outlined">
            Reset
          </Button>
        </div>
      </div>
      <Grid container spacing={4}>
        <Grid container>
          {movies.length ? movies.map((movie, index) => (
            <Card className={classes.root} >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={movie.poster}
                  title={movie.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="overline" component="h2" noWrap>
                    {movie.title}
                  </Typography>
                  <Box
                    fontSize="subtitle2.fontSize"
                    component="div"
                    overflow="hidden"
                    whiteSpace="pre-line"
                    textOverflow="ellipsis"
                    height={80}
                  >
                    {movie.synopsis}
                  </Box>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Typography variant="caption" color="textPrimary" align="right" component="h2">
                  {movie.productionYear}
                </Typography>
                <Link
                  to={{ pathname: "/app/detail" }}
                  onClick={() => {
                    localStorage.setItem("selectedMovie", movie._id);
                    localStorage.setItem("selectedMovieTitle", movie.title);
                    localStorage.setItem("selectedMovieSynopsis", movie.synopsis);
                  }}
                >
                  <Button size="small" color="primary">
                    More
                   </Button>

                </Link>

              </CardActions>
            </Card>
          )) : <Typography className={classes.text} variant="h3">
            {"No Movies based on your filter"}
          </Typography>}
        </Grid>
        <Pagination count={totalPages} variant="outlined" color="primary" onChange={handleChange} />

      </Grid>


    </>
  );
}
