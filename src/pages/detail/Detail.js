import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import axios from "axios";
import APIContext from "../../context/APIContext";
import CardMedia from '@material-ui/core/CardMedia';
import ReactPlayer from 'react-player'
import { useHistory } from "react-router-dom";

export default function ChangePasswordDetail() {
    var classes = useStyles();

    const history = useHistory();
    var [getDataFetched, setGetDataFetched] = useState(false);
    var [backdrop_path, setBackdrop_path] = useState(0);
    var [budget, setBudget] = useState(0);
    var [original_language, setOriginal_language] = useState(0);
    var [poster_path, setPoster_path] = useState(0);
    var [release_date, setRelease_date] = useState(0);
    var [revenue, setRevenue] = useState(0);
    var [runtime, setRuntime] = useState(0);
    var [overview, setOverview] = useState(0);
    var [production_companies, setProduction_companies] = useState([]);
    var [genres, setGenres] = useState([]);
    var [spoken_languages, setSpoken_languages] = useState([]);
    var [videoURL, setVideoURL] = useState(0);

    const getData = async () => {
        if (!getDataFetched) {
            axios
                .get(APIContext.getDetails.url, {
                    headers: {
                        "token": localStorage.getItem('token')
                    },
                    params: {
                        "movie_id": localStorage.getItem("selectedMovie")
                    }
                })
                .then(response => {
                    setBackdrop_path("https://image.tmdb.org/t/p/w500/" + response.data.backdrop_path);
                    setBudget(response.data.budget);
                    setGenres(response.data.genres);
                    setOriginal_language(response.data.original_language);
                    setPoster_path("https://image.tmdb.org/t/p/w500/" + response.data.poster_path);
                    setRelease_date(response.data.release_date);
                    setRevenue(response.data.revenue);
                    setRuntime(response.data.runtime);
                    setOverview(response.data.overview);
                    setProduction_companies(response.data.production_companies);
                    setSpoken_languages(response.data.spoken_languages)
                    setVideoURL("https://www.youtube.com/watch?v=" + response.data.results[0].key)
                    setGetDataFetched(response.data ? true : false);
                })
                .catch(error => console.log(error))
                .finally(() => { });
        }
    }

    const isMovieDataValid = async () => {
        if (localStorage.getItem("selectedMovie") === undefined) {
            history.push('/app/dashboard');
        }
        else {
            getData();
        }
    }


    useEffect(() => {
        isMovieDataValid();

    }, []);

    return (
        <>
            <PageTitle title={localStorage.getItem("selectedMovieTitle")} />
            <Grid container spacing={4}>
                <Grid item md={12}>
                    <CardMedia
                        component="img"
                        height="400"
                        image={backdrop_path ? backdrop_path : "https://imgur.com/NrsuOy5.jpg"}
                    />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Widget
                        title="Total Runtime"
                        upperTitle>
                        <Typography variant="h3" className={classes.text}>
                            {runtime + " Min"}
                        </Typography>
                    </Widget>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Widget
                        title="Revenue"
                        upperTitle>
                        <Typography variant="h3" className={classes.text}>
                            {"$" + revenue}
                        </Typography>
                    </Widget>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Widget
                        title="Budget"
                        upperTitle>
                        <Typography variant="h3" className={classes.text}>
                            {"$" + budget}
                        </Typography>
                    </Widget>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Widget
                        title="Release"
                        upperTitle>
                        <Typography variant="h3" className={classes.text}>
                            {release_date}
                        </Typography>
                    </Widget>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Widget
                        upperTitle>
                        <Typography className={classes.text} variant="h5" color="textSecondary" noWrap>
                            {"Production Companies"}
                        </Typography>
                        {production_companies ? production_companies.map((production_company, index) => (
                            <Typography variant="h6" className={classes.text}>
                                {production_company.name}
                            </Typography>
                        )) : ""}

                    </Widget>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Widget disableWidgetMenu>
                        <Typography className={classes.text} variant="h5" color="textSecondary" noWrap>
                            {"Overview"}
                        </Typography>
                        <Typography variant="h5" className={classes.text}>
                            {overview}
                        </Typography>
                        <Typography className={classes.text} variant="h5" color="textSecondary" noWrap>
                            {"Synopsis"}
                        </Typography>
                        <Typography variant="h5" className={classes.text}>
                            {localStorage.getItem("selectedMovieSynopsis")}
                        </Typography>
                    </Widget>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <CardMedia
                        component="img"

                        image={poster_path ? poster_path : "https://imgur.com/NrsuOy5.jpg"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Widget title="Trailer"
                        upperTitle>
                        <ReactPlayer url={videoURL} />
                    </Widget>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Widget title="Spoken Languages"
                        upperTitle>
                        {spoken_languages ? spoken_languages.map((spoken_languages, index) => (
                            <Typography variant="h6" className={classes.text}>
                                {spoken_languages.name}
                            </Typography>
                        )) : ""}
                        <Typography className={classes.text} variant="h5" color="textSecondary" noWrap>
                            {"Original Language"}
                        </Typography>
                        <Typography className={classes.text} variant="h5" color="textSecondary" noWrap>
                            {original_language}
                        </Typography>

                    </Widget>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Widget title="Genres"
                        upperTitle>
                        {genres ? genres.map((genres, index) => (
                            <Typography variant="h6" className={classes.text}>
                                {genres.name}
                            </Typography>
                        )) : ""}
                    </Widget>
                </Grid>
            </Grid>
        </>
    )
};