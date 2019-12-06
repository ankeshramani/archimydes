import React from "react";
import {withRouter, Link} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Slide from "@material-ui/core/Slide";
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from "@material-ui/core/InputLabel";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Help from '@material-ui/icons/Help';
import StepZilla from "react-stepzilla";
import PropTypes from 'prop-types';
import LoadingComponent from "components/inc/LoadingComponent";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx";
import javascriptstyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { saveProject, updateProject, clearProjectData, getProjectDetails, setProjectData } from "../../actions/project";
import { saveSprint, updateSprint, clearSprintData, getSprintDetails, setSprintData, getAllSprintList } from "../../actions/sprint";
import { saveUserStories, addSuccessCriteria, removeSuccessCriteria, clearSuccessCriteria, clearUserStoriesData, getUserStories, setUserStoriesData, moveUserStoryToAnotherSprint, deleteUserStory,getOneUserStories,updateUserStories } from "../../actions/userStories";
import _ from 'lodash-es';
import queryString from 'query-string';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import {stateFromHTML} from 'draft-js-import-html';


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstStep: "first step here",
      projectTitle: this.props.projectSavedData.title ? this.props.projectSavedData.title : '',
      projectDescription: this.props.projectSavedData.description ? this.props.projectSavedData.description : '',
      projectTitleError: false,
      projectDescriptionError: false,
      isLoading: false,
    };
    this.isValidated = this.isValidated.bind(this);
  }

  async componentDidMount() {
    if(this.props.parsedQuery && this.props.parsedQuery.project_id){
      const response = await this.props.getProjectDetails(this.props.parsedQuery.project_id)
      if(response && response.data){
        this.setState({
          projectTitle: response.data.title,
          projectDescription: response.data.description
        })
      }
      if(this.props.parsedQuery.step == 'sprint_review'){
        this.props.jumpToStep(3);
      }else if(this.props.parsedQuery.step == 'sprint'){
        this.props.jumpToStep(1);
      }
    }
  }

  componentDidUpdate(prevProps){
    if(!_.isEqual(prevProps.projectSavedData, this.props.projectSavedData)) {
      this.setState(
        {
          projectTitle: this.props.projectSavedData.title,
          projectDescription: this.props.projectSavedData.description
        });
    }
  }

  render() {
    const { isSaving } = this.props;

    return (
      <div>
        <PageTitle title={'Create New Project'} />
        <LoadingComponent isLoading={ this.state.isLoading }>
          <div className="form-element">
            <div className="title form-label">
              <h3 className="form-label-text">Project Title:</h3>
            </div>
            <TextField
              id="regular"
              inputProps={{
                maxLength: 150,
                placeholder: ""
              }}
              className="form-textfield"
              fullWidth={true}
              error={ this.state.projectTitleError ? true : false }
              value={ this.state.projectTitle }
              onChange={(e) => {
                this.handleProjectTitle(e);
              }}
              onBlur={(e) => {
                this.handleProjectTitleValidation(e);
              }}
            />
          </div>
          <div className="form-element">
            <div className="title form-label">
              <h3 className="form-label-text">Project Description:</h3>
            </div>
            <TextField
              id="outlined-multiline-flexible"
              inputProps={{
                placeholder: "",
                rowsMax:"2",
                variant:"outlined",
                maxLength: 2500,
              }}
              className="form-textfield"
              fullWidth={true}
              multiline={true}
              error={ this.state.projectDescriptionError ? true : false }
              value={ this.state.projectDescription }
              onChange={(e) => {
                this.handleProjectDescription(e);
              }}
              onBlur={(e) => {
                this.handleProjectDescValidation(e);
              }}
            />
          </div>
          { this.props.parsedQuery && this.props.parsedQuery.step=='project'&& this.props.parsedQuery.project_id &&
            <div>
              {this.props.history.location.state === "addSprint" ? null :
                <Button
                  type="button"
                  color="default"
                  round
                  size="sm"
                  href={`/new?step=sprint_review&project_id=${this.props.parsedQuery.project_id}&sprint_id=${this.props.parsedQuery.sprint_id}`}
                  className="custom-stepwizard-cancel-btn"
                >
                  Cancel
                </Button>
              }
            </div>
          }

        </LoadingComponent>
      </div>
    );
  }

  handleProjectTitle = (event) => {
    this.setState({ projectTitle: event.target.value });
  };

  handleProjectTitleValidation = (event) => {
    if(!event.target.value){
      this.setState({ projectTitleError: true });
    }else{
      this.setState({ projectTitleError: false });
    }
  };

  handleProjectDescValidation = (event) => {
    if(!event.target.value){
      this.setState({ projectDescriptionError: true });
    }else{
      this.setState({ projectDescriptionError: false });
    }
  };

  handleProjectDescription = (event) => {
    this.setState({ projectDescription: event.target.value });
  };

  async isValidated() {
    this.setState({isLoading: true})
    if(!(this.state.projectTitle)){
      this.setState({ projectTitleError: true });
    }else{
      this.setState({ projectTitleError: false });
    }

    if(!(this.state.projectDescription)){
      this.setState({ projectDescriptionError: true });
    }else{
      this.setState({ projectDescriptionError: false });
    }

    if(this.state.projectTitle && this.state.projectDescription){
      const data = {
        'title': this.state.projectTitle,
        'description': this.state.projectDescription,
      }

      if(this.props.parsedQuery && this.props.parsedQuery.step=='project'&& this.props.parsedQuery.project_id) {
        const response = await this.props.updateProject(data, this.props.parsedQuery.project_id);
        if(response.success==true){
          this.props.jumpToStep(3)
          this.setState({isLoading: false})
          return true;
        //  this.props.jumpToStep(3);
         // this.context.router.history.push('/new?step=sprint_review&project_id='+this.props.parsedQuery.project_id+'&sprint_id='+this.props.parsedQuery.sprint_id);
        }else{
          this.setState({isLoading: false})
          return false;
        }
      }else{
        if (this.props.projectSavedData._id) {
          const response = await this.props.updateProject(data, this.props.projectSavedData._id);
          if (response.success == true) {
            this.props.jumpToStep(3)
            this.setState({isLoading: false})
            return true;
          } else {
            this.setState({isLoading: false})
            return false;
          }
        } else {
          const response = await this.props.createNewProject(data);
          if (response.success == true) {
            this.setState({isLoading: false})
            return true;
          } else {
            this.setState({isLoading: false})
            return false;
          }
        }
      }
    }
    return false;
  }
}

