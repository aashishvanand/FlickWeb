import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Dashboard from "../../pages/dashboard";
import Detail from "../../pages/detail";
import Profile from "../../pages/profile";
import { useLayoutState } from "../../context/LayoutContext";


function Layout(props) {
  var classes = useStyles();

  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/detail" component={Detail} />
            <Route path="/app/profile" component={Profile} />
          </Switch>

        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);