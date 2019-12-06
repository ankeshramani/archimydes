import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Table from "components/Table/Table.jsx";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import Moment from 'react-moment';

import { getProjectList } from "../../actions/project";
import LoadingComponent from "components/inc/LoadingComponent.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import { getUserData } from "../../utils/common";
import classNames from "classnames";
import Clearfix from "../Clearfix/Clearfix";

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.loadProjectLists('?projectStatus=In Progress');
  }

  render() {
    const { classes, projectListData, isFetching } = this.props
    const userData = getUserData();
    const getUsersArr = [];
    const projects = projectListData.map(
      (val, i) => {
        let newArr = [];
        let ownerName = (val.userInfo && val.userInfo.firstName &&  val.userInfo.lastName) ? (val.userInfo.firstName + ' ' + val.userInfo.lastName) : '';
        newArr.push(i+1);
        newArr.push(<Link to={{pathname:"projects/"+val._id+"/sprints",state:val.title}}>{val.title}</Link>);
        newArr.push(ownerName);
        newArr.push(<Moment format="D MMM, YYYY" withTitle>{val.updatedAt}</Moment>);
        if(typeof(val.owner) != "undefined" && val.owner !==null){
          getUsersArr.push(val.owner);
        }
        return newArr;
      });

    return (
      <div>
        { userData.userRoles && userData.userRoles.length && userData.userRoles.includes("Admin") ?
          <div>
            <PageTitle title="Projects" />
            <LoadingComponent isLoading={ isFetching }>
              <Table striped={true}
                     tableHead={[
                       "#",
                       "Project Title",
                       "Owner",
                       "Updated",
                     ]}
                     tableData={projects}
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
          </div> :
          <div className={classNames(classes.main)}>
            <div>
              <div >
                <h3 style={{color:"red"}}>You are not authorized to access this web page</h3>
              </div>
              <Clearfix/>
            </div>
            <Clearfix/>
          </div>
        }

      </div>
    );
  }

}

const mapStateToProps = state => ({
  isFetching: state.project.isFetching,
  projectListData: state.project.data,
});

const mapDispatchToProps = dispatch => ({
  loadProjectLists: (query) => dispatch(getProjectList(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Dashboard));
