import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
// core components
import Table from "components/Table/Table.jsx";
import LoadingComponent from "components/inc/LoadingComponent.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import NavigationBar from "../../components/inc/NavigationBar";
import Footer from "../../components/Footer/Footer";
import classNames from "classnames";
import Clearfix from "../../components/Clearfix/Clearfix";
import MainPage from "assets/jss/MainPageStyle.jsx";
import styles from "assets/jss/customStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import {deleteUsers, getUsers,} from "../../api/usersApi";
import moment from 'moment';
import {confirmAlert} from "react-confirm-alert";
import {deleteUser} from "../../actions/deleteUser";
import connect from "react-redux/es/connect/connect";
import { getUserData } from "../../utils/common";

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            isLoading :true,
        };
    }
    componentWillMount (){
        this.onGet()
    }
    onGet  = async () =>{
        try{
            const response = await getUsers();
            if(response && response.data){
                this.setState({
                    usersList: response.data,
                    isLoading: false,
                })
            }
        }catch (er) {
            if(er.response){
                this.setState({
                    message: er.response.data.errorMessage,
                    isLoading: true,
                })
            }
        }
    };

    onClick = (val) =>{
        this.props.history.push({
            pathname:"/user-details",
            state:{
                userData:val,
            }
        })
    }

    onDelete = async (id) =>{
        try{
            const response = await this.props.deleteUser(id);
            if(response && response.data){
                this.onGet()
                this.setState({
                    message: "User delete ",
                    success: response,
                    isLoading :false,

                })
            }
        }catch (er) {
            if(er.response){
                this.setState({
                    message: er.response.data.errorMessage,
                    isLoading: false,
                })
            }
        }

    }

    confirmDeleteUser = (id) => {
        confirmAlert({
            title: 'Are you sure ?',
            message:'Are you sure want to delete  this user?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onDelete(id),
                    className: 'Sonu',
                },
                {
                    label: 'No',
                    onClick: () => {},
                },
            ]
        })
    };

    render() {
        const { classes, } = this.props;
        const { usersList, isLoading } = this.state
        const userData = getUserData();
        const newTableData = usersList.map(
            (val, i) => {
                let newArr = [];
                newArr.push(i+1);
                newArr.push(val.firstName +' '+ val.lastName);
                newArr.push(val.userRoles);
                newArr.push(val.email);
                newArr.push(val.company);
                newArr.push(val.companyRole );
                newArr.push(moment(val.createdAt).format("DD MMM YY h:mm A" ) );
                newArr.push(<div className="useredit">
                    <Button justIcon size="sm" color="success" key={i} onClick={() => this.onClick(val)}>
                        <Edit />
                    </Button>
                    <Button justIcon size="sm" color="danger" onClick={() => this.confirmDeleteUser(val._id)}>
                        <Close />
                    </Button>
                </div>);
                return newArr;
            });
        return (
            <div>
                <div style={styles.removePadding}>
                    <NavigationBar />
                </div>
              {userData.userRoles && userData.userRoles.length && userData.userRoles.includes("Admin") ?
                <div className={classNames(classes.main)}>
                  <div style={styles.projectListSection}>
                    <div className={classes.right} style={styles.removePaddingBottom}>
                      <Link to={`/admin/users`}>
                        <Button type="button" color="success" round> Create New User</Button>
                      </Link>
                    </div>
                    <Clearfix />

                    <PageTitle title="User List" />
                    <LoadingComponent isLoading={isLoading}>
                      <Table
                        tableHead={[
                          "#",
                          "Name",
                          "User Role",
                          "Email",
                          "Company",
                          "Role",
                          "Joined",
                          "Action",
                        ]}
                        tableData={ newTableData }
                        customCellClasses={[
                          classes.textCenter,
                          classes.textRight,
                          classes.textRight
                        ]}
                        customClassesForCells={[0, 5, 6]}
                        customHeadCellClasses={[
                          classes.textCenter,
                          classes.textRight,
                          classes.textRight
                        ]}
                        customHeadClassesForCells={[0, 5, 6]}
                      />
                    </LoadingComponent>
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
    userDelete: state.deleteUser.userDelete,
})
const mapDispatchToProps = dispatch => ({
    deleteUser: (id) => dispatch(deleteUser(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(MainPage)(UserList));
