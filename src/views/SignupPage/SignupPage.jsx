import React from "react";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

import { withStyles } from '@material-ui/core/styles';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import PropTypes from 'prop-types';

// core components
import Footer from "components/Footer/Footer.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";
import NavigationBar from "components/inc/NavigationBar.jsx";
import styles from "assets/jss/customStyle.jsx";
import image from "assets/img/bg7.jpg";

import { signUpAPI } from "../../api/usersApi";
import { isLoggedIn, getUserData } from "../../utils/common";
import LoadingComponent from "../../components/inc/LoadingComponent";


class Components extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [1],
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      confirmPass:'',
        errors: {},
      isLoading: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    //Check if user already logged in
    if(isLoggedIn()){
      if(getUserData() && getUserData().userRoles && getUserData().userRoles.length && getUserData().userRoles.includes("Admin")){
        this.context.router.history.push('/admin/projects');
      }else{
        this.context.router.history.push('/');
      }
    }
  }


  onChange = (e) =>{
    this.setState({[e.target.name]:e.target.value})
  }

  onSave  = async () =>{
    const {firstName, lastName, email, password,  } = this.state
    this.setState({ isLoading: true})
      try{
          if(this.onValidation()){
              const response =  await  signUpAPI({firstName, lastName, email, password, })
              if(response &&  response.success ){
                  this.setState({
                      message:"User SignUp Successfully",
                      firstName:'',
                      lastName:'',
                      email:'',
                      password:'',
                      confirmPass:"",
                      isLoading: false

                  })
                window.location.replace(`/login-page`)
              }
          }else {
            this.setState({
              isLoading: false
            })
          }
      }catch(er)  {
        console.log(er.response)
          if(er.response){
              this.setState({
                message:er.response.data.errorMessage,
                isLoading: false
              })
          }
      }
  }
     validateEmail = (email) =>{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

  onValidation = () =>{
      const {firstName, lastName, email, password, confirmPass, } = this.state
      let errors = {};
      let formIsValid = true;
      if(!firstName){
          formIsValid = false;
          errors["firstName"] = " First name cannot be empty";
      }else if(firstName.length > 30){
          formIsValid = false;
          errors["firstName"] = "The first name should be lower than 30 character";
      }
      if(!lastName){
          formIsValid = false;
          errors["lastName"] = " Last name cannot be empty ";
      }else if(lastName.length > 30){
          formIsValid = false;
          errors["lastName"] = "The last name should be lower than 30 character";
      }
      if(!email){
          formIsValid = false;
          errors["email"] = " Email cannot be empty";

      }else if(email.length > 50){
          formIsValid = false;
          errors["email"] = "The Email should be lower than 50 character";

      }else if(!this.validateEmail(email))
      {
          formIsValid = false;
          errors["email"] = "Invalid Email ";
      }
      if(!password){
          formIsValid = false;
          errors["password"] = "Password cannot be empty password";

      }else if(password.length > 30){
          formIsValid = false;
          errors["password"] = "The Password should be lower than 30 character";
      }
      if(!confirmPass){
          formIsValid = false;
          errors["confirmPass"] = "Confirm Password cannot be empty";

      }else if(confirmPass.length > 30){
          formIsValid = false;
          errors["confirmPass"] = "The confirm Password should be lower than 30 character";

      }else if(password !== confirmPass){
          formIsValid = false;
          errors["confirmPass"] = "Confirm Password cannot be match ";
      }
      this.setState({errors: errors});
      return formIsValid;
  }

    render() {
    const { classes, ...rest } = this.props;
    const {firstName,lastName, email, password, confirmPass,errors, message, } = this.state
    return (
      <div>
        <div style={styles.removePadding}>
          <NavigationBar />
        </div>
        <div
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <form className={classes.form}>
                    <CardHeader
                      style={{ width: "88%" }}
                      color="success"
                      signup
                      className={classes.cardHeader}
                    >
                      <h4 className={classes.cardTitle} style={{ color : '#FFF' }}>Sign Up</h4>
                    </CardHeader>
                    <CardBody signup>
                        {
                           message === "User SignUp Successfully" ? <span style={{color: "#43a047"}}>{message}</span> : <span style={{color: "red"}}>{message}</span>
                        }
                      <CustomInput
                        id="firstName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "First Name...",
                          type: "text",
                          value:firstName,
                          onChange: this.onChange,
                          name:"firstName",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon className={classes.inputIconsColor}>
                                person
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                        <span style={{color: "red"}}>{errors["firstName"]}</span>
                        <CustomInput
                            id="firstName"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                placeholder: "Last Name...",
                                type: "text",
                                value:lastName,
                                onChange: this.onChange,
                                name:"lastName",
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon className={classes.inputIconsColor}>
                                            person
                                        </Icon>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <span style={{color: "red"}}>{errors["lastName"]}</span>

                      <CustomInput
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                            placeholder: "Email...",
                            type: "email",
                            name:"email",
                            value:email,
                            onChange: this.onChange,
                            startAdornment: (
                            <InputAdornment position="start">
                              <Email className={classes.inputIconsColor}  />
                            </InputAdornment>
                          )
                        }}
                      />
                        <span style={{color: "red"}}>{errors["email"]}</span>
                      <CustomInput
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                            placeholder: "Password",
                            type: "password",
                            value:password,
                            name:"password",
                            onChange: this.onChange,
                            startAdornment: (
                              <InputAdornment position="start">
                              <Icon className={classes.inputIconsColor}>
                                lock_utline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                        <span style={{color: "red"}}>{errors["password"]}</span>
                      <CustomInput
                        id="confirmPass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                            placeholder: "Confirm Password",
                            type: "password",
                            value:confirmPass,
                            name:"confirmPass",
                            onChange: this.onChange,
                            startAdornment: (
                              <InputAdornment position="start">
                              <Icon className={classes.inputIconsColor}>
                                lock_utline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                        <span style={{color: "red"}}>{errors["confirmPass"]}</span>
                    </CardBody>
                    <div className={classes.textCenter}>
                      <LoadingComponent isLoading={this.state.isLoading}>
                      <Button simple color="success" size="lg" onClick={this.onSave}>
                        GET STARTED
                      </Button>
                      </LoadingComponent>
                    </div>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer
          theme="#e5e5e5"
          content={
            <div>
              <div className={classes.right}>
                A &copy;&nbsp;
                <a href="http://www.root-nyc.com">Root NYC</a>
                &nbsp;Product
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

Components.contextTypes = {
  router: PropTypes.object.isRequired
};


export default withStyles(signupPageStyle)(Components);
