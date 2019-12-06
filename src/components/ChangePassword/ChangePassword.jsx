import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Button from "components/CustomButtons/Button.jsx";

import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import { successColor } from "assets/jss/material-kit-pro-react.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";

function ChangePassword(props, ...rest) {
  const { classes } = props;
  const successTitle = {
    color: successColor
  };

  return (
    <div className="cd-section" {...rest}>
      <div className={classes.blog}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={6}
              sm={6}
              md={6}
              className={`${classes.mlAuto} ${classes.mrAuto}`}
            >
              <div className={classes.container}>
                <div>
                  <h3 style={successTitle}>Update Password :</h3>
                </div>
              </div>
                {
                    props.state.message === "User Password update Successfully" ? <span style={{color: "#43a047"}}>{props.state.message}</span> : <span style={{color: "red"}}>{props.state.message}</span>
                }
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="oldPassword"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      placeholder: "Old Password",
                      type: "password",
                      name:'oldPassword',
                      value:props.state.oldPassword,
                      onChange:props.onChange,
                    }}
                  />
                  <span style={{color: "red", fontSize: 14}}>{props.state.errors["oldPassword"]}</span>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="oldPassword"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      placeholder: "New Password",
                      type: "password",
                      name:'newPassword',
                      value:props.state.newPassword,
                      onChange:props.onChange,
                    }}
                  />
                  <span style={{color: "red", fontSize: 14}}>{props.state.errors["newPassword"]}</span>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="oldPassword"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      placeholder: "Confirm Password",
                      type: "password",
                      name:'confirmPassword',
                      value:props.state.confirmPassword,
                      onChange:props.onChange,
                    }}
                  />
                  <span style={{color: "red", fontSize: 14}}>{props.state.errors["confirmPassword"]}</span>
                </GridItem>
              </GridContainer>

              <div
                className={classes.center}
                style={{ "text-align": "center" }}
              >
                <Button type="button" color="success" onClick={props.onUpdate} round>
                  UPDATE PASSWORD
                </Button>
                <Button type="button" color="success" onClick={props.onCancel} round>
                  CANCEL
                </Button>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default withStyles(style)(ChangePassword);
