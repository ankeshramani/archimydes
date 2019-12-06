import React from "react";

// react components for routing our app without refresh
import {Link, withRouter} from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import AttachMoney from "@material-ui/icons/AttachMoney";
import PowerSettings from "@material-ui/icons/PowerSettingsNew";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailOutline from "@material-ui/icons/MailOutline";
// core components
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";

import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { logout } from "../../actions/login";
import ErrorPanel from "components/inc/ErrorPanel.jsx";
import SuccessPanel from "components/inc/SuccessPanel.jsx";
import { isLoggedIn, getUserData } from "../../utils/common";
import navbarsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.jsx";
import styles from "assets/jss/customStyle.jsx";
import { CONTACT_US_EMAIL } from "../../common/constants";

class NavigationBar extends React.Component {

  async handleLogout() {
    const response = await this.props.logout();
    if (response.success == true) {
      this.context.router.history.push('/login-page');
    }
  }

  render() {
    const { classes } = this.props;
    const userData = getUserData();
    // const isLoggedIn = this.props.isLoggedIn;
    return (
      <div
        className={`${classes.section} cd-section`}
        id="navigation"
        style={styles.removePadding}
      >
        {isLoggedIn() ? (
          <Header
            links={
              <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                  <Button
                    className={classes.navLink + " " + classes.navLinkActive}
                    color="transparent"
                  >
                    <Dashboard/> <Link to={(userData && userData.userRoles && userData.userRoles.length && userData.userRoles.includes("Admin")) ? '/admin/projects' : '/'}>Dashboard</Link>
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    className={classes.navLink}
                    color="transparent"
                  >
                    <AccountCircle/> <Link to="/profile-page">Profile</Link>
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    className={classes.navLink}
                    color="transparent"
                  >
                    <AttachMoney/> <Link to="/credits">Credits</Link>
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href={'mailto:'+CONTACT_US_EMAIL}
                    className={classes.navLink}
                    color="transparent"
                  >
                    <MailOutline/> Contact Us
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    className={classes.navLink}
                    onClick={() => this.handleLogout()}
                    color="transparent"
                  >
                    <PowerSettings/> Log off
                  </Button>
                </ListItem>
              </List>
            }
          />
          ) : (
          <Header
            links={
              <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                  <Button
                    className={classes.navLink}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    <Dashboard/>
                    <Link to="/signup-page"> Sign Up</Link>
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    className={classes.navLink}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    <AccountCircle/> <Link to="/login-page"> Sign In</Link>
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href={'mailto:'+CONTACT_US_EMAIL}
                    className={classes.navLink}
                    color="transparent"
                  >
                    <MailOutline/> Contact Us
                  </Button>
                </ListItem>
              </List>
            }
          />
        )}
        <ErrorPanel />
        <SuccessPanel />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

NavigationBar.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(withStyles(navbarsStyle)(NavigationBar));
