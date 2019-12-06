import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
// sections for this page
import NavigationBar from "components/inc/NavigationBar.jsx";
import SprintList from "components/Admin/SprintList.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";

import MainPage from "assets/jss/MainPageStyle.jsx";
import styles from "assets/jss/customStyle.jsx";
import {withRouter} from "react-router-dom";
import { getUserData } from "../../utils/common";


class SprintPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { classes } = this.props;
    const userData = getUserData();
    return (
      <div>
        <div style={styles.removePadding}>
          <NavigationBar />
        </div>
        <div className={classNames(classes.main)}>
          <div style={styles.projectListSection}>
            {userData.userRoles && userData.userRoles.length && userData.userRoles.includes("Admin") ?
              <div>
                <SprintList />
                <Clearfix />
                <div className={classes.left} style={styles.marginTopBottom}>
                  <Link to='/admin/projects'>
                    <Button type="button" color="success" round>Back</Button>
                  </Link>
                </div>
              </div>:
              <div className={classNames(classes.main)}>
                <div>
                  <div >
                    <h3 style={{color:"red"}}>You are not authorized to access this web page</h3>
                  </div>
                  <Clearfix/>
                </div>
                <Clearfix/>
              </div>
            }

          </div>
          <Clearfix />
        </div>
        <Footer
          theme="#e5e5e5"
          content={
            <div>
              <div className={classes.right}>
                A &copy;&nbsp;
                <a href="http://www.root-nyc.com">
                  Root NYC
                </a>
                &nbsp;Product
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default withRouter(withStyles(MainPage)(SprintPage));
