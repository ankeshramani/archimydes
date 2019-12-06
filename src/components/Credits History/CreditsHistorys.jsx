import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Table from "components/Table/Table.jsx";

// core components
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import { successColor } from "assets/jss/material-kit-pro-react.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { getUserData } from "../../utils/common";
import moment from "moment";
import classNames from "classnames";


function CreditsHistorys(props, ...rest) {
  const { classes, state } = props;
  const successTitle = {
    color: successColor
  };
  const creditsHistorys = state.creditsHistory.map(
    (val, i) => {
      let newArr = [];
      newArr.push(i+1);
      newArr.push(val.type);
      newArr.push(val.credit);
      newArr.push(moment(val.createdAt).format("DD MMM YY h:mm A") );
      return newArr;
    });
  return (
    <div className={classNames(classes.main, classes.mainRaised)}>
      <GridContainer>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          className={`${classes.mlAuto} ${classes.mrAuto}`}
        >
          <div className={classes.container}>
            <div>
              <h3 style={successTitle}>Credits Management: </h3>
            </div>
          </div>
        </GridItem>
      </GridContainer>
      <div>
        {
          state.isLoading && <CircularProgress/> ||
          <div>
            <Grid container spacing={24}>
              <Grid item xs={9}>
                <span>User Credits Available</span>:&nbsp;
                <span>{state.credits && state.credits.credits && state.credits.credits.available} </span>
              </Grid>
              <Grid item xs={3} style={{ textAlign: "right" }}>
                <span>Total Credits Purchased</span>:&nbsp;
                <span>{state.credits && state.credits.credits && state.credits.credits.total} </span>
              </Grid>
            </Grid>
            < Grid container spacing={24}>
              <Grid item xs={9}>
                <span >User Credits Reserved</span>:&nbsp;<span>{ state.credits && state.credits.credits && state.credits.credits.reserved} </span>
              </Grid>
              <Grid item xs={3} style={{ textAlign: "right" }}>
                <Link to={"/purchase-package"}><Button color="success">$ Buy More Credits</Button></Link>
              </Grid>
            </Grid>
          </div>
        }
      </div>
      <div className={classes.container}>
        <Card plain>
          <CardBody plain>
            <h3 style={successTitle}>Credit By Project</h3>
            { state.isLoadings && <CircularProgress/> ||
            state && state.creditsByProject && state.creditsByProject.map((val, i) => {
              return (
                <Card key={i} >
                  <CardBody >
                    <Grid container spacing={24}>
                      <Grid item xs={1}>
                        <h4 style={successTitle}>Project:</h4>
                      </Grid>
                      <Grid item xs={11}>
                        <h4>{val.title}</h4>
                      </Grid>
                    </Grid>
                    <div>
                      {
                        val && val.sprints && val.sprints.map((item, j) => {
                          const newTableData = item && item.stories && item.stories.map(
                            (data, k) => {
                              let newArr = [];
                              newArr.push(k + 1);
                              newArr.push( data.title);
                              newArr.push(data.description);
                              newArr.push(moment(data.createdAt).format("DD MMM YY h:mm A"));
                              newArr.push(data.acceptance.status);
                              newArr.push(data.creditCost);
                              return newArr;
                            });
                          return (
                            <div className={classes.container}>
                              <Grid container spacing={24} key={j}>
                                <Grid item xs={1}>
                                  <h4 style={successTitle}>Sprint:</h4>
                                </Grid>
                                <Grid item xs={11}>
                                  <h4>{item.title}</h4>
                                </Grid>
                              </Grid>
                              <Table
                                tableHead={[
                                  "#",
                                  "User Story",
                                  "Description",
                                  "Date",
                                  "User Story Status",
                                  "Credits",
                                ]}
                                tableData={newTableData}
                                tableShopping
                                customHeadCellClasses={[
                                  classes.tdDescription,
                                  classes.tdDescription,
                                ]}
                                customHeadClassesForCells={[1, 2]}
                                customCellClasses={[
                                  classes.tdDescription,
                                  classes.tdDescription,
                                ]}
                                customClassesForCells={[1, 2]}
                              />
                              <Grid item xs={12} style={{ textAlign: "right" }}>
                                <h4>Sprint total: {item.totalCredits}</h4>
                              </Grid>
                            </div>
                          )
                        })
                      }
                    </div>
                    <Grid item xs={12} style={{ textAlign: "right" }}>
                      <h3 style={successTitle}>Total Credits: {val.totalCredits}</h3>
                    </Grid>
                  </CardBody>
                </Card>
              )
            })
            }

          </CardBody>
        </Card>
      </div>
      <GridContainer>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          className={`${classes.mlAuto} ${classes.mrAuto}`}
        >
          <div className={classes.container}>
            <h3 style={successTitle}>Credits Use History: </h3>
            {
              state.isLoading && <CircularProgress/> ||
              < Table striped={true}
                      tableHead={[
                        "#",
                        "Notes",
                        "Credits",
                        "Date",
                      ]}
                      tableData={creditsHistorys}
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
            }
          </div>
        </GridItem>
      </GridContainer>
      <br/>
      <div
        className={classes.center}
        style={{ "text-align": "left" }}
      >
        <Link to={(getUserData().userRoles.includes("Admin")) ? '/admin/projects' : '/'}> <Button type="button" color="success">
          BACK
        </Button></Link>
      </div>
    </div>
  );
}

export default withStyles(style, modalStyle)(CreditsHistorys);

