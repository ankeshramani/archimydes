/* eslint-disable */
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import Footer from "components/Footer/Footer.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import styles from "assets/jss/customStyle.jsx";
import NavigationBar from "components/inc/NavigationBar.jsx";
import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.jsx";
import Profile from "components/Profile/Profile.jsx"
import {getUserAPI, userProfileUpdateAPI,  } from "../../api/usersApi";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            firstName:'',
            lastName:'',
            company:'',
            companyRole:'',
            city:'',
            country:'',
            message:'',
            timezone:'',
            errors: {},
            userData: {},

        };
    }
    componentWillMount (){
        const userData = (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'))) || {} 
        this.setState({userData})
        this.onGet()
    }
    onGet  = async () =>{
        try{
            const response = await getUserAPI();
            if(response && response.data){
                this.setState({
                    email:response.data.email,
                    firstName:response.data.firstName,
                    lastName:response.data.lastName,
                    companyRole:response.data.companyRole ,
                    company:response.data.company,
                    city:response.data.city,
                    country:response.data.country,
                    timezone:response.data.timezone,
                })
            }
        }catch (er) {
            if(er.response){
                this.setState({message:er.response.data.errorMessage})
                localStorage.removeItem('accessToken');
                localStorage.removeItem('expireToken');
                localStorage.removeItem('userData');
                this.props.history.push("/login-page")
            }
        }
    };
    onUpdate = async () =>{
        const {firstName, lastName, email, company, companyRole, country, city, userData,timezone  } = this.state
        try{
            if(this.onValidation()){
                const response =  await  userProfileUpdateAPI({firstName, lastName, email, company, companyRole, country, city,timezone  },userData._id)
                if(response &&  response.success ){
                    this.setState({
                        message:"User Profile update Successfully",
                    })
                    if(userData.userRoles.indexOf('Admin') !== -1){
                        this.props.history.replace(`/admin/projects`)
                    }
                    else{
                        this.props.history.replace(`/`)
                    }
                }
            }
        }catch(er)  {
            if(er.response){
                this.setState({message:er.response.data.errorMessage})
            }
        }
    };

    validateEmail = (email) =>{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    onValidation = () =>{
        const {firstName, lastName, email, company, companyRole, city, country,timezone } = this.state
        let errors = {};
        let formIsValid = true;
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
        if(!firstName){
            formIsValid = false;
            errors["firstName"] = " First name cannot be empty";
        }else if(firstName.length > 30){
            formIsValid = false;
            errors["firstName"] = "The First Name should be less than 30 characters";
        }
        if(!lastName){
            formIsValid = false;
            errors["lastName"] = " Last name cannot be empty ";
        }else if(lastName.length > 30){
            formIsValid = false;
            errors["lastName"] = "The last name should be less than 30 characters";
        }
        if(!company){
            formIsValid = false;
            errors["company"] = "Company cannot be empty ";

        }else if(company.length > 30){
            formIsValid = false;
            errors["company"] = "The Company should be less than 30 characters";
        }
        if(!companyRole){
            formIsValid = false;
            errors["companyRole"] = "Company Role cannot be empty";

        }else if(companyRole.length > 30){
            formIsValid = false;
            errors["companyRole"] = "The Company Role should be less than 30 characters";

        }
        if(!city){
            formIsValid = false;
            errors["city"] = "City cannot be empty";

        }else if(city.length > 30){
            formIsValid = false;
            errors["city"] = "The City should be less than 30 characters";

        }
        if(!country){
            formIsValid = false;
            errors["country"] = "Country cannot be empty";

        }else if(country.length > 30){
            formIsValid = false;
            errors["country"] = "The Country should be less than 30 characters";

        }if(!timezone){
            formIsValid = false;
            errors["timezone"] = "Timezone cannot be empty";

        }
        this.setState({errors: errors});
        return formIsValid;
    }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
  }
  render() {
    const { classes, } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
        <div>
            <div style={styles.removePadding}>
                <NavigationBar />
            </div>
            <div className={classNames(classes.main)}>
                <div style={styles.projectListSection}>
                    <Profile state={this.state} onChange={this.onChange} onUpdate={this.onUpdate} />
                </div>
                <Clearfix />
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

export default withStyles(profilePageStyle)(ProfilePage);
