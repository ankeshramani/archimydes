import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "components/CustomButtons/Button.jsx";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import {successColor} from "assets/jss/material-kit-pro-react.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Danger from "../Typography/Danger";
import CircularProgress from '@material-ui/core/CircularProgress';


function CreateUser(props, ...rest) {
    const {classes} = props;
    const successTitle = {
        color: successColor
    };
    return (
        <div className="cd-section" {...rest}>
            <div className={classes.blog}>
                <div className={classes.container}>
                  {
                   props.userData &&  props.userData.userRoles && props.userData.userRoles.length && props.userData.userRoles.includes("Admin") ?
                     <GridContainer>
                     <GridItem
                       xs={6}
                       sm={6}
                       md={6}
                       className={`${classes.mlAuto} ${classes.mrAuto}`}
                     >
                       <div className={classes.container}>
                         <div>
                           <h3 style={successTitle}>Create New User :</h3>
                         </div>
                       </div>
                       <GridContainer>
                         {
                           props.state.isLoading &&  <CircularProgress  />
                         }
                         <GridItem xs={12} sm={12} md={12}>
                           <CustomInput
                             labelText="First Name"
                             id="firstName"
                             inputProps={{
                               name: 'firstName',
                               onChange: props.onChange,
                               value: props.state.firstName,
                             }}
                             formControlProps={{
                               fullWidth: true,
                             }}
                           />
                           <Danger>{props.state.errors["firstName"]}</Danger>
                         </GridItem>
                         <GridItem xs={12} sm={12} md={12}>
                           <CustomInput
                             labelText="Last Name"
                             id="lastName"
                             inputProps={{
                               name: 'lastName',
                               onChange: props.onChange,
                               value: props.state.lastName,
                             }}
                             formControlProps={{
                               fullWidth: true,
                             }}
                           />
                           <Danger>{props.state.errors["lastName"]}</Danger>
                         </GridItem>
                         <GridItem xs={12} sm={12} md={12}>
                           <CustomInput
                             labelText="Email"
                             id="email"
                             inputProps={{
                               name: 'email',
                               value: props.state.email,
                               onChange: props.onChange,
                             }}
                             formControlProps={{
                               fullWidth: true
                             }}
                           />
                           <Danger>{props.state.errors["email"]}</Danger>
                         </GridItem>
                         <GridItem xs={12} sm={12} md={12}>
                           <CustomInput
                             formControlProps={{
                               fullWidth: true
                             }}
                             inputProps={{
                               placeholder: "New Password",
                               type: "password",
                               name:'newPassword',
                               value: props.state.newPassword,
                               onChange: props.onChange,
                             }}
                           />
                           <Danger>{props.state.errors["password"]}</Danger>
                         </GridItem>
                         <GridItem xs={12} sm={12} md={12}>
                           <CustomInput
                             formControlProps={{
                               fullWidth: true
                             }}
                             inputProps={{
                               placeholder: "Confirm Password",
                               type: "password",
                               name: 'confirmPassword',
                               value: props.state.confirmPassword,
                               onChange: props.onChange,
                             }}
                           />
                           <Danger>{props.state.errors["confirmPassword"]}</Danger>
                         </GridItem>

                         <GridItem xs={12} sm={12} md={12}>
                           <div className={classes.title}>
                             <h4>Users Role</h4>
                           </div>
                           <div>
                             <FormControlLabel
                               control={
                                 <Checkbox
                                   checked={!(props.state && props.state.userRoles.indexOf('Admin') === -1)}
                                   checkedIcon={<Check className={classes.checkedIcon}/>}
                                   icon={<Check className={classes.uncheckedIcon}/>}
                                   classes={{
                                     checked: classes.checked,
                                     root: classes.checkRoot,
                                   }}
                                   inputProps={{
                                     name: 'userRoles',
                                     value: "Admin",
                                     onChange: props.onRoleChange
                                   }}
                                 />
                               }
                               classes={{label: classes.label}}
                               label="ADMIN"
                             />
                           </div>
                           <div>
                             <FormControlLabel
                               control={
                                 <Checkbox
                                   checked={!(props.state && props.state.userRoles.indexOf('User') === -1)}
                                   checkedIcon={<Check className={classes.checkedIcon}/>}
                                   icon={<Check className={classes.uncheckedIcon}/>}
                                   inputProps={{
                                     name: 'userRoles',
                                     value: "User",
                                     onChange: props.onRoleChange
                                   }}
                                   classes={{
                                     checked: classes.checked,
                                     root: classes.checkRoot
                                   }}
                                 />
                               }
                               classes={{label: classes.label}}
                               label="USER"
                             />
                           </div>
                           <Danger>{props.state.errors["userRoles"]}</Danger>
                         </GridItem>
                       </GridContainer>
                       <br/>
                       <div
                         className={classes.center}
                         style={{"text-align": "center"}}
                       >
                         <Button type="button" color="info" style={{ float:'left'}} round onClick={props.onBacke} >
                           Back
                         </Button>
                         <Button type="button" color="success" style={{ float:'right' }} round  onClick={props.handleSubmit}>
                           Create User
                         </Button>
                       </div>
                     </GridItem>
                   </GridContainer> :
                     <div >
                       <h3 style={{color:"red"}}>You are not authorized to access this web page</h3>
                     </div>
                  }

                </div>
            </div>
        </div>
    );
}

export default withStyles(style)(CreateUser);
