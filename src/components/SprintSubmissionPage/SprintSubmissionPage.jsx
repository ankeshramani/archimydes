import React from "react";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames";
import Table from "components/Table/Table.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import PageTitle from "components/inc/PageTitle.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import StepZilla from "react-stepzilla";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import { successColor } from "assets/jss/material-kit-pro-react.jsx";
import Button from "components/CustomButtons/Button.jsx";
import {getAllSprintList, getSprintDetails, updateSprint} from "../../actions/sprint";
import {
  getUserStories,
  showErrorToMoveStoryAnotherSprint,
  showErrorForNotEnoughCredits,
  updateUserStories,
  setUserStoriesData,
  moveUserStoryToAnotherSprint
} from "../../actions/userStories";
import { getCredit, reserveCredits } from "../../actions/credits";
import { getUserData, getUserId } from "../../utils/common";
import connect from "react-redux/es/connect/connect";
import Moment from 'react-moment';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import LoadingComponent from "../inc/LoadingComponent";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import styles from "assets/jss/customStyle.jsx";
import "assets/scss/styles.scss";
import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx";
import javascriptstyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx";
import queryString from "query-string";
import _ from "lodash-es";
import { deductCredit } from "../../actions/userUpdate";
const moment = require('moment-timezone');

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstStep: "first step here",
      sprintDataList: {},
      isLoading: false
    };
  }

  componentWillMount(){
    this.getSprint();
  }

  onBacke = () =>{
    const {location,history} = this.props
    history.replace(`/projects/${location.state && location.state.projectId}/sprints`)
  }

  getSprint = async ()=>{
    const {location} = this.props
    this.setState({isLoading: true})
    const response = await this.props.getSprintDetails((location.state && location.state.projectId), (location.state && location.state.sprintId));
    if(response && response.data) {
      // this.setState({sprintDataList: response.data});
      this.setState({sprintDataList: response.data}, function () {
        if(this.state.sprintDataList.sprintStatus.status == 'In Progress' || this.state.sprintDataList.sprintStatus.status == 'Submit Stories'){
          this.props.jumpToStep(1);
        }
      });
      this.setState({isLoading: false})
    }
  }

  render() {
    const {sprintDataList, isLoading} = this.state
    const successTitle = {
      color: successColor
    };
    return (
      <div>
        <div>
          <Grid container spacing={24}>
            <div>
              <h3 style={successTitle}>Sprint Review Status</h3>
            </div>
          </Grid>
          <br />
          <LoadingComponent isLoading={isLoading}>
          <Grid container spacing={24}>
            <Grid item xs={1} />
            <Grid item xs={2}>
              <h4 style={successTitle}>Review Status:</h4>
            </Grid>
            <Grid item xs={6}>
              <h4>{sprintDataList && sprintDataList.sprintStatus && sprintDataList.sprintStatus.status }</h4>
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={1} />
            <Grid item xs={2}>
              <h4 style={successTitle}>Last Updated:</h4>
            </Grid>
            <Grid item xs={6}>
                <h4>{moment(sprintDataList && sprintDataList.sprintStatus && sprintDataList.updatedAt).format("DD MMM YY HH:mm ")}</h4>
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={1} />
            <Grid item xs={8}>
              <p>
                Testing design for When the user submits the sprint from sprint
                review page, the user is redirected to this page
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={1} />
            <Grid item xs={8}>
              <p>
                Testing design for When the user submits the sprint from sprint
                review page, the user is redirected to this page
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={1} />
            <Grid item xs={3}>
              <Link to="#">
                <Button type="button" color="success" onClick={this.onBacke} round>
                  Back
                </Button>
              </Link>
            </Grid>
          </Grid>
          </LoadingComponent>
        </div>
      </div>
    );
  }
}

