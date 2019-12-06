import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import "./UserDetail"
// core components
import Button from "components/CustomButtons/Button.jsx";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import {successColor} from "assets/jss/material-kit-pro-react.jsx";
import Close from "@material-ui/icons/Close";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import LoadingComponent from "components/inc/LoadingComponent.jsx";
import modalStyle from "assets/jss/material-kit-pro-react/modalStyle";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions";
import Danger from "../Typography/Danger";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

function UserDetail(props, ...rest) {
    const {classes} = props;
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
                                    <h3 style={successTitle}>User Details :</h3>
                                </div>
                            </div>
                            <GridContainer>
                                <LoadingComponent isLoading={props.state && props.state.isLoading}>
                                    <Dialog
                                        classes={{
                                            root: classes.modalRoot,
                                            paper: classes.modal
                                        }}
                                        open={props.state.isModelOpen}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={ props.handleClose}
                                        aria-labelledby="classic-modal-slide-title"
                                        aria-describedby="classic-modal-slide-description"
                                    >
                                        <DialogContent
                                            id="classic-modal-slide-description"
                                            className={classes.modalBody}
                                        >
                                            <Danger>{props.state.error}</Danger>
                                        </DialogContent>
                                        <DialogActions className={classes.modalFooter}>
                                            <Button onClick={props.handleClose} color="secondary">
                                                Close
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Name"
                                            id="name"
                                            inputProps={{
                                                name: 'name',
                                                disabled: true,
                                                value: props.state.userData && props.state.userData.firstName + ' ' + props.state.userData && props.state.userData.lastName
                                            }}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Email"
                                            id="email"
                                            inputProps={{
                                                name: 'email',
                                                disabled: true,
                                                value: props.state.userData && props.state.userData.email
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Available credits"
                                            id="availableCredits"
                                            inputProps={{
                                                name: 'availableCredits',
                                                disabled: true,
                                                value: (props.state.credits && props.state.credits.credits && props.state.credits.credits.available) || 0,
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    {/*<GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Available reserved credits"
                                            id="availableReservedCredits"
                                            inputProps={{
                                                type: "number",
                                                name: 'availableReservedCredits',
                                                disabled: true,
                                                value: (props.state.credits && props.state.credits.credits && props.state.credits.credits.reserved) || 0,
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>*/}
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Credits to add"
                                            id="creditsToAdd"
                                            inputProps={{
                                                type: "number",
                                                name: 'creditsToAdd',
                                                value: props.state.creditsToAdd,
                                                onChange: props.handelChange
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    {/*<GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Reserved credits to add"
                                            id="ReservedCreditsToAdd"
                                            inputProps={{
                                                type: "number",
                                                name: 'ReservedCreditsToAdd',
                                                value: props.state.ReservedCreditsToAdd,
                                                onChange: props.handelChange,
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>*/}
                                    <GridItem xs={12} sm={4} md={4} lg={4}>
                                        <div className={classes.title}>
                                            <h4>Users Role</h4>
                                        </div>
                                        <div
                                            className={
                                                classes.checkboxAndRadio +
                                                " " +
                                                classes.checkboxAndRadioHorizontal
                                            }
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={!(props.state && props.state.userData && props.state.userData.userRoles.indexOf('Admin') === -1)}
                                                        checkedIcon={<Check className={classes.checkedIcon}/>}
                                                        icon={<Check className={classes.uncheckedIcon}/>}
                                                        classes={{
                                                            checked: classes.checked,
                                                            root: classes.checkRoot
                                                        }}
                                                        inputProps={{
                                                            name: 'Admin',
                                                            value: "Admin",
                                                            onChange: props.onChange
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
                                                        checked={!(props.state && props.state.userData && props.state.userData.userRoles.indexOf('User') === -1)}
                                                        checkedIcon={<Check className={classes.checkedIcon}/>}
                                                        icon={<Check className={classes.uncheckedIcon}/>}
                                                        inputProps={{
                                                            name: 'User',
                                                            value: "User",
                                                            onChange: props.onChange
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
                                    </GridItem>
                                </LoadingComponent>
                            </GridContainer>
                            <br/>
                            <GridContainer>
                                <GridItem xs={6} sm={6} md={6} lg={6}>
                                    <Button color="primary" onClick={props.onClick}>BACK</Button>
                                </GridItem>
                                <GridItem xs={6} sm={6} md={6} lg={6}>
                                    <Button color="success" style={{float: 'right'}} onClick={props.state.error  ?  props.handleClickOpen : props.onUpdateUser}>UPDATE USER</Button>
                                </GridItem>
                            </GridContainer>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}

export default withStyles(style, modalStyle)(UserDetail);
