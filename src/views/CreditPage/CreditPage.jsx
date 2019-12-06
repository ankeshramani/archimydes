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

import MainPage from "assets/jss/MainPageStyle.jsx";
import styles from "assets/jss/customStyle.jsx";
import CreditsHistorys from "../../components/Credits History/CreditsHistorys";
import { getUserData } from "../../utils/common";
import { getCredit, getCreditHistory, getCreditByProject } from "../../actions/credits";
import connect from "react-redux/es/connect/connect";

class CreditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credits: {},
      isLoading: true,
      isLoadings: true,
      creditsHistory: [],
      creditsByProject: [],
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  componentWillMount(){
    this.getUserCredits()
    this.getCreditsByProject()
    this.getCreditsHistory()

  }

  getUserCredits = async () =>{
    try{
      const response = await this.props.getCredit(getUserData()._id);
      if(response && response.data){
        this.setState({
          credits:response.data,
          isLoading: false,
        })
      }
    }catch (er) {
      if(er.response){
        this.setState({
          message:er.response.data.errorMessage,
          isLoading: false,
        })
      }
    }
  }
  getCreditsHistory = async () =>{
    try{
      const response = await this.props.getCreditHistory(getUserData()._id);
      if(response && response.data){
        this.setState({
          creditsHistory:response.data.reverse(),
          isLoading: false,
        })
      }
    }catch (er) {
      if(er.response){
        this.setState({
          message:er.response.data.errorMessage,
          isLoading: false,
        })
      }
    }
  }
  getCreditsByProject = async () =>{
    try{
      const response = await this.props.getCreditByProject(getUserData()._id);
      if(response && response.data){
        this.setState({
          creditsByProject:response.data,
          isLoadings: false,
        })
      }
    }catch (er) {
      if(er.response){
        this.setState({
          message:er.response.data.errorMessage,
          isLoadings: false,
        })
      }
    }
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={styles.removePadding}>
          <NavigationBar/>
        </div>
        <div className={classNames(classes.main)}>
          <div style={styles.projectListSection}>
            <CreditsHistorys state={this.state}/>
          </div>
          <Clearfix/>
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
const mapStateToProps = state =>({
  creditList:state.userCredit.creditList,
  creditHistoryList:state.userCredit.creditHistoryList,
  creditsByProjectList:state.userCredit.creditsByProjectList,
})
const mapDispatchToProps = dispatch => ({
  getCredit: (id) => dispatch(getCredit(id)),
  getCreditHistory: (id) => dispatch(getCreditHistory(id)),
  getCreditByProject: (id) => dispatch(getCreditByProject(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(MainPage)(CreditPage));
