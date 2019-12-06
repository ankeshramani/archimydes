/* eslint-disable */
import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Footer from "components/Footer/Footer.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import styles from "assets/jss/customStyle.jsx";
import NavigationBar from "components/inc/NavigationBar.jsx";
import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.jsx";
import NewUser from "components/CreateUser/CreateUser.jsx";
import connect from "react-redux/es/connect/connect";
import { createNewUser } from "../../actions/createUser";
import { getUserData } from "../../utils/common";

class CreateUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRoles: [],
      email: "",
      newPassword: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      message: "",
      timezone: "",
      errors: {},
      isLoading: false
    };
  }

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  onValidation = () => {
    const { firstName, lastName, email, newPassword, confirmPassword, userRoles } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!email) {
      formIsValid = false;
      errors["email"] = "Email cannot be empty.";
    } else if (email.length > 50) {
      formIsValid = false;
      errors["email"] = "The Email should be lower than 50 character.";
    } else if (!this.validateEmail(email)) {
      formIsValid = false;
      errors["email"] = "Invalid Email.";
    }

    if (!firstName) {
      formIsValid = false;
      errors["firstName"] = "First name cannot be empty.";
    } else if (firstName.length > 30) {
      formIsValid = false;
      errors["firstName"] = "The First Name should be less than 30 characters.";
    }

    if (!lastName) {
      formIsValid = false;
      errors["lastName"] = "Last name cannot be empty ";
    } else if (lastName.length > 30) {
      formIsValid = false;
      errors["lastName"] = "The last name should be less than 30 characters.";
    }

    if (userRoles.length <= 0) {
      formIsValid = false;
      errors["userRoles"] = "The user role cannot be empty.";
    }

    if(!newPassword){
      formIsValid = false;
      errors["password"] = "Password cannot be empty password.";

    }else if(newPassword.length > 30){
      formIsValid = false;
      errors["password"] = "The Password should be lower than 30 character.";
    }

    if(!confirmPassword){
      formIsValid = false;
      errors["confirmPassword"] = "Confirm Password cannot be empty.";

    }else if(confirmPassword.length > 30){
      formIsValid = false;
      errors["confirmPassword"] = "The confirm Password should be lower than 30 character.";

    }else if(newPassword !== confirmPassword){
      formIsValid = false;
      errors["confirmPassword"] = "Password needs to match..";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onRoleChange = (event) => {
    const userRoles = this.state.userRoles
    const index = userRoles.indexOf(event.target.value)
    if(index === -1){
      userRoles.push(event.target.value)
    }else {
      userRoles.splice(index, 1)
    }
    this.setState({ userRoles });
  }

  handleSubmit = async () => {
    const { email, newPassword, firstName, lastName, userRoles, } = this.state;
    let userData = {
      email: email,
      password: newPassword,
      firstName: firstName,
      lastName: lastName,
      userRoles: userRoles,
    };

    try {
        if(this.onValidation()){
            this.setState({
                isLoading: true
            })
          const response = await this.props.createNewUser(userData);

          if (response && response.success) {
              this.setState({
                  isLoading: false
              })
            this.props.history.replace(`/user-list`)
          }else{
            this.setState({
                message: response && response.response && response.response.data && response.response.data.errorMessage,
                isLoading: false
            });
          }
        }
    } catch (er) {
        this.setState({ message: er });
    }
  };

  onBack = () =>{
    this.props.history.replace(`/user-list`)
  }

  render() {
    const { classes } = this.props;
    const userData = getUserData();
    return (
      <div>
        <div style={styles.removePadding}>
          <NavigationBar/>
        </div>
        <div className={classNames(classes.main)}>
          <div style={styles.projectListSection}>
            <NewUser state={this.state} onChange={this.onChange} userData={userData} handleSubmit={this.handleSubmit} onRoleChange={this.onRoleChange} onBacke={this.onBack}/>
          </div>
          <Clearfix/>
        </div>

        <Footer
          theme="#e5e5e5"
          content={
            <div>
              <div className={classes.right}>
                A &copy;&nbsp;
                <a href="http://www.root-nyc.com">
                  Root NYC
                </a>
                &nbsp;Product
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  createUserSavedData: state.createUsers.createUserSavedData,
});

const mapDispatchToProps = dispatch => ({
  createNewUser: (data) => dispatch(createNewUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(profilePageStyle)(CreateUsers));