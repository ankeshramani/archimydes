import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';

// core components
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import {connect} from "react-redux";

import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import { getProjectList } from "../../actions/project";
import LoadingComponent from "components/inc/LoadingComponent.jsx";
import styles from "assets/jss/customStyle.jsx";

class ProjectList extends React.Component {

  componentDidMount() {
    this.props.loadProjectLists().then(res => {
      if(!this.props.projectListData.length) {
        this.context.router.history.push('/new');
      }
    });
  }

  render() {
    const {classes, projectListData, isFetching } = this.props;

    const newTableData = projectListData.map(
      (val, i) => {
        let newArr = [];
        newArr.push(i+1);
        newArr.push(val.title);
        if(val.projectStatus == 'Draft') {
          newArr.push(<div className="projectStatus"><Link to={`/projects/${val._id}/sprints`}><Button type="button" size="sm" style={styles.statusWidth}
                                                                                                    color="danger" round>Draft</Button></Link><Link to={`/new/?step=sprint&project_id=${val._id}`}><Button type="button" size="sm" style={styles.statusWidth}
                                                                                                                                                                                                 color="default" round>Add Sprint</Button></Link></div>);
        }else if (val.projectStatus == 'In Progress') {
          newArr.push(<div className="projectStatus"><Link to={`/projects/${val._id}/sprints`}><Button type="button" size="sm" style={styles.statusWidth}
                                                             color="warning" round>In Progress</Button></Link><Link to={`/new/?step=sprint&project_id=${val._id}`}><Button type="button" size="sm" style={styles.statusWidth}
                                                                                                                                                               color="default" round>Add Sprint</Button></Link></div>);
        }else {
          newArr.push(<div className="projectStatus"><Link to={`/projects/${val._id}/sprints`}><Button type="button" size="sm" style={styles.statusWidth}
                                                             color="default" round>Add Sprint</Button></Link><Link to={`/new/?step=sprint&project_id=${val._id}`}><Button type="button" size="sm" style={styles.statusWidth}
                                                                                                                                                              color="default" round>Add Sprint</Button></Link></div>);
        }
        return newArr;
      });

    return (
      <div>
        <PageTitle title="My Projects" />
        <LoadingComponent isLoading={ isFetching }>
          <Table striped={true}
                 tableHead={[
                   "#",
                   "Project Name",
                   "Status"
                 ]}
                 tableData={newTableData}
                 customCellClasses={[
                   classes.textCenter,
                   classes.textRight,
                   classes.textRight
                 ]}
                 customClassesForCells={[0, 4, 5]}
                 customHeadCellClasses={[
                   classes.textCenter,
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
  isFetching: state.project.isFetching,
  projectListData: state.project.data,
});

const mapDispatchToProps = dispatch => ({
  loadProjectLists: () => dispatch(getProjectList()),
});

ProjectList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ProjectList));
