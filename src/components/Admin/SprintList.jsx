import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Edit from "@material-ui/icons/Edit";

// core components
import Table from "components/Table/Table.jsx";
import {connect} from "react-redux";
import Moment from 'react-moment';
import Button from "components/CustomButtons/Button.jsx";

import { getAllSprintList } from "../../actions/sprint";
import LoadingComponent from "components/inc/LoadingComponent.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import {withRouter} from "react-router-dom";
import Close from "@material-ui/core/SvgIcon/SvgIcon";

class SprintList extends React.Component {
  componentDidMount() {
    this.props.loadSprintLists(this.props.match.params.id);
  }

  onClick = (projectId, sprintId) =>{
    this.props.history.push({
      pathname:"/user-story-status",
      state:{
        projectId, sprintId
      }
    })
  }

  render() {
    const { classes, sprintListData, isFetching, history } = this.props;
    const sprints = sprintListData.map(
      (val, i) => {
        let newArr = [];
        newArr.push(i+1);
        newArr.push(val.title);
        newArr.push(val.sprintStatus.status);
        newArr.push(<Moment format="D MMM, YYYY" withTitle>{val.updatedAt}</Moment>);
        newArr.push(<div className="useredit">
          <Button justIcon size="sm" color="success" key={i} onClick={() => this.onClick(val.project, val._id)}>
            <Edit />
          </Button>
        </div>);
        return newArr;
      });

    return (
      <div>
        <PageTitle title={history.location && history.location.state} />
        <PageTitle title={"Sprints"} />
        <LoadingComponent isLoading={ isFetching }>
          <Table striped={true}
                 tableHead={[
                   "#",
                   "Sprint Title",
                   "Status",
                   "Updated",
                   "Admin"
                 ]}
                 tableData={sprints}
                 customCellClasses={[
                   classes.textCenter,
                   classes.textRight,
                   classes.textRight,
                   classes.textRight
                 ]}
                 customClassesForCells={[0, 4, 5]}
                 customHeadCellClasses={[
                   classes.textCenter,
                   classes.textRight,
                   classes.textRight,
                   classes.textRight
                 ]}
                 customHeadClassesForCells={[0, 4, 5]}
          />
        </LoadingComponent>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  isFetching: state.sprint.isFetching,
  sprintListData: state.sprint.data,
});

const mapDispatchToProps = dispatch => ({
  loadSprintLists: (projectId) => dispatch(getAllSprintList(projectId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(withRouter(SprintList)));
