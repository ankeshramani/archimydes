import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import { getAllSprintList } from "../../actions/sprint";
import {getProjectDetails} from "../../actions/project";
import LoadingComponent from "components/inc/LoadingComponent.jsx";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import styles from "assets/jss/customStyle.jsx";

class SprintListUser extends React.Component {
  componentDidMount() {
    this.props.loadSprintLists(this.props.match.params.id);
    this.props.loadProjectInfo(this.props.match.params.id);
  }

  render() {
    const { classes, sprintListData, projectInfo, isFetching, } = this.props;
    const sprints = sprintListData.map(
      (val, i) => {
        let newArr = [];
        newArr.push(val.title);
        if(val.sprintStatus.status == 'Draft') {
          newArr.push(<div className="sprintStatus"><Link to={`/new?step=sprint_review&project_id=${val.project}&sprint_id=${val._id}`}><Button type="button" size="sm" style={styles.statusWidth} color="danger" round>{val.sprintStatus.status}</Button></Link></div>);
        }else if (val.sprintStatus.status == 'In Progress') {
          newArr.push(<div className="sprintStatus"><Link to={{pathname: `/projects/${val._id}/sprint/status`, state: {projectId: projectInfo._id, sprintId:val._id}}}><Button type="button" size="sm" style={styles.statusWidth} color="warning" round>{val.sprintStatus.status}</Button></Link></div>);
        }else if (val.sprintStatus.status == 'Complete') {
          newArr.push(<div className="sprintStatus"><Link to={`/projects/${val._id}/sprint/status`}><Button type="button" size="sm" style={styles.statusWidth} color="success" round>{val.sprintStatus.status}</Button></Link></div>);
        }else {
          newArr.push(<div className="sprintStatus"><Link to={{pathname: `/projects/${val._id}/sprint/status`, state: {projectId: projectInfo._id, sprintId:val._id}}}><Button type="button" size="sm" style={styles.statusWidth} color="default" round>{val.sprintStatus.status}</Button></Link></div>);
        }
        return newArr;
      });

    return (
      <div>
        <PageTitle title={projectInfo.title} />
        <LoadingComponent isLoading={ isFetching }>
          <Table striped={true}
                 tableHead={[
                   "#",
                   "Status",
                 ]}
                 tableData={sprints}
                 customCellClasses={[
                   classes.textCenter,
                   classes.textRight
                 ]}
                 customClassesForCells={[1, 5]}
                 customHeadCellClasses={[
                   classes.textCenter,
                   classes.textRight
                 ]}
                 customHeadClassesForCells={[1, 5]}
          />
        </LoadingComponent>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  isFetching: state.sprint.isFetching,
  sprintListData: state.sprint.data,
  projectInfo: state.project.projectInfo,
});

const mapDispatchToProps = dispatch => ({
  loadSprintLists: (projectId) => dispatch(getAllSprintList(projectId)),
  loadProjectInfo: (projectId) => dispatch(getProjectDetails(projectId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(withRouter(SprintListUser)));