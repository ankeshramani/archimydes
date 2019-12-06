import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Footer from "components/Footer/Footer.jsx";
import ChangePasswordPageStyle from "assets/jss/ChangePasswordPageStyle.jsx";
import NavigationBar from "components/inc/NavigationBar.jsx";
import styles from "assets/jss/customStyle.jsx";
import { successColor } from "assets/jss/material-kit-pro-react.jsx";
import ChangePassword from "components/ChangePassword/ChangePassword.jsx";
import classNames from "classnames";
import {getUserAPI, userProfileUpdateAPI} from "../../api/usersApi";

class ChangePasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword:"",
            newPassword:"",
            confirmPassword:'',
            userData: {},
            errors: {},
        };
    }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

    componentWillMount (){
        this.onGet()
        const userData = (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'))) || {} 
        this.setState({userData})
    }
    onGet  = async () =>{
        try{
            const response = await getUserAPI();
            if(response && response.data){
                this.setState({
                    email:response.data.email,
                    firstName:response.data.firstName,
                    lastName:response.data.lastName,
                    companyRole:response.data.userRoles[0],
                    company:response.data.company,
                    city:response.data.city,
                    country:response.data.country,
                })
            }
        }catch (er) {
            if(er.response){
                this.setState({message:er.response.data.errorMessage})
            }
        }

    }

    onUpdate = async  () =>{
        const {firstName, lastName, email, company, companyRole, country, city, oldPassword, newPassword,userData   } = this.state
        try{
            if(this.onValidation()){
                const response =  await  userProfileUpdateAPI({firstName, lastName, email, company, companyRole, country, city , oldPassword, newPassword},userData._id)
                if(response &&  response.success ){
                    this.setState({
                        message:"User Password update Successfully",
                    })
                  this.props.history.push(`/profile-page`)
                }
            }
        }catch(er)  {
            if(er.response){
                this.setState({message:er.response.data.errorMessage})
            }
        }
    }

    onCancel = () =>{
      this.props.history.push(`/profile-page`)
    }

    onValidation = () =>{
        const { oldPassword, newPassword, confirmPassword} = this.state
        let errors = {};
        let formIsValid = true;

        if(!oldPassword){
            formIsValid = false;
            errors["oldPassword"] = "Password cannot be empty password";

        }else if(oldPassword.length > 30){
            formIsValid = false;
            errors["oldPassword"] = "The Password should be lower than 30 character";
        }
        if(!newPassword){
            formIsValid = false;
            errors["newPassword"] = "Password cannot be empty";

        }else if(newPassword.length > 30){
            formIsValid = false;
            errors["newPassword"] = "The confirm Password should be lower than 30 character";

        }if(!confirmPassword){
            formIsValid = false;
            errors["confirmPassword"] = "Confirm Password cannot be empty";

        }else if(confirmPassword.length > 30){
            formIsValid = false;
            errors["confirmPassword"] = "The confirm Password should be lower than 30 character";

        }else if(confirmPassword !== newPassword){
            formIsValid = false;
            errors["confirmPassword"] = "Password needs to match. ";
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

  render() {
    const { classes, ...rest } = this.props;
    const successTitle = {
      color: successColor
    };
    return (
      <div>
        <div style={styles.removePadding}>
          <NavigationBar />
        </div>
        <div className={classNames(classes.main)}>
          <div style={styles.projectListSection}>
            <ChangePassword  state={this.state} onChange={this.onChange} onUpdate={this.onUpdate} onCancel={this.onCancel} />
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

export default withStyles(ChangePasswordPageStyle)(ChangePasswordPage);