class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondStep: "second step here",
      classicModal: false,
      isLoading: false,
      userStoriesLists: [],
      totalCreditsInfo: {},
      selectedCredits: 0,
      selectedUserStoriesLists: [],
      moveStory: '',
      storyData: {},
      sprintLists: [],
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount(){
    this.getUserStoriesList();
    this.getUserCredit();
    this.getSprintList()
  }

  getUserStoriesList = async ()=>{
    const {location} = this.props;
    this.setState({isLoading: true})
    const response = await this.props.getUserStories(location && location.state && location.state.projectId, location && location.state && location.state.sprintId );
    if(response && response.data) {
      this.setState({userStoriesLists: response.data})
      this.setState({isLoading: false})
    }
  }

  getUserCredit = async ()=>{
    const response = await this.props.getCredit(getUserId());
    if(response && response.data) {
      this.setState({totalCreditsInfo: response.data})
    }
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  handleClickOpen(modal,val) {
    var x = [];
    x[modal] = true;
    this.setState(x);
    this.setState({storyData: val})
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  onChange =(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  handleSelectedUserStories = (e, creditCost, userStoriesId) => {
    let getSelectedUserStories = this.state.selectedUserStoriesLists;
    if(e.target && e.target.checked){
      getSelectedUserStories.push(userStoriesId);
      this.setState({selectedCredits: this.state.selectedCredits + creditCost })
      this.setState({selectedUserStoriesLists: getSelectedUserStories })
    }else{
      const removeUserStoryIndex = getSelectedUserStories.indexOf(userStoriesId);
      _.pullAt(getSelectedUserStories, [removeUserStoryIndex]);
      this.setState({selectedCredits: this.state.selectedCredits - creditCost })
    }
  }

  userStoriesHtml(props) {
    return (
      <div>
        <ExpansionPanel className="developmentTitle" style={styles.removeDecorationExpansionPanel}>
          <ExpansionPanelSummary expandIcon={
            <ExpandMoreIcon style={styles.expandIconPadding} />
          }>{props.title}</ExpansionPanelSummary>
          <ExpansionPanelDetails className="developmentCriteria">
            <Grid container>
              <Grid item xs={12}>
                <strong>Success Criteria :</strong>
                <ul>
                  {
                    _.map(props.criteria, (criteria_val, criteria_index) => {
                      return (
                        <li key={criteria_index}>{criteria_val.text}</li>
                      );
                    })
                  }
                </ul>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  getSprintList = async () =>{
    const projectId = this.props.location && this.props.location.state && this.props.location.state.projectId;
    let sprintId = this.props.location && this.props.location.state && this.props.location.state.sprintId;
    const response = await this.props.loadSprintLists(projectId);
    if(response && response.data){
      const filteredIsSubmitted = response && response.data.filter((item) => (!item.isSubmitted && item.sprintStatus.status !== "In Progress" && item._id !== sprintId));
      this.setState({
        sprintLists: filteredIsSubmitted
      })
    }
  }

  moveSprint =  async () =>{
    const {moveStory, storyData} =this.state
    const response = await this.props.moveUserStoryToAnotherSprint(storyData.project, storyData.sprint, storyData._id, moveStory );
    if(response && response.data) {
      this.getUserStoriesList();
      this.handleClose("classicModal");
      this.props.setUserStoriesData(this.props.userStoriesList);
    }
  }

  async isValidated() {
    if(this.props.sprintInfo.isSubmitted && this.props.sprintInfo.sprintStatus.status == 'Submit Stories') {
      const {location} = this.props;
      if((this.state.selectedCredits > this.props.creditsInfo.credits.available)){
        this.props.showErrorForNotEnoughCredits();
        return false;
      }
      if(this.state.selectedUserStoriesLists.length !== this.state.userStoriesLists.length){
        this.props.showErrorToMoveStoryAnotherSprint();
        return false;
      }

      let data = {
        review: {
          status: 'Completed'
        }
      };

      const reserveCreditsData = [];

      //Reserve credits for user stories
      _.map(this.state.selectedUserStoriesLists, (val, index) => {
          let reserveCreditsUserStorydata = {
            'remark': '',
            'storyId': val,
          };
        reserveCreditsData.push(reserveCreditsUserStorydata);
      });
      const reserveCreditsResponse = await this.props.reserveCredits(getUserId(), reserveCreditsData);
      if(reserveCreditsResponse && !reserveCreditsResponse.success){
        return false;
      }

      //Update user stories review status to completed
      this.state.selectedUserStoriesLists.map((val) => {
        this.props.updateUserStories(data, location && location.state && location.state.projectId, location && location.state && location.state.sprintId, val);
      });

      //Update sprint status to In Progress
      let sprintStatusUpdateData = {
        sprintStatus: {
          status: "In Progress"
        },
        title: this.props.sprintInfo.title
      };
      const response = await this.props.updateSprint(sprintStatusUpdateData, location && location.state && location.state.projectId, location && location.state && location.state.sprintId);
      if(response && response.data) {
        this.props.jumpToStep(0);
      }else{
        return false;
      }
    }
  }

  render() {
    const { userStoriesLists, isLoading, selectedCredits, sprintLists, moveStory } = this.state;
    const { sprintInfo, creditsInfo } = this.props;
    const developmentScreen = (sprintInfo.isSubmitted && sprintInfo.sprintStatus.status == 'In Progress') ? true : false;
    const userData = getUserData();
    const userStories = userStoriesLists.map(
      (val, i) => {
        let newArr = [];
        let updatedAtTime = moment(val.updatedAt).format("DD MMM YY HH:mm ");
        if(userData && userData.timezone){
          updatedAtTime = moment.tz(val.updatedAt, userData.timezone).format("DD MMM YY HH:mm ");
        }
        const element = this.userStoriesHtml(val);

        newArr.push(i+1);
        newArr.push(element);
        if(!developmentScreen){
          newArr.push(<a onClick={() => this.handleClickOpen("classicModal", val)}>{'Move'}</a>);
          newArr.push(val.complexity);
          newArr.push(val.creditCost);
          newArr.push(<input type="checkbox" onChange={(e) => this.handleSelectedUserStories(e, val.creditCost, val._id)}/>);
        }
        if(developmentScreen){
          newArr.push(val.development.status);
          newArr.push(updatedAtTime);
        }
        return newArr;
      });

    return (
      <div>
        {sprintInfo.isSubmitted && sprintInfo.sprintStatus.status == 'In Progress' ?
          <PageTitle title={"Development in Progress"} />:null
        }

        {sprintInfo.isSubmitted && sprintInfo.sprintStatus.status == 'Submit Stories' ?
          <PageTitle title={"Select User Stories for Development"} />:null
        }

        {sprintInfo.isSubmitted && sprintInfo.sprintStatus.status == 'In Progress' ?
          <div>
            <Grid container spacing={16}>
              <Grid item xs={12} className="userstory-custom-table">
                <Table striped={true}
                       tableHead={[
                         "#",
                         "User Story",
                         "Status",
                         "Last Updated",
                       ]}
                       tableData={userStories}
                />
              </Grid>
            </Grid>
          </div> : null
        }
        {sprintInfo.isSubmitted && sprintInfo.sprintStatus.status == 'Submit Stories' ?
          <div>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <p class={(selectedCredits > creditsInfo.credits.available)? 'error': ''} style={styles.floatRight}>Selected {selectedCredits} of {creditsInfo && creditsInfo.credits && creditsInfo.credits.available} available credits</p>
              </Grid>
              <Grid item  xs={12} className="userstory-custom-table">
                <Table striped={true}
                       tableHead={[
                         "#",
                         "User Story",
                         "Move Story",
                         "Complexity",
                         "Credit Cost",
                         "",
                       ]}
                       tableData={userStories}

                />
              </Grid>
            </Grid>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6} lg={4}>
                <Dialog
                  javascriptstyles={{
                    root: javascriptstyles.modalRoot,
                    paper: javascriptstyles.modal
                  }}
                  open={this.state.classicModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => this.handleClose("classicModal")}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={javascriptstyles.modalHeader}
                  >
                    <h4 className={javascriptstyles.modalTitle}>Move Story To</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={javascriptstyles.modalBody}
                  >
                    <div className="form-element movestory-element">
                      <FormControl className={basicsStyle.formControl}>
                        <InputLabel htmlFor="movestory-element">Sprint</InputLabel>
                        <Select
                          name="moveStory"
                          fullWidth={false}
                          value={ moveStory}
                          onChange={this.onChange}
                        >
                          <MenuItem value="">
                            <em>Select Sprint</em>
                          </MenuItem>
                          {sprintLists.map(option => (
                            <MenuItem  value={option._id}>
                              {option.title}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Please select sprint</FormHelperText>
                      </FormControl>
                    </div>
                  </DialogContent>
                  <DialogActions className={javascriptstyles.modalFooter}>
                    <Button color="success" onClick={() => this.moveSprint()}>Move Story</Button>
                    <Button
                      onClick={() => this.handleClose("classicModal")}
                      color="danger"
                      simple
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </GridItem>
            </GridContainer>
          </div>: null
        }
      </div>
    );
  }
}

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thirdtStep: "Third step here",
      acceptanceSelectVal: "Bug Fix",
      userStoryList: [],
    };
  }

  componentWillMount(){
    this.setState({ userStoryList: this.props.userStoriesList })
  }
  componentDidMount(){
    const { location } = this.props;
    this.props.getUserStories( location && location.state && location.state.projectId,location && location.state && location.state.sprintId);
  }

  userStoriesHtml(props) {
    return (
      <div>
        <ExpansionPanel className="developmentTitle" style={styles.removeDecorationExpansionPanel}>
          <ExpansionPanelSummary expandIcon={
            <ExpandMoreIcon style={styles.expandIconPadding} />
          }>{props.title}</ExpansionPanelSummary>
          <ExpansionPanelDetails className="developmentCriteria">
            <Grid container>
              <Grid item xs={12}>
                <strong>Success Criteria :</strong>
                <ul>
                  {
                    _.map(props.criteria, (criteria_val, criteria_index) => {
                      return (
                        <li key={criteria_index}>{criteria_val.text}</li>
                      );
                    })
                  }
                </ul>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  handleSelectAcceptanceStatus = (e,i ) => {
    const { userStoryList } = this.state
    userStoryList[i][e.target.name] = e.target.value
    this.setState({
      userStoryList
    })
  }

  handleAcceptanceSubmit = async(projectId, sprintId, userstoriesId, prevAcceptanceStatus, i, creditCost ) => {
    const { userStoryList } = this.state
    const userData = getUserData();
    const data = {
      acceptance: {
        status: userStoryList[i].acceptanceDropdown || prevAcceptanceStatus
      }
    };
    const credits = {
      amount: creditCost,
      storyId: userstoriesId
    }
    if(userStoryList[i].acceptanceDropdown !== prevAcceptanceStatus){
      const response = await this.props.updateUserStories( data, projectId, sprintId, userstoriesId );
      if(response && response.success){
        const responses = await this.props.getUserStories( projectId, sprintId );
        if(responses && responses.data){
          this.setState({
            userStoryList: responses.data
          })
        }
      }
    } if(userStoryList[i].acceptanceDropdown === "Accepted"){
      const respons = await this.props.deductCredit(credits, userData._id );
      if(respons && respons.data){

      }
    }
  }

  render() {
    const { userStoryList } = this.state;
    const userStories = userStoryList.map(
      (val, i) => {
        let newArr = [];
        const element = this.userStoriesHtml(val);
        newArr.push(i+1);
        newArr.push(element);
        if(val.acceptance.status === 'Bug Fix'){
          newArr.push(<Button type="button" size="sm" style={styles.statusWidth} color="danger" round>{val.acceptance.status}</Button>);
        }else if(val.acceptance.status === 'Test'){
          newArr.push(<Button type="button" size="sm" style={styles.statusWidth} color="warning" round>{val.acceptance.status}</Button>);
        }else if(val.acceptance.status === 'Accepted'){
          newArr.push(<Button type="button" size="sm" style={styles.statusWidth} color="success" round>{val.acceptance.status}</Button>);
        }else{
          newArr.push(<Button className="notAssignedStatusButton" type="button" size="sm" style={styles.statusWidth} color="twitter" round>N/A</Button>);
        }
        newArr.push(
          <div className="form-element">
            <FormControl className={basicsStyle.formControl}>
              <Select  value={val.acceptanceDropdown || val.acceptance.status}
                       onChange={(e) => this.handleSelectAcceptanceStatus(e,i)}
                       disabled={val.acceptance.status === "N/A" || val.acceptance.status === "Not Started" || val.acceptance.status === "Accepted" ? true : false}
                       input={<Input name="acceptanceDropdown"/>}>
                <MenuItem value="Test">Test</MenuItem>
                <MenuItem value="Bug Fix">Bug Fix</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
              </Select>
            </FormControl>
          </div>);
        newArr.push(
          <div>
            <Button
              type="button"
              className={ this.props.isUpdateUserStories ? 'hide-update-button' : '' }
              size="sm"
              style={styles.statusWidth}
              color={(val.acceptance.status === 'N/A' || val.acceptance.status === "Not Started") ? 'default': 'success'}
              disabled={val.acceptance.status === "N/A" || val.acceptance.status === "Not Started"  || val.acceptance.status === "Accepted" ? true : false}
              onClick={() => this.handleAcceptanceSubmit(val.project, val.sprint, val._id, val.acceptance.status, i, val.creditCost)} round>
              Update</Button>
            <div className={ !this.props.isUpdateUserStories ? 'hide-loader' : '' }>
              <CircularProgress/>
            </div>
          </div>);
        return newArr;
      });

    return (
      <div>
        <PageTitle title={"User Stories Acceptance"} />
          <div>
            <Grid container spacing={16}>
              <Grid item  xs={12} className="userstory-custom-table">
                <Table striped={true}
                       tableHead={[
                         "#",
                         "User Story",
                         "Status",
                         "Acceptance",
                         "Update",
                       ]}
                       tableData={userStories}
                />
              </Grid>
            </Grid>
          </div>
      </div>
    );
  }
}

class SprintSubmissionPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      firststep: {
        name: null,
        descriptions: null
      }
    };
  }

  componentWillMount(){
    this.getSprint()
  }

  getSprint = async ()=>{
    const {location} = this.props
    this.setState({isLoading: true})
    const response = await this.props.getSprintDetails((location.state && location.state.projectId), (location.state && location.state.sprintId) );
    if(response && response.data) {
      const stages = response.data && response.data.sprintStatus && response.data.sprintStatus.status === "In Progress" ? 1 : 0
      this.setState({
        currentStep: stages
      },()=>{
        this.onStepChange(stages)
      })
    }
  }

  onStepChange = (step) => {
    this.setState({currentStep: step})
    console.log("Step :", step);
  }

  render() {
    const {location} = this.props;
    const parsedQuery = (this.props.location.search)? queryString.parse(this.props.location.search) : '';
    const steps = [
      { name: "Review", component: <FirstStep getSprintDetails={this.props.getSprintDetails} sprintInfo={this.props.sprintInfo} location={location} history={this.props.history}/>  },
      { name: "Development", component: <SecondStep parsedQuery={parsedQuery} getUserStories={this.props.getUserStories} location={location} sprintInfo={this.props.sprintInfo} getCredit={this.props.getCredit} showErrorToMoveStoryAnotherSprint={this.props.showErrorToMoveStoryAnotherSprint} showErrorForNotEnoughCredits={this.props.showErrorForNotEnoughCredits} updateUserStories={this.props.updateUserStories} creditsInfo={this.props.creditsInfo} reserveCredits={this.props.reserveCredits} loadSprintLists={this.props.loadSprintLists} moveUserStoryToAnotherSprint={this.props.moveUserStoryToAnotherSprint} updateSprint={this.props.updateSprint} setUserStoriesData={this.props.setUserStoriesData} userStoriesList={this.props.userStoriesList} /> },
      { name: "Acceptance", component: <ThirdStep deductCredits={this.props.deductCredits} deductCredit={this.props.deductCredit} getUserStories={this.props.getUserStories} location={location} updateUserStories={this.props.updateUserStories} userStoriesList={this.props.userStoriesList} isUpdateUserStories={this.props.isUpdateUserStories} /> }
    ];

    const nextButtonText = (this.props.sprintInfo.isSubmitted && this.props.sprintInfo.sprintStatus.status == 'In Progress' && this.state.currentStep==1) ? 'Acceptance>' : (this.props.sprintInfo.isSubmitted && this.props.sprintInfo.sprintStatus.status == 'Submit Stories' && this.state.currentStep==1) ? 'Submit>' : 'Next>';
    return (
      <div className="sprint-step">
        <StepZilla
          steps={steps}
          key={this.state.currentStep}
          startAtStep={this.state.currentStep}
          onStepChange={this.onStepChange}
          stepsNavigation={true}
          nextButtonCls={`btn btn-sm btn-custom-success wizard-next-btn customNextReviewPage ${this.state.currentStep==0 ? ' firstStepReviewButton': ''}`}
          backButtonCls="btn btn-sm btn-custom-success wizard-back-btn"
          backButtonText="Back"
          nextButtonText={nextButtonText}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sprintInfo: state.sprint.sprintInfo,
  userStoriesList: state.userStories.userStoriesList,
  isUpdateUserStories: state.userStories.isUpdateUserStories,
  creditsInfo: state.userCredit.creditList,
  deductCredits: state.userUpdate.deductCredits,
});

const mapDispatchToProps = dispatch => ({
  getSprintDetails: (projectId, sprintId) => dispatch(getSprintDetails(projectId, sprintId)),
  getUserStories: (projectId, sprintId) => dispatch(getUserStories(projectId, sprintId)),
  showErrorToMoveStoryAnotherSprint: () => dispatch(showErrorToMoveStoryAnotherSprint()),
  showErrorForNotEnoughCredits: () => dispatch(showErrorForNotEnoughCredits()),
  getCredit: (userID) => dispatch(getCredit(userID)),
  reserveCredits: (userID, data) => dispatch(reserveCredits(userID, data)),
  updateUserStories: (data, projectId, sprintId, storyId) => dispatch(updateUserStories(data, projectId, sprintId, storyId)),
  setUserStoriesData: (data) => dispatch(setUserStoriesData(data)),
  moveUserStoryToAnotherSprint:(projectId, sprintId, storyId, newSprintId)=>dispatch(moveUserStoryToAnotherSprint(projectId, sprintId, storyId, newSprintId)),
  loadSprintLists: (projectId) => dispatch(getAllSprintList(projectId)),
  updateSprint: (data, projectId, sprintId) => dispatch(updateSprint(data, projectId, sprintId)),
  deductCredit: (data, id) => dispatch(deductCredit(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps, null,  { withRef: true })(withStyles(style)(withRouter(SprintSubmissionPages)));
