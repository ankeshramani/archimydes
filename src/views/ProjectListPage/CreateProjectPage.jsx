import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Footer from "components/Footer/Footer.jsx";
// sections for this page
import NavigationBar from "components/inc/NavigationBar.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import StepWizard from "components/StepWizard/StepWizard.jsx";

import projectListPageStyle from "assets/jss/projectListPageStyle.jsx";

import styles from "assets/jss/customStyle.jsx";
import "react-bootstrap-wizard/dist/react-wizard.scss";
import "components/StepWizard/stepWizardStyle.scss";

class CreateProjectPage extends React.Component {
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
          <div style={styles.mainContentSection}>
            <StepWizard />
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

export default withStyles(projectListPageStyle)(CreateProjectPage);
