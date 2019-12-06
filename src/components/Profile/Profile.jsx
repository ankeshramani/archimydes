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
import Dashboard from "@material-ui/core/SvgIcon/SvgIcon";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import "./Profile.scss"
import {timezoneList} from "../../common/constants.js"

function Profile(props, ...rest) {
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
                                    <h3 style={successTitle}>User Profile :</h3>
                                </div>
                                <div style={{textAlign: "right"}}>
                                    <Button
                                        href="#pablo"
                                        className={classes.navLink + " " + classes.navLinkActive}
                                        onClick={e => e.preventDefault()}
                                        color="transparent"
                                    >
                                        <Dashboard/>{" "}
                                        <Link to="/change-password">Change Password</Link>
                                    </Button>
                                </div>
                            </div>
                            <GridContainer>
                                {
                                    props.state.message === "User Profile update Successfully" ?
                                        <span style={{color: "#43a047"}}>{props.state.message}</span> :
                                        <span style={{color: "red"}}>{props.state.message}</span>
                                }
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Email"
                                        id="email"
                                        inputProps={{
                                            name: 'email',
                                            disabled: true,
                                            value: props.state.email,
                                            onChange: props.onChange,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    <span style={{color: "red", fontSize: 14}}>{props.state.errors["email"]}</span>
                                </GridItem>
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
                                    <span style={{color: "red", fontSize: 14}}>{props.state.errors["firstName"]}</span>
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
                                    <span style={{color: "red", fontSize: 14}}>{props.state.errors["lastName"]}</span>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Company"
                                        id="company"
                                        inputProps={{
                                            name: 'company',
                                            value: props.state.company,
                                            onChange: props.onChange,
                                        }}
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                    <span style={{color: "red", fontSize: 14}}>{props.state.errors["company"]}</span>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Company Role"
                                        id="companyRole"
                                        inputProps={{
                                            name: 'companyRole',
                                            value: props.state.companyRole,
                                            onChange: props.onChange,
                                        }}

                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                    <span
                                        style={{color: "red", fontSize: 14}}>{props.state.errors["companyRole"]}</span>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="City"
                                        id="City"
                                        inputProps={{
                                            name: 'city',
                                            value: props.state.city,
                                            onChange: props.onChange,
                                        }}
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                    <span style={{color: "red", fontSize: 14}}>{props.state.errors["city"]}</span>
                                </GridItem>

                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Country"
                                        id="Country"
                                        inputProps={{
                                            name: 'country',
                                            value: props.state.country,
                                            onChange: props.onChange,
                                        }}
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                    <span style={{color: "red", fontSize: 14}}>{props.state.errors["country"]}</span>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} lg={12}>
                                    <FormControl
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="timezone"
                                            className={classes.selectLabel}
                                        >
                                            Select Timezone
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            value={props.state.timezone}
                                            onChange={props.onChange}
                                            inputProps={{
                                                name: "timezone",
                                                id: "timezone"
                                            }}
                                        >
                                            <MenuItem
                                                disabled
                                                classes={{
                                                    root: classes.selectMenuItem
                                                }}
                                            >
                                                Select Timezone
                                            </MenuItem>
                                            {
                                                timezoneList.map((item) => {
                                                    return (
                                                        <MenuItem
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                            value={item.timezone}>({item.display})&nbsp;{item.name}</MenuItem>
                                                    )

                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <span style={{color: "red", fontSize: 14}}>{props.state.errors["timezone"]}</span>
                                </GridItem>
                            </GridContainer>
                            <br/>
                            <div
                                className={classes.center}
                                style={{"text-align": "center"}}
                            >
                                <Button type="button" color="success" round onClick={props.onUpdate}>
                                    UPDATE PROFILE
                                </Button>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}

export default withStyles(style)(Profile);
