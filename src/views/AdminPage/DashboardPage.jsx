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
import Dashboard from "components/Admin/Dashboard.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";

import MainPage from "assets/jss/MainPageStyle.jsx";
import styles from "assets/jss/customStyle.jsx";

class DashboardPage extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            userData :{},
        }
    }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  componentWillMount (){
      const userData = (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'))) || {}
      this.setState({userData})
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
                <div className={classes.right} style={styles.removePaddingBottom}>
                  {
                    this.state.userData && this.state.userData.userRoles.indexOf('Admin') !== -1 ?
                      <div>
                         <Link to={"/discount-management"}><Button type="button" color="success" round>Vouchers</Button></Link>
                         <Link to={"/user-list"}><Button type="button" color="success" round>User Management</Button></Link>
                      </div> : null
                    }
                </div>
            <Clearfix />
            <Dashboard />
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

export default withStyles(MainPage)(DashboardPage);
