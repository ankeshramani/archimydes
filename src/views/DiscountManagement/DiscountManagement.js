import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Close from "@material-ui/icons/Close";
import NavigationBar from "../../components/inc/NavigationBar";
import Footer from "../../components/Footer/Footer";
import classNames from "classnames";
import Clearfix from "../../components/Clearfix/Clearfix";
import MainPage from "assets/jss/MainPageStyle.jsx";
import styles from "assets/jss/customStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Grid from '@material-ui/core/Grid';
import CustomInput from "../../components/CustomInput/CustomInput";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getDiscountManagement, addDiscountManagement, deleteDiscountManagement} from "../../actions/discount";
import connect from "react-redux/es/connect/connect";
import moment from "moment";
import LoadingComponent from "../../components/inc/LoadingComponent";
import Danger from "../../components/Typography/Danger";
import { confirmAlert } from "react-confirm-alert";
import { getUserData } from "../../utils/common";

class DiscountManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discountName: '',
      expireDays: '',
      discountAmount: '',
      discount: [],
      isLoading: true,
      errors: {},
    };
  }

  componentWillMount(){
    this.getDiscount()
  }
  onValidation = () =>{
    const {discountName, expireDays, discountAmount } = this.state
    let errors = {};
    let formIsValid = true;
    if(!discountName){
      formIsValid = false;
      errors["discountName"] = "Discount Name cannot be empty";

    }else if(discountName.length > 50){
      formIsValid = false;
      errors["discountName"] = "The voucher name should be less than 50 characters";
    }
    if(!expireDays){
      formIsValid = false;
      errors["expireDays"] = "Expire Days cannot be empty";
    }
    if(!discountAmount){
      formIsValid = false;
      errors["discountAmount"] = "Discount Amount cannot be empty";
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  onChange = (e) =>{
    if(e.target.name === "discountName"){
      this.setState({
        [e.target.name]: e.target.value
      })
    } else {
      this.setState({
        [e.target.name]: e.target.name === "expireDays" || "discountAmount" ? Math.abs(e.target.value) : e.target.value
      })
    }

  }

  getDiscount = async () =>{
    try{
      const response = await this.props.getDiscountManagement();
      if(response && response.data){
        const filteredPeople = response && response.data.filter((item) => item.deleted === undefined);
        this.setState({
          discount: filteredPeople,
          isLoading: false
        })
      }
    }catch (er) {
      if(er.response){
        this.setState({
          message:er.response.data.errorMessage,
          isLoading: false
        })
      }
    }
  }
  onDelete = async (id) =>{
    try{
      const response = await this.props.deleteDiscountManagement(id);
      if(response && response.data){
        this.getDiscount()
        this.setState({
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
      message:'Are you sure want to delete  this discount coupons?',
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

  addDiscount = async () =>{
    const {discountName, expireDays, discountAmount} = this.state
    let data = {
      name:discountName,
      expiry:expireDays,
      amount:(discountAmount * 100 )
    }
    try {
      if(this.onValidation()) {
        const response = await this.props.addDiscountManagement(data);
        if (response && response.data) {
          this.getDiscount()
          this.setState({
            isLoading: false,
            discountName: '',
            expireDays: '',
            discountAmount: '',
          })
        }
      }
    }catch (er) {
      if(er.response){
        this.setState({
          message: er.response.data.errorMessage,
          isLoading: false
        })
      }
    }
  }
  render() {
    const { classes, } = this.props;
    const userData = getUserData();
    return (
      <div>
        <div style={styles.removePadding}>
          <NavigationBar />
        </div>
        { userData.userRoles && userData.userRoles.length && userData.userRoles.includes("Admin") ?
        <div className={classNames(classes.main)}>
          <div style={styles.projectListSection}>
            <h4>Discount Details:</h4>
            <LoadingComponent isLoading={this.state.isLoading}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  labelText="Discount Name"
                  inputProps={{
                    name: 'discountName',
                    onChange: this.onChange,
                    value: this.state.discountName,
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <Danger>{this.state.errors["discountName"]}</Danger>
                <CustomInput
                  labelText="Expire Days"
                  inputProps={{
                    name: 'expireDays',
                    onChange: this.onChange,
                    value: this.state.expireDays,
                    type: "number"
                  }}
                  formControlProps={{
                    fullWidth: true

                  }}
                />
                <Danger>{this.state.errors["expireDays"]}</Danger>
                <CustomInput
                  labelText="Discount Amount($)"
                  inputProps={{
                    name: "discountAmount",
                    onChange: this.onChange,
                    value: this.state.discountAmount,
                    type: "number"
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <Danger>{this.state.errors["discountAmount"]}</Danger><br/>
                <Button type="button" color="primary" onClick={this.addDiscount}>
                  GENERATE DISCOUNT
                </Button>

              </Grid>
              <Grid item xs={12} sm={6}/>

              <h4>Discount Code List:</h4>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="right">DiscountName</TableCell>
                    <TableCell align="right">Discount Code</TableCell>
                    <TableCell align="right">Discount Amount($)</TableCell>
                    <TableCell align="right">Is Valid</TableCell>
                    <TableCell align="right">Expire Days</TableCell>
                    <TableCell align="right">Expires On</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.state.discount.map((val, i) => {
                      return(
                        <TableRow>
                          <TableCell align="right">{i + 1}</TableCell>
                          <TableCell align="right">{val.name}</TableCell>
                          <TableCell align="right">{val.code}</TableCell>
                          <TableCell align="right">{val.amount / 100}</TableCell>
                          <TableCell align="right" style={{color:"#4caf50"}}>{val.expired ===  true ? "false" :"true"}</TableCell>
                          <TableCell align="right">{val.expiry}</TableCell>
                          <TableCell align="right">{moment(val.expireAt).format("DD MMM YY h:mm A")}</TableCell>
                          <TableCell align="right">
                            <Button justIcon size="sm" color="danger" onClick={() => this.confirmDeleteUser(val._id)}>
                            <Close />
                          </Button>
                          </TableCell>
                        </TableRow>
                        )
                    })
                  }
                </TableBody>
              </Table>
            </Grid>
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
  getDiscount:state.discountManagement.getDiscount,
  addDiscount:state.discountManagement.addDiscount,
  discountDelete: state.discountManagement.discountDelete,

})
const mapDispatchToProps = dispatch => ({
  getDiscountManagement: () => dispatch(getDiscountManagement()),
  addDiscountManagement: (data) => dispatch(addDiscountManagement(data)),
  deleteDiscountManagement: (id) => dispatch(deleteDiscountManagement(id)),

});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(MainPage)(DiscountManagement));
