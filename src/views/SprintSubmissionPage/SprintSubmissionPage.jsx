import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import NavigationBar from "components/inc/NavigationBar.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import SprintSubmissionPages from "components/SprintSubmissionPage/SprintSubmissionPage.jsx";
import MainPage from "assets/jss/MainPageStyle.jsx";
import styles from "assets/jss/customStyle.jsx";

class SprintSubmissionPage extends React.Component {

  render() {
    const { classes ,location} = this.props;
    return (
      <div>
        <div style={styles.removePadding}>
          <NavigationBar />
        </div>
        <div className={classNames(classes.main)}>
          <div style={styles.projectListSection}>
            <SprintSubmissionPages location={location}/>
            <Clearfix />
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

export default withStyles(MainPage)(SprintSubmissionPage);