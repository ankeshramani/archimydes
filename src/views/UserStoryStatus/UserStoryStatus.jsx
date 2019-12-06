import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import NavigationBar from "../../components/inc/NavigationBar";
import Footer from "../../components/Footer/Footer";
import classNames from "classnames";
import Clearfix from "../../components/Clearfix/Clearfix";
import MainPage from "assets/jss/MainPageStyle.jsx";
import styles from "assets/jss/customStyle.jsx";
import UsersStoryStatus from "../../components/UserStoryStatus/UserStoryStatus";
import { getAllSprintList, updateSprint, getOneSprintList } from "../../actions/sprint";
import { getUserStories, moveUserStoryToAnotherSprint, updateUserStories } from "../../actions/userStories";
import connect from "react-redux/es/connect/connect";

class UserStoryStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprintStatus: "",
      sprintReviewStatus: "",
      complexity: "",
      developmentStatus: "",
      acceptanceStatus: "",
      moveUserStoryToSprint: "",
      title: "",
      storyCreditCost: "",
      isLoading: false,
      isLoadings: false,
      sprintLists: [],
      userStoryLists: [],
      sprintData: {},
      newSprintId: {}
    };
  }
   componentWillMount() {
    this.getOneSprint()
    this.getSprintList()
    this.getUserStoryList()
  }

  getOneSprint = async () =>{
    this.setState({isLoadings: true})
    const response = await this.props.getOneSprintList(this.props.location.state.projectId, this.props.location.state.sprintId)
    if(response && response.data){
      this.setState({
        sprintStatus: response.data.sprintStatus.status === "Not Started"  ? 'Draft' : response.data.sprintStatus.status,
        sprintData: response.data,
        isLoadings: false,
      })
    }
  }

  getUserStoryList = async () =>{
    this.setState({isLoading: true})
    const response = await this.props.getUserStories(this.props.location.state.projectId, this.props.location.state.sprintId)
    if(response && response.data){
      const test = response.data && response.data.map((item) => {
        const p = {
          ...item,
          storyCreditCost: item.complexity === "Low" ? 1 : item.complexity === "Medium" ? 3 : item.complexity === "High" ? 6 : ""
        }
        return p
      })
      this.setState({
        userStoryLists: test,
        isLoading: false,
      })
    }
  }

  getSprintList = async () =>{
    const sprintId = this.props.location.state.sprintId
    const response = await this.props.loadSprintLists(this.props.location.state.projectId)
    if(response && response.data){
      const filteredIsSubmitted = response && response.data.filter((item) => (item._id !== sprintId));
      this.setState({
        sprintLists: filteredIsSubmitted
      })
    }
  }

  onSprintChane = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  onChange = (e, i) => {
    const { userStoryLists } = this.state
    userStoryLists[i][e.target.name] = e.target.name === "storyCreditCost" ? Math.abs(e.target.value) : e.target.value
    const data = userStoryLists[i][e.target.name];
    userStoryLists[i]["storyCreditCost"] = data === "Low" ? 1 : data === "Medium" ? 3 : data === "High" ? 6 : null
    this.setState({
      userStoryLists
    })
   /* const filteredSprintId = userStoryLists.filter((item) => (item.moveUserStoryToSprint));
    this.setState({
      newSprintId: filteredSprintId
    })*/
  };

  onBacke = () =>{
   const projectId = this.props.location.state.projectId
    this.props.history.push(`/admin/projects/${projectId}/sprints`)
  }

  updateSprint = async ()=> {
    const {sprintStatus,title} = this.state
    let data = {
      sprintStatus: {
        status: sprintStatus
      },
      title: title
    };
    this.setState({isLoadings: true})
    const response = await this.props.updateSprint(data, this.props.location.state.projectId, this.props.location.state.sprintId);
    if(response && response.data){
      this.setState({
        isLoadings: false,
      })
    }
  }

  onUpdateUserStory = async (id, i) => {
    const { userStoryLists, newSprintId } = this.state;
    let data = {
      complexity: userStoryLists[i].complexity,
      acceptance: {
        status: userStoryLists[i].acceptanceStatus || userStoryLists[i].acceptance.status
      },
      development: {
        status: userStoryLists[i].developmentStatus || userStoryLists[i].development.status
      }
    };
      try {
        this.setState({
          isLoading: true
        });
        const response = await this.props.updateUserStories(data, this.props.location.state.projectId, this.props.location.state.sprintId, id);
        if (response && response.data) {
          this.getUserStoryList()
          this.setState({
            isLoading: false,
          });
        } else {
          this.setState({
            message: response.response && response.response.data && response.response.data.errorMessage,
            isLoading: false,
          });
        }
      } catch (error) {
        this.setState({
          message: error.message,
          isLoading: false,
        });
      }
    if(userStoryLists[i].moveUserStoryToSprint){
      const selectSprintId = userStoryLists[i].moveUserStoryToSprint
      this.setState({isLoading: true})
      const response = await this.props.moveUserStoryToAnotherSprint(this.props.location.state.projectId, this.props.location.state.sprintId, id, selectSprintId);
      if(response && response.data) {
        this.setState({isLoading: false})
        this.getUserStoryList()
      }

    }

  };

  render() {
    const { classes, } = this.props;
    return (
      <div>
        <div style={styles.removePadding}>
          <NavigationBar />
        </div>

        <div className={classNames(classes.main)}>
          <div style={styles.projectListSection}>
          <UsersStoryStatus onChange={this.onChange} onSprintChane={this.onSprintChane} onBacke={this.onBacke} state={this.state} updateSprint={this.updateSprint} onUpdateUserStory={this.onUpdateUserStory}/>
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
const mapStateToProps = state => ({
  sprintSavedData: state.sprint.sprintSavedData,
  userStoriesUpdateData: state.userStories.userStoriesUpdateData,
  sprintListData: state.sprint.data,
  userStoriesList: state.userStories.userStoriesList,
  moveUserStoriesListResponse:state.userStories.moveUserStoriesListResponse,
});

const mapDispatchToProps = dispatch => ({
  updateUserStories: (data, projectId, sprintId, storyId) => dispatch(updateUserStories(data, projectId, sprintId, storyId)),
  loadSprintLists: (projectId) => dispatch(getAllSprintList(projectId)),
  getUserStories: (projectId, sprintId) => dispatch(getUserStories(projectId, sprintId)),
  moveUserStoryToAnotherSprint:(projectId, sprintId, storyId, newSprintId)=>dispatch(moveUserStoryToAnotherSprint(projectId, sprintId, storyId, newSprintId)),
  updateSprint: (data, projectId, sprintId) => dispatch(updateSprint(data, projectId, sprintId)),
  getOneSprintList: (projectId, sprintId) => dispatch(getOneSprintList(projectId, sprintId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(MainPage)(UserStoryStatus));