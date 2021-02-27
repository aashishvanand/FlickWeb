import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";
import APIContext from "../../context/APIContext";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import useStyles from "./styles";
import { Typography } from "../Wrappers";
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
const axios = require('axios');

export default function Header(props) {
  var classes = useStyles();

  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();
  var [profileMenu, setProfileMenu] = useState(null);
  var [searchData, setSearchData] = useState([]);
  const history = useHistory();

  const handleSearchChange = (e) => {
    axios
      .get(APIContext.searchMovie.url, {
        params: {
          "title": e.target.value
        },
        headers: {
          "token": localStorage.getItem('token')
        }
      })
      .then(response => {
        setSearchData(response.data.message);
      })
      .catch(error => console.log(error))
      .finally(() => { });
  };

  const handleSelectedItem = (event, values) => {
    console.log(values)
    if (values !== null && values._id !== undefined) {
      localStorage.setItem("selectedMovie", values._id);
      localStorage.setItem("selectedMovieTitle", values.title);
      localStorage.setItem("selectedMovieSynopsis", values.synopsis);
      history.push('/app/detail');
    }
  }

  const handleProfile = () => {
    history.push('/app/profile');
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Flick
        </Typography>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Autocomplete classes={{ root: classes.search }}
              freeSolo
              variant="filled"
              onChange={handleSelectedItem}
              options={searchData}
              getOptionLabel={option => option.title}
              renderInput={(params) => (
                <TextField {...params} margin="none" onChange={handleSearchChange} />
              )}
            />
          </Grid>
          <Grid item>
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </Grid>
        </Grid>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {localStorage.getItem('user')}
            </Typography>
            <MenuItem
              onClick={handleProfile}
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem,
              )}
            >
              <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          </div>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}