FirstStep.contextTypes = {
  router: PropTypes.object.isRequired
};


class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondStep: "second step here",
      sprintTitle: this.props.sprintSavedData.title ? this.props.sprintSavedData.title : '',
      editSprint: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    const {history} =this.props
    this.setState({editSprint: history && history.location && history.location.state})
    if(!this.props.projectListData.length) {
      this.context.router.history.push('/new');
    }
  }

  backe = () =>{
    const { editSprint } =this.state
    const { history } = this.props
    if(editSprint === "editSprint"){
      this.props.jumpToStep(3)
    }else {
      this.props.jumpToStep(0)
      history.push({pathname:"/new",search:`?step=project&project_id=${this.props.parsedQuery.project_id}`,state:"addSprint"})
    }
  }
  render() {
    return (
      <div>
        <PageTitle title={'Create New Sprint'} />
        <LoadingComponent isLoading={ this.state.isLoading }>
        <div className="form-element">
          <div className="title form-label">
            <h3 className="form-label-text">Title:</h3>
          </div>
          <TextField
            id="regular"
            inputProps={{
              maxLength: 150,
              placeholder: ""
            }}
            className="form-textfield"
            fullWidth={true}
            error={ this.state.sprintTitleError ? true : false }
            value={ this.state.sprintTitle }
            onChange={(e) => {
              this.handleSprintTitle(e);
            }}
            onBlur={(e) => {
              this.handleSprintTitleValidation(e);
            }}
          />
        </div>
        </LoadingComponent>
        <div>
          <Button
            type="button"
            color="success"
            round
            size="sm"
            className="custom-stepwizard-cancel-btn"
            onClick={this.backe}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  handleSprintTitle = (event) => {
    this.setState({ sprintTitle: event.target.value });
  };

  handleSprintTitleValidation = (event) => {
    if(!event.target.value){
      this.setState({ sprintTitleError: true });
    }else{
      this.setState({ sprintTitleError: false });
    }
  };

  async isValidated() {
    this.setState({isLoading: true})
    if(!(this.state.sprintTitle)){
      this.setState({ sprintTitleError: true });
    }else{
      this.setState({ sprintTitleError: false });
    }

    if(this.state.sprintTitle){
      const data = {
        'title': this.state.sprintTitle,
      }
      if(this.props.projectSavedData._id){
        if(this.props.sprintSavedData._id){
          const response = await this.props.updateSprint(data, this.props.projectSavedData._id, this.props.sprintSavedData._id);
          if(response.success == true){
            this.props.jumpToStep(3)
            this.setState({isLoading: false})
            return true;
          }else{
            this.setState({isLoading: false})
            return false;
          }
        }else{
          const response = await this.props.createNewSprint(data, this.props.projectSavedData._id);
          if(response.success == true){
            this.props.jumpToStep(3)
            this.setState({isLoading: false})
            return true;
          }else{
            this.setState({isLoading: false})
            return false;
          }
        }
      }else{
        if(this.props.parsedQuery && this.props.parsedQuery.step=='sprint' && this.props.parsedQuery.project_id){
          const response = await this.props.createNewSprint(data, this.props.parsedQuery.project_id);
          if(response.success == true){
            this.props.jumpToStep(2);
          }else{
            this.setState({isLoading: false})
            return false;
          }
        }
      }
    }
    return false;
  }
}

SecondStep.contextTypes = {
  router: PropTypes.object.isRequired
};


class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thirdtStep: "Third step here",
      criteriaData: [],
      userStoriesTitleOne: '',
      userStoriesTitleTwo: '',
      userStoriesTitleThree: '',
      userStoriesDescription: '',
      userStoriesTitleOneError: false,
      userStoriesTitleTwoError: false,
      userStoriesTitleThreeError: false,
      userStoriesDescriptionError: false,
      complexity: 'Low',
      storyAcceptanceText: '',
      addStory: "",
      storyId: "",
      editStory: "",
      projectId: "",
      sprintId: "",
      isLoading: false,
      editorState: EditorState.createEmpty(),
    };
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(!_.isEqual(prevProps.successCriteriaData , this.props.successCriteriaData)) {
      const criteriaData = this.props.successCriteriaData.map(
        (val, i) => {
          let newArr = [];
          newArr.push(i+1);
          newArr.push(val);
          newArr.push(<div className="success-criteria-delete"><IconButton color="secondary" onClick={() => this.handleDeleteStoryAcceptance(i)} ><Close /></IconButton></div>);
          return newArr;
        });
      this.setState({criteriaData})
    }
  }

  componentWillMount () {
    const {history} =this.props
    this.setState({
      addStory: history && history.location && history.location.state,
      editStory: history && history.location && history.location.state,
      storyId: history && history.location && history.location.storyId,
      projectId: history && history.location && history.location.projectId,
      sprintId: history && history.location && history.location.sprintId,
      index: history && history.location && history.location.index,
    })

  }
  componentDidMount() {
    this.getOneUserStory()
  }

  getOneUserStory = async () =>{
    const {projectId, sprintId, storyId,editStory} = this.state
    if(editStory === "editStory"){
      const response = await this.props.getOneUserStories(projectId, sprintId, storyId)
      if(response && response.data){
        this.setState({
          userStoriesTitleOne: response.data.titleObject.role,
          userStoriesTitleTwo: response.data.titleObject.want,
          userStoriesTitleThree: response.data.titleObject.purpose,
          userStoriesDescription: response.data.description,
          complexity: response.data.complexity,
        })
        const updateStorySuccessCriteria = _.map(response && response.data && response.data.criteria || [], (val, i) => {
          this.props.addSuccessCriteria(val.text);
        });
      }
      const contentState = stateFromHTML(response.data.description);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({editorState: editorState});
    }

  }

  backe = () =>{
    const { addStory, editStory} = this.state
    if(addStory === "addStory"){
      this.props.jumpToStep(3)
    }else if(editStory === "editStory"){
      this.props.jumpToStep(3)
      this.props.clearSuccessCriteria();
    }else {
      this.props.jumpToStep(1)
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.setState({ userStoriesDescription: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
  };

  onEditorStateBlur = (descText) => {
    if(!descText){
      this.setState({ userStoriesDescriptionError: true });
    }else{
      this.setState({ userStoriesDescriptionError: false });
    }
  }

  render() {
    const { editorState } = this.state;
    const complexity = [
      {
        value: 'Low',
        label: 'Low',
      },
      {
        value: 'Medium',
        label: 'Medium',
      },
      {
        value: 'High',
        label: 'High',
      },
    ];

    const tableHeadData = [
      "#",
      "Criteria",
      "Action"
    ];
    const {criteriaData, editStory, index} = this.state;
    return (
      <div>
        <PageTitle title={editStory === "editStory" ? "Update User Stories" : 'Create User Stories'} />
        <LoadingComponent isLoading={ this.state.isLoading }>
        <Grid container>
          <Grid item xs={12}>
            <div className="title form-label">
              <h3 className="form-label-text">{editStory === "editStory"  ? `Update User Story No. ${index}` : `Add User Story No. ${ this.props.userStoriesSavedData.length + 1 }`}</h3>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-element">
              <div className="title form-label">
                <h3 className="form-label-text">As a:</h3>
              </div>
              <TextField
                id="regular"
                inputProps={{
                  maxLength: 150,
                  placeholder: "Customer"
                }}
                className="form-textfield"
                fullWidth={true}
                error={ this.state.userStoriesTitleOneError ? true : false }
                value={ this.state.userStoriesTitleOne }
                onChange={(e) => {
                  this.handleUserStoriesTitleOne(e);
                }}
                onBlur={(e) => {
                  this.handleUserStoriesTitleOneValidation(e);
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-element">
              <div className="title form-label">
                <h3 className="form-label-text">I want:</h3>
              </div>
              <TextField
                id="regular"
                inputProps={{
                  maxLength: 150,
                  placeholder: "to add a shopping item to my cart"
                }}
                className="form-textfield"
                fullWidth={true}
                error={ this.state.userStoriesTitleTwoError ? true : false }
                value={ this.state.userStoriesTitleTwo }
                onChange={(e) => {
                  this.handleUserStoriesTitleTwo(e);
                }}
                onBlur={(e) => {
                  this.handleUserStoriesTitleTwoValidation(e);
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-element">
              <div className="title form-label">
                <h3 className="form-label-text">So that:</h3>
              </div>
              <TextField
                id="regular"
                inputProps={{
                  maxLength: 150,
                  placeholder: "I can perform a checkout"
                }}
                className="form-textfield"
                fullWidth={true}
                error={ this.state.userStoriesTitleThreeError ? true : false }
                value={ this.state.userStoriesTitleThree }
                onChange={(e) => {
                  this.handleUserStoriesTitleThree(e);
                }}
                onBlur={(e) => {
                  this.handleUserStoriesTitleThreeValidation(e);
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-element">
              <div className="title form-label">
                <h3 className="form-label-text">Description:</h3>
              </div>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName={ this.state.userStoriesDescriptionError ? "editorWrapper editorRequiredError" : "editorWrapper" }
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
                onBlur={() => this.onEditorStateBlur(editorState.getCurrentContent().hasText())}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-element form-select-element complexity-element">
              <FormControl className={basicsStyle.formControl}>
                <InputLabel htmlFor="complexity-helper">Complexity</InputLabel>
                <Select
                  value={this.state.complexity}
                  onChange={(e) => {
                    this.handleUserStoriesComplexity(e);
                  }}
                  input={<Input name="age" id="complexity-helper" />}
                >
                  {complexity.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Please select complexity</FormHelperText>
              </FormControl>
            </div>
            <div className="form-element complexity-element">
              <Help className="complexity-help"/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-element">
              <Grid container>
                <Grid item xs={12}>
                  <div className="title form-label">
                    <h3 className="form-label-text">Story Acceptance Criteria:</h3>
                  </div>
                </Grid>
                <Grid item md={10} sm={10} xs={12}>
                  <TextField
                    id="regular"
                    inputProps={{
                      maxLength: 150,
                      placeholder: "",
                    }}
                    value = {this.state.storyAcceptanceText}
                    className="form-textfield"
                    fullWidth={true}
                    onChange={(e) => {
                      this.handleStoryAcceptanceCriteria(e);
                    }}
                  />
                </Grid>
                <Grid item md={2} sm={2} xs={12}>
                  <div className="btn-add-criteria">
                    <Button
                      type="button"
                      size="sm"
                      color="success"
                      round
                      onClick={() => this.handleSubmitStoryAcceptance(this.state.storyAcceptanceText)}
                    >
                      Add Criteria
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="title form-label">
              <h3 className="form-label-text">Story Success Criteria</h3>
            </div>
            <Table striped={true}
                   tableHead={tableHeadData}
                   tableData={criteriaData}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="button"
              color="success"
              round
              size="sm"
              className="add-story-btn"
              onClick={() => this.handleUserStoryValidation()}
            >
              {editStory === "editStory" ? "Update Story" : "Add Story"}
            </Button>
          </Grid>
        </Grid>
        </LoadingComponent>
        <div>
          <Button
            type="button"
            color="success"
            round
            size="sm"
            className="custom-stepwizard-cancel-btn"
            onClick={this.backe}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  handleUserStoriesTitleOne = (event) => {
    this.setState({ userStoriesTitleOne: event.target.value });
  };

  handleUserStoriesTitleTwo = (event) => {
    this.setState({ userStoriesTitleTwo: event.target.value });
  };

  handleUserStoriesTitleThree = (event) => {
    this.setState({ userStoriesTitleThree: event.target.value });
  };

  handleUserStoriesTitleOneValidation = (event) => {
    if(!event.target.value){
      this.setState({ userStoriesTitleOneError: true });
    }else{
      this.setState({ userStoriesTitleOneError: false });
    }
  };

  handleUserStoriesTitleTwoValidation = (event) => {
    if(!event.target.value){
      this.setState({ userStoriesTitleTwoError: true });
    }else{
      this.setState({ userStoriesTitleTwoError: false });
    }
  };

  handleUserStoriesTitleThreeValidation = (event) => {
    if(!event.target.value){
      this.setState({ userStoriesTitleThreeError: true });
    }else{
      this.setState({ userStoriesTitleThreeError: false });
    }
  };

  handleUserStoriesComplexity = (event) => {
    this.setState({ complexity: event.target.value });
  };

  handleStoryAcceptanceCriteria = (event) => {
    this.setState({ storyAcceptanceText: event.target.value });
  };

  handleSubmitStoryAcceptance = (title) => {
    if(title != ''){
      this.props.addSuccessCriteria(title);
      this.setState({ storyAcceptanceText: ''});
    }
  }

  handleDeleteStoryAcceptance = (val) => {
    confirmAlert({
      title: 'Are you sure ?',
      message: 'Are you sure want to delete this success criteria?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.removeSuccessCriteria(val),
          className: 'remove-success-criteria'
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ]
    })
  };

  handleClearForm(){
    this.setState({
      userStoriesTitleOne: '',
      userStoriesTitleTwo: '',
      userStoriesTitleThree: '',
      userStoriesDescription: '',
      complexity: 'Low',
    });
    this.props.clearSuccessCriteria();
  }

   handleUserStoryValidation = async () =>{
     this.setState({isLoading: true})
    const {editStory,projectId, sprintId,storyId } = this.state
    if(!(this.state.userStoriesTitleOne)){
      this.setState({ userStoriesTitleOneError: true });
    }else{
      this.setState({ userStoriesTitleOneError: false });
    }

    if(!(this.state.userStoriesTitleTwo)){
      this.setState({ userStoriesTitleTwoError: true });
    }else{
      this.setState({ userStoriesTitleTwoError: false });
    }

    if(!(this.state.userStoriesTitleThree)){
      this.setState({ userStoriesTitleThreeError: true });
    }else{
      this.setState({ userStoriesTitleThreeError: false });
    }

    if(!(this.state.userStoriesDescription)){
      this.setState({ userStoriesDescriptionError: true });
    }else{
      this.setState({ userStoriesDescriptionError: false });
    }
    if(this.state.userStoriesTitleOne && this.state.userStoriesTitleTwo && this.state.userStoriesTitleThree && !this.state.userStoriesDescriptionError){
      const titleObject = {
        "role" : this.state.userStoriesTitleOne,
        "want": this.state.userStoriesTitleTwo,
        "purpose" : this.state.userStoriesTitleThree
      }
      const data = {
        'titleObject': titleObject,
        'description': this.state.userStoriesDescription,
        'complexity': this.state.complexity,
        'criteria':this.props.successCriteriaData,
      }
      if(editStory === "editStory"){
        const response = await this.props.updateUserStories(data,projectId, sprintId, storyId)
        if(response && response.data){
          this.setState({isLoading: false})
        }else {
          this.setState({isLoading: false})
        }
      }else {
        if(this.props.projectSavedData._id || this.props.sprintSavedData.project  && this.props.sprintSavedData._id){
          const response = await this.props.createNewUserStory(data, this.props.sprintSavedData.project || this.props.projectSavedData._id, this.props.sprintSavedData._id);
          if(response.success == true){
            this.handleClearForm();
            this.isValidated(true);
            this.setState({isLoading: false})
          }else{
            this.isValidated(true);
            this.setState({isLoading: false})
          }
        }
      }

    }
    this.isValidated(false);
  }

  isValidated(validationResponse) {
    return validationResponse;
  }
}

class FourthStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fourthStep: "fourth step here",
      classicModal: false,
      isLoading: false,
      sprintLists: [],
      moveStory: '',
      storyData: {},
      userStoriesSavedData: [],
      projectId: "",
      sprintId: "",
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  async componentWillMount(){
    const {projectId, sprintId, sprintSavedData } = this.props
    const responses = await this.props.getUserStories(projectId, sprintId || sprintSavedData._id )
    if(responses.success === true){
      this.setState({userStoriesSavedData: responses && responses.data});
    }
  }

  sendData =(projectSavedData, sprintSavedData) =>{
    const { history } = this.props
    history.push({
      pathname: `/projects/${sprintSavedData}/sprint/status`,
      state: {
        projectId: projectSavedData,
        sprintId: sprintSavedData
      }
    })
  }

  onSubmitSprint =  async () =>{
    this.setState({isLoading: true})
    const {projectSavedData, sprintSavedData} = this.props
      const data = {
        "isSubmitted":true
      }
      const response = await this.props.updateSprint(data, projectSavedData && projectSavedData._id, sprintSavedData && sprintSavedData._id);
      if(response && response.data) {
        this.setState({isLoading: false})
       this.sendData(projectSavedData && projectSavedData._id, sprintSavedData && sprintSavedData._id)
        console.log(response.data)
      }
  }

  moveSprint =  async () =>{
    const {moveStory, storyData} =this.state
    const response = await this.props.moveUserStoryToAnotherSprint(storyData.project, storyData.sprint, storyData._id, moveStory );
    if(response && response.data) {
      const responses = await this.props.getUserStories(storyData.project, storyData.sprint)
      if(responses.success === true){
        this.setState({userStoriesSavedData: responses && responses.data})
      }
      this.handleClose("classicModal")
      this.props.setUserStoriesData(this.props.userStoriesList)
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
  handleClickOpen = async (modal,val) => {
    var x = [];
    x[modal] = true;
    this.setState(x);
    const response = await this.props.loadSprintLists(val.project)
    if(response && response.data){
      const filteredIsSubmitted = response && response.data.filter((item) => (!item.isSubmitted && item.sprintStatus.status !== "In Progress" && item._id !== val.sprint));
      this.setState({
        sprintLists: filteredIsSubmitted
      })
    }
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

  onDelete = async (projectId, sprintId, storyId) =>{
    try{
      const response = await this.props.deleteUserStory(projectId, sprintId, storyId);
      if(response && response.data){
        const response = await this.props.getUserStories(projectId, sprintId)
        if(response.success === true){
          this.setState({userStoriesSavedData: response && response.data})
        }
      }
    }catch (er) {
      if(er.response){
        this.setState({
          message: er.response.data.errorMessage,
        })
      }
    }
  }

  confirmDeleteUserStory = (projectId, sprintId, storyId) => {
    confirmAlert({
      title: 'Are you sure ?',
      message:'Are you sure want to delete  this user Story?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.onDelete(projectId, sprintId, storyId),
          className: 'Sonu',
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ]
    })
  };

  onBacke = (sprintEdit, projectId, sprintId, storyId, index) =>{
    const { history } = this.props
    this.setState({projectId: projectId, sprintId: sprintId})
    if(sprintEdit === "editSprint"){
      this.props.jumpToStep(1)
      history.push({
        pathname: "/new",
        state:"editSprint"
      })
    }else if(sprintEdit === "addStory"){
      this.props.jumpToStep(2)
      history.push({
        pathname: "/new",
        state:"addStory",projectId
      })
    }else if(sprintEdit === "editStory"){
      this.props.jumpToStep(2)
      history.push({
        pathname: "/new",
        state:"editStory", storyId, projectId,sprintId ,index
      })
    }
  }

  render() {
    const {isLoading, sprintLists, moveStory} = this.state
    return (
      <div>
        <div className="review-section">
          {isLoading && <CircularProgress />}
          <div className="title-section">
            <h5>Project Information:</h5>
            <a href={`/new?step=project&project_id=${this.props.projectSavedData._id}&sprint_id=${this.props.sprintSavedData._id}`}>{'<Edit'}</a>
          </div>
          {this.props.projectSavedData &&
            <div className="info-section">
              <p><strong>Project Name: </strong> {this.props.projectSavedData.title} </p>
              <p><strong>Project Description: </strong> {this.props.projectSavedData.description} </p>
            </div>
          }
          <hr/>
        </div>
        <div className="review-section">
          <div className="title-section">
            <h5>Sprint Information:</h5>
            <a href="#" onClick={()=> this.onBacke("editSprint")}>{'<Edit'}</a>
          </div>
          {this.props.sprintSavedData &&
          <div className="info-section">
            <p><strong>Sprint Title: </strong> {this.props.sprintSavedData.title} </p>
          </div>
          }
          <hr/>
        </div>
        <div className="review-section">
          <div className="title-section">
            <h5>User Stories:</h5>
            <a  href="#" onClick={()=> this.onBacke("addStory")}>{'<Add'}</a>
          </div>
          {
            _.map(this.state.userStoriesSavedData, (val, i) => {
              return (
              <div className="user=info-section" key={i}>
                <div className="info-section">
                  <div className="user-stories-title-section">
                    <p><strong>Story { i+1 }/{ this.state.userStoriesSavedData.length }: </strong> { val.title }</p>
                    <div className="user-stories-actions">
                      <a href="#" onClick={()=> this.onBacke("editStory",val.project, val.sprint, val._id, i+1)} >{'<Edit'}</a>
                      <a href="#" onClick={() => this.confirmDeleteUserStory(val.project, val.sprint, val._id)}>{'<Delete'}</a>
                      <a href="#" onClick={() => this.handleClickOpen("classicModal",val)}>
                        {'<Move Story'}
                      </a>
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
                              <Button color="success" onClick={this.moveSprint}>Move Story</Button>
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
                    </div>
                  </div>
                  <p><strong>Complexity: </strong> { val.complexity }</p>
                  <p>
                    <strong>Acceptance Criteria: </strong>
                    <ul>
                      {
                        _.map(val.criteria, (criteria_val, criteria_index) => {
                          return (
                            <li key={criteria_index}>{criteria_val.text}</li>
                          );
                        })
                      }
                    </ul>
                  </p>
                </div>
              </div>
              );
            })
          }
          <hr/>
          <div>
            <Button
              type="button"
              color="success"
              round
              size="sm"
              className="custom-stepwizard-cancel-btn"
              onClick={()=>this.props.jumpToStep(2)}
            >
              Back
            </Button>
          </div>
          <div style={{float:"right",marginTop:"15px"}}><Button color="success" onClick={this.onSubmitSprint} round>Submit Sprint</Button></div>
        </div>
      </div>
    );
  }

  isValidated() {

  }
}

class StepWizard extends React.Component {
  constructor(props) {
    super(props);
    this.onStepChange = this.onStepChange.bind(this);
    this.state ={
      firststep: {
        name: null,
        descriptions: null
      },
      projectId: "",
      sprintId: "",
    }
  }


  onStepChange(step) {
    console.log('Step :',step)
    this.props.clearSuccessCriteria();
  }

  async getSprintReviewInfo(project_id, sprint_id){
    const projectResponse = await this.props.getProjectDetails(project_id);
    if(projectResponse.success == true){
      this.props.setProjectData(this.props.projectInfo);
    }

    const sprintResponse = await this.props.getSprintDetails(project_id, sprint_id);
    if(sprintResponse.success == true){
      this.props.setSprintData(this.props.sprintInfo);
    }

    const userStoriesResponse = await this.props.getUserStories(project_id, sprint_id);
    if(userStoriesResponse.success == true){
      this.props.setUserStoriesData(this.props.userStoriesList);
    }
  }

  componentDidMount() {
    if(this.props.location.search){
      const parsedSearchQuery = queryString.parse(this.props.location.search);
      if(parsedSearchQuery.step='sprint_review' && parsedSearchQuery.project_id && parsedSearchQuery.sprint_id){
        this.getSprintReviewInfo(parsedSearchQuery.project_id, parsedSearchQuery.sprint_id);
      }
      this.setState({
        projectId: parsedSearchQuery.project_id,
        sprintId: parsedSearchQuery.sprint_id
      })
    }
  }

  componentWillUnmount() {
    this.props.clearProjectData();
    this.props.clearSprintData();
    this.props.clearUserStoriesData();
  }

  render() {
    const parsedQuery = (this.props.location.search)? queryString.parse(this.props.location.search) : '';
    const steps = [
      { name: "Project", component: <FirstStep history={this.props.history} getProjectDetails={this.props.getProjectDetails} createNewProject={this.props.saveProject} projectSavedData={this.props.projectSavedData} updateProject={this.props.updateProject} parsedQuery={parsedQuery} /> },
      { name: "Sprint", component: <SecondStep history={this.props.history}  createNewSprint={this.props.saveSprint} updateSprint={this.props.updateSprint} parsedQuery={parsedQuery} projectSavedData={this.props.projectSavedData} sprintSavedData={this.props.sprintSavedData} projectListData={this.props.projectListData} parsedQuery={parsedQuery}/> },
      { name: "User Stories", component: <ThirdStep updateUserStories={this.props.updateUserStories} userStoriesUpdateData={this.props.userStoriesUpdateData} getOneUserStories={this.props.getOneUserStories} history={this.props.history} createNewUserStory={this.props.saveUserStories} parsedQuery={parsedQuery}  projectSavedData={this.props.projectSavedData} sprintSavedData={this.props.sprintSavedData} userStoriesSavedData={this.props.userStoriesSavedData} addSuccessCriteria={this.props.addSuccessCriteria} removeSuccessCriteria={this.props.removeSuccessCriteria} successCriteriaData={this.props.successCriteriaData} clearSuccessCriteria={this.props.clearSuccessCriteria} parsedQuery={parsedQuery} /> },
      { name: "Review", component: <FourthStep projectId={this.state.projectId} sprintId={this.state.sprintId} deleteUserStory={this.props.deleteUserStory} userStoryDeleteError={this.props.userStoryDeleteError} getUserStories={this.props.getUserStories} parsedQuery={parsedQuery} setUserStoriesData={this.props.setUserStoriesData} userStoriesList={this.props.userStoriesList}  moveUserStoriesListResponse={this.props.moveUserStoriesListResponse} moveUserStoryToAnotherSprint={this.props.moveUserStoryToAnotherSprint}  urlString={this.props.location.search} history={this.props.history} loadSprintLists={this.props.loadSprintLists} updateSprint={this.props.updateSprint}  projectSavedData={this.props.projectSavedData} sprintSavedData={this.props.sprintSavedData} userStoriesSavedData={this.props.userStoriesSavedData} /> }
    ];

    return (
      <div className='step-progress'>
        <StepZilla
          steps={steps}
          onStepChange={this.onStepChange}
          nextTextOnFinalActionStep="Review Sprint"
          stepsNavigation={false}
          nextButtonCls="btn btn-sm btn-custom-success wizard-next-btn"
          backButtonCls="btn btn-sm btn-custom-success wizard-back-btn firstStepReviewButton"
          backButtonText="Back"
        />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  projectSavedData: state.project.projectSavedData,
  projectInfo: state.project.projectInfo,
  sprintSavedData: state.sprint.sprintSavedData,
  sprintInfo: state.sprint.sprintInfo,
  projectListData: state.project.data,
  successCriteriaData: state.userStories.successCriteria,
  userStoriesSavedData: state.userStories.userStoriesSavedData,
  userStoriesList: state.userStories.userStoriesList,
  sprintListData: state.sprint.data,
  moveUserStoriesListResponse:state.userStories.moveUserStoriesListResponse,
  userStoryDeleteError:state.userStories.userStoryDeleteError,
  userStoriesUpdateData:state.userStories.userStoriesUpdateData,

});

const mapDispatchToProps = dispatch => ({
  saveProject: (data) => dispatch(saveProject(data)),
  updateProject: (data, projectId) => dispatch(updateProject(data, projectId)),
  saveSprint: (data, projectId) => dispatch(saveSprint(data, projectId)),
  updateSprint: (data, projectId, sprintId) => dispatch(updateSprint(data, projectId, sprintId)),
  saveUserStories: (data, projectId, sprintId) => dispatch(saveUserStories(data, projectId, sprintId)),
  addSuccessCriteria: (data) => dispatch(addSuccessCriteria(data)),
  removeSuccessCriteria: (val) => dispatch(removeSuccessCriteria(val)),
  clearSuccessCriteria: () => dispatch(clearSuccessCriteria()),
  clearProjectData: () => dispatch(clearProjectData()),
  clearSprintData: () => dispatch(clearSprintData()),
  clearUserStoriesData: () => dispatch(clearUserStoriesData()),
  getProjectDetails: (projectId) => dispatch(getProjectDetails(projectId)),
  getSprintDetails: (projectId, sprintId) => dispatch(getSprintDetails(projectId, sprintId)),
  getUserStories: (projectId, sprintId) => dispatch(getUserStories(projectId, sprintId)),
  setProjectData: (data) => dispatch(setProjectData(data)),
  setSprintData: (data) => dispatch(setSprintData(data)),
  setUserStoriesData: (data) => dispatch(setUserStoriesData(data)),
  loadSprintLists: (projectId) => dispatch(getAllSprintList(projectId)),
  moveUserStoryToAnotherSprint:(projectId, sprintId, storyId, newSprintId)=>dispatch(moveUserStoryToAnotherSprint(projectId, sprintId, storyId, newSprintId)),
  deleteUserStory:(projectId, sprintId, storyId)=>dispatch(deleteUserStory(projectId, sprintId, storyId)),
  getOneUserStories:(projectId, sprintId, storyId)=>dispatch(getOneUserStories(projectId, sprintId, storyId)),
  updateUserStories:(data,projectId, sprintId, storyId)=>dispatch(updateUserStories(data,projectId, sprintId, storyId)),
});

export default connect(mapStateToProps, mapDispatchToProps, null,  { withRef: true })(withStyles(style)(withRouter(StepWizard)));
