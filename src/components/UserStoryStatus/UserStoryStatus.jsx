import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import { successColor } from "assets/jss/material-kit-pro-react.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.jsx";
import TextField from "@material-ui/core/TextField/TextField";
import PageTitle from "components/inc/PageTitle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx"
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from "components/CustomButtons/Button.jsx";
import Select from "@material-ui/core/Select/Select";
import { complexity, developmentStatus, acceptanceStatus, sprintStatus, sprintReviewStatus } from "../../common/constants";
import LoadingComponent from "../inc/LoadingComponent";

function UsersStoryStatus(props, ...rest) {
 const { classes, onChange, state,  onUpdateUserStory, updateSprint, onSprintChane, onBacke } = props;
  const successTitle = {
    color: successColor
  };
  return (
    <div className="cd-section" {...rest}>
      <div className={classes.blog}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={12}
              md={12}
              className={`${classes.mlAuto} ${classes.mrAuto}`}
            >
              <div className={classes.container}>
                <div>
                  <h3 style={successTitle}> Update Sprint and User Story Status: </h3>
                </div>
              </div>
              <LoadingComponent isLoading={state.isLoadings}>
              <div>
                <Card>
                  <CardBody>
                    <PageTitle title={'Sprint Details'} />
                    <div className="form-element">
                      <div className="title form-label">
                        <h5 className="form-label-text">Title:</h5>
                        <TextField
                          id="title"
                          inputProps={{
                            name:"title"
                          }}
                          value={state.title || state.sprintData.title}
                          onChange={onSprintChane}
                          className="form-textfield"
                          fullWidth={true}

                        />
                      </div>
                      <div className="title form-label">
                        <h5 className="form-label-text">Sprint Status:</h5>
                        <Select
                          name="sprintStatus"
                          fullWidth={true}
                          value={state.sprintStatus}
                          onChange={onSprintChane}
                        >
                          <MenuItem value="">
                            <em>Sprint Status</em>
                          </MenuItem>
                          {
                            sprintStatus.map((item) => {
                              return (
                                <MenuItem value={item.value}>{item.name}</MenuItem>
                              )

                            })
                          }
                        </Select>
                      </div>
                      {/*<div className="title form-label">
                        <h5 className="form-label-text">Sprint Review Status:</h5>
                        <Select
                          name="sprintReviewStatus"
                          fullWidth={true}
                          value={state.sprintReviewStatus}
                          onChange={onChange}
                        >
                          <MenuItem value="">
                            <em>Sprint Review Status</em>
                          </MenuItem>
                          {
                            sprintReviewStatus.map((item) => {
                              return (
                                <MenuItem value={item.value}>{item.name}</MenuItem>
                              )

                            })
                          }
                        </Select>
                      </div>*/}
                      <br/>
                      <div className={classes.center} align="left">
                        <Button type="button" color="success" onClick={updateSprint} >
                          UPDATE
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              </LoadingComponent>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem
              xs={12}
              sm={12}
              md={12}
              className={`${classes.mlAuto} ${classes.mrAuto}`}
            >
              <div className={classes.container}>
                <div>
                  <h3 style={successTitle}>User Story: </h3>
                </div>
              </div>
             <div>
               <LoadingComponent isLoading={state.isLoading}>
               {
                 state.userStoryLists.map((val,i)=>{

                   return(
                     <Card>
                       <CardBody>
                         <PageTitle title={`Story ${ i+1 }/${ state.userStoryLists.length } ${val.title}`} />
                         <div className="form-element">
                           <div className="title form-label">
                             <h5 className="form-label-text">Complexity:</h5>
                             <Select
                               name="complexity"
                               fullWidth={true}
                               value={val.complexity}
                               onChange={(e) => onChange(e, i)}
                             >
                               <MenuItem value="">
                                 <em>Complexity</em>
                               </MenuItem>
                               {
                                 complexity.map((item) => {
                                   return (
                                     <MenuItem value={item.value}>{item.name}</MenuItem>
                                   )

                                 })
                               }
                             </Select>
                           </div>
                           <div className="title form-label">
                             <h5 className="form-label-text">Development Status:</h5>
                             <Select
                               displayEmpty
                               name="developmentStatus"
                               fullWidth={true}
                               value={val.developmentStatus || val.development.status}
                               onChange={(e) => onChange(e, i)}
                             >
                               <MenuItem value="">
                                 <em>Development Status</em>
                               </MenuItem>
                               {
                                 developmentStatus.map((item) => {
                                   return (
                                     <MenuItem value={item.value}>{item.name}</MenuItem>
                                   )

                                 })
                               }
                             </Select>
                           </div>
                           <div className="title form-label">
                             <h5 className="form-label-text">Acceptance Status:</h5>
                             <Select
                               displayEmpty
                               name="acceptanceStatus"
                               fullWidth={true}
                               value={val.acceptanceStatus || val.acceptance.status}
                               onChange={(e) => onChange(e, i)}
                             >
                               <MenuItem value="">
                                 <em>Acceptance Status</em>
                               </MenuItem>
                               {
                                 acceptanceStatus.map((item) => {
                                   return (
                                     <MenuItem value={item.value}>{item.name}</MenuItem>
                                   )

                                 })
                               }
                             </Select>
                           </div>
                           <div className="title form-label">
                             <h5 className="form-label-text">Move User Story to Sprint:</h5>
                             <Select
                               displayEmpty
                               name="moveUserStoryToSprint"
                               fullWidth={true}
                               value={val.moveUserStoryToSprint}
                               onChange={(e) => onChange(e, i)}
                             >
                               <MenuItem value="">
                                 <em>Move User Story to Sprint</em>
                               </MenuItem>
                               {
                                 state.sprintLists.map((item) => {
                                   return (
                                     <MenuItem value={item._id}>{item.title}</MenuItem>
                                   )

                                 })
                               }
                             </Select>
                           </div>
                           <div className="title form-label">
                             <h5 className="form-label-text">Story Credit Cost:</h5>
                             <TextField
                               id="storyCreditCost"
                               value={ val.storyCreditCost }
                               onChange={(e) => onChange(e, i)}
                               inputProps={{
                                 name:"storyCreditCost"
                               }}
                               className="form-textfield"
                               fullWidth={true}
                               type="number"
                             />
                           </div>
                           <br/>
                           <div
                             className={classes.center}
                             style={{"text-align": "left"}}
                           >
                             <Button type="button" color="success" onClick={() => onUpdateUserStory(val._id, i)} >
                               UPDATE
                             </Button>
                           </div>
                         </div>
                       </CardBody>
                     </Card>
                   )
                 })
               }
               </LoadingComponent>
              </div>
            </GridItem>
          </GridContainer>
          <div
            className={classes.center}
            style={{"text-align": "left"}}
          >
            <Button type="button" color="info" onClick={onBacke} >
              BACK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withStyles(style,modalStyle)(UsersStoryStatus);

