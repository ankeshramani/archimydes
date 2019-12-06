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
import ProjectList from "components/ProjectList/ProjectList.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";

import projectListPageStyle from "assets/jss/projectListPageStyle.jsx";
import styles from "assets/jss/customStyle.jsx";

class ProjectListPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div style={styles.removePadding}>
          <NavigationBar />
        </div>
        <div className={classNames(classes.main)}>
          <div style={styles.projectListSection}>
            <ProjectList />
            <div className={classes.right}>
              <Link to="/new">
                <Button type="button" color="success" round>Start New Project &raquo;</Button>
              </Link>
            </div>
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

export default withStyles(projectListPageStyle)(ProjectListPage);
