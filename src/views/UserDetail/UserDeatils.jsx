import React from "react";
import 'react-confirm-alert/src/react-confirm-alert.css'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import NavigationBar from "../../components/inc/NavigationBar";
import Footer from "../../components/Footer/Footer";
import classNames from "classnames";
import Clearfix from "../../components/Clearfix/Clearfix";
import MainPage from "assets/jss/MainPageStyle.jsx";
import styles from "assets/jss/customStyle.jsx";
import UserDetail from "../../components/UserDetail/UserDetail";
import {getUsersCredits, updateUsers,} from "../../api/usersApi";
import {updateUserCredit,updateUserRole} from "../../actions/userUpdate";
import connect from "react-redux/es/connect/connect";
import { getUserData } from "../../utils/common";

class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:{},
            credits:{},
            creditsToAdd:"",
            ReservedCreditsToAdd:"",
            error: "",
            isLoading :true,
            isModelOpen: false
        };
    }
    componentWillMount (){
        this.setState({
            userData: this.props.location && this.props.location.state && this.props.location.state.userData
        })
        this.onGetUserCresit()
    }

    onGetUserCresit = async () =>{
        try{
            const response = await getUsersCredits(this.props.location.state.userData._id);
            if(response && response.data){
                this.setState({
                    credits:response.data,
                    isLoading: false,
                })
            }
        }catch (er) {
            if(er.response){
                this.setState({
                    message:er.response.data.errorMessage,
                    isLoading: false,
                })
            }
        }
    }

    handleClickOpen = () => {
       this.setState({isModelOpen: true})
    }

    handleClose = () => {
        this.setState({
            isModelOpen: false,
            error: ""
        })
    }

    onUpdateUser = async () =>{
        const { creditsToAdd, userData } = this.state
        const { location, } = this.props
        const credits = {
            amount: creditsToAdd
        }
        const role = {
            userRoles:userData.userRoles
        }
        if(userData.userRoles.length === 0){
          return this.setState({
            error: "At least one role needs to be selected."
          },() => {
            this.handleClickOpen()
          })
        }
            this.setState({btnLoading: true})
          if(credits.amount){
            try{
              const response = await this.props.updateUserCredit(credits, location.state && location.state.userData && location.state.userData._id);
              if(response && response.data){
                this.onGetUserCresit()
                this.setState({
                  creditsToAdd: "",
                  isLoading: false,
                })
              }
            }catch (er) {
              if(er.response){
                this.setState({
                  message:er.response.data.errorMessage,
                  isLoading: false,
                })
              }
            }
          }

            try{
                const response = await this.props.updateUserRole(role, location.state && location.state.userData && location.state.userData._id);
                if(response && response.data){
                    this.setState({
                        error: "",
                        isLoading: false,
                    })

                }
            }catch (er) {
                if(er.response){
                    this.setState({
                        message:er.response.data.errorMessage,
                        isLoading: false,
                    })
                }
            }
            this.setState({
                error: ""
            })
          this.props.history.replace("/user-list")
    }
    onClick =()=>{
        this.props.history.replace("/user-list")
    }

    handelChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    onChange = ( event) =>{
        const userRoles = this.state.userData.userRoles
        const index = userRoles.indexOf(event.target.value)
        if(index === -1){
            userRoles.push(event.target.value)
        }else {
            userRoles.splice(index, 1)
        }
        this.setState({ userRoles });
    }

    render() {
        const { classes,   } = this.props;
      const userData = getUserData();
        return (
            <div>
                <div style={styles.removePadding}>
                    <NavigationBar />
                </div>
              {userData.userRoles && userData.userRoles.length && userData.userRoles.includes("Admin") ?
                <div className={classNames(classes.main)}>
                    <div style={styles.projectListSection}>
                         <UserDetail  onClick={this.onClick} state={this.state} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose}  handelChange={this.handelChange} onChange={this.onChange} onUpdateUser={this.onUpdateUser} handleOpenConfirmAlert={this.handleOpenConfirmAlert} />
                    </div>
                    <Clearfix />
                </div> :
                <div className={classNames(classes.main)}>
                  <div style={styles.projectListSection}>
                    <div >
                      <h3 style={{color:"red"}}>You are not authorized to access this web page</h3>
                    </div>
                    <Clearfix/>
                  </div>
                  <Clearfix/>
                </div>
              }
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
const mapStateToProps = state =>({
    userCredits: state.userUpdate.userCredits,
    userRole: state.userUpdate.userRole,
})
const mapDispatchToProps = dispatch => ({
    updateUserCredit: (data, id) => dispatch(updateUserCredit(data, id)),
    updateUserRole: (data, id) => dispatch(updateUserRole(data, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(MainPage)(UserDetails));