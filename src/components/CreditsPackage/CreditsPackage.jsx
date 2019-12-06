import React from "react";
import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import StepZilla from "react-stepzilla";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import "react-confirm-alert/src/react-confirm-alert.css";
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import { successColor } from "assets/jss/material-kit-pro-react.jsx";
import Button from "components/CustomButtons/Button.jsx";
import connect from "react-redux/es/connect/connect";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { getPackage } from "../../actions/package";
import { applyVoucher, paymentData } from "../../actions/discount"
import { paymentApi } from "../../api/discountManagement"
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Check from "@material-ui/icons/Check";
import image from "../../assets/img/stripe_secure.png";
import StripeCheckout from 'react-stripe-checkout';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import LoadingComponent from "../inc/LoadingComponent";
import { STRIPE_KEYS } from "../../common/constants";

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstStep: "first step here",
      package: [],
      isLoading: true,
    };
  }

  componentWillMount(){
    this.getpackageList()
  }

  getpackageList = async ()=>{
    const response = await this.props.getPackage()
    if(response && response.data){
      this.setState({
        package: response.data,
        isLoading: false
      })
    }
  }

  onClick = (val) =>{
    const { history } = this.props
    history.push({
      state: {
        value:val
    }
  })
  }

  render() {
    return (
      <div>
        <LoadingComponent isLoading={this.state.isLoading}>
        <Grid container spacing={24}>
          <Grid item xs>
          </Grid>
          <Grid item xs={6}>
            <h2 style={{textAlign:"center"}}>Select a package that suits your</h2>
            <h2 style={{textAlign:"center"}}>business needs</h2>
            <h4 style={{textAlign:"center",color:"#a5a1a1"}}>Purchasing credits in bulk will give more credits </h4>
          </Grid>
          <Grid item xs>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          {
            this.state.package.map((val,i)=>{
              return(
                <Grid item xs={3} key={i}>
                  <h6 style={{textAlign:"center",color:"#a5a1a1"}}>{val.title}</h6>
                  <div style={{textAlign:"center"}}>
                    <h1><sup style={{fontSize:"26px",color:"#a5a1a1"}}>$</sup>{(val.value)/100}</h1>
                    <h4 style={{color:"#635959"}}>{val.credit} Credits</h4>
                    <h6>{val.shortDescriptionHeading}</h6>
                    <h5 style={{color:"#a5a1a1"}}>{val.shortDescription}</h5>
                    <Button color="success" round onClick={()=>this.onClick(val, this.props.jumpToStep(1))}>PURCHASE</Button>
                  </div>
                </Grid>
              )
            })
          }
        </Grid>
        </LoadingComponent>
      </div>
    );
  }
}

class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondStep: "second step here",
      promoCode: "",
      applyDiscountCode: false,
      selectedPackage: {},
      discountAmount: null,
      isLoading: false,
    };
  }

  componentDidMount(){
    const { history } = this.props
    this.setState({
      selectedPackage: history.location && history.location.state && history.location.state.value
    });
  }

  onChange =(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  onApply = async () =>{
    this.setState({isLoading: true})
    const data = this.state.promoCode
    let amount = this.state.selectedPackage.value
    const response = await this.props.applyVoucher(data)
    if(response && response.data){
      this.setState({
        discountAmount: (amount - response.data.amount),
        isLoading: false,
      })
    }else {
      this.setState({isLoading: false})
    }
  }

  handleChecked = () => {
    let newState = {};
    if (this.state.applyDiscountCode) {
      newState = {
        discountAmount: 0,
        applyDiscountCode: !this.state.applyDiscountCode
      };
    } else {
      newState = {
        applyDiscountCode: !this.state.applyDiscountCode
      };
    }
    this.setState({
      ...newState
    });
  };

  onClick = () => {
    this.props.jumpToStep(2);
  }

  onToken = async (token) => {
    let data = {
      packageId: this.state.selectedPackage._id,
      voucherNo: this.state.promoCode,
      transactionId: token.id,
      paymentProcessor: "Stripe",
    }
    const response = await this.props.paymentData(data)
    if(response && response.data){
      this.props.onOrderNumber(response.data.orderNo);
      this.props.jumpToStep(2);
    }
  };

  render() {
    const { classes } = this.props.props;
    const { selectedPackage, discountAmount, isLoading } = this.state;
    let disAmt = (discountAmount)/100
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}/>
          <GridItem xs={12} sm={12} md={4}>
            <Grid item xs={12}>
              <h3 style={{ textAlign: "center" }}>Your Selected Package</h3>
            </Grid>
            <Card color="success">
              <CardBody>
                <div style={{ textAlign: "center" }}>
                  <h6>INTRODUCTORY</h6>
                  <h1><sup style={{ fontSize: "26px" }}>$</sup>{disAmt ? disAmt : (selectedPackage.value)/100}</h1>
                  <h4>{selectedPackage.credit} Credits</h4>
                  <div style={{color:"#FFF "}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.applyDiscountCode}
                          style ={{
                            color: "#fff",
                          }}
                          checkedIcon={<Check className={classes.checkedIcons}/>}
                          icon={<Check className={classes.uncheckedIcons}/>}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot
                          }}
                          inputProps={{
                            name: 'applyDiscountCode',
                            value: false,
                            onChange: this.handleChecked
                          }}
                        />
                      }
                      style ={{
                        color: "#fff",
                      }}
                      classes={{label: classes.labels}}
                      label="APPLY DISCOUNT CODE"
                    />
                  </div>

                  {
                    this.state.applyDiscountCode  ?
                      <div style={{marginTop: "-25px"}}>
                      <Grid container xs={12}>
                        <GridItem xs={12} sm={12} md={2}/>
                        <GridItem xs={12} sm={12} md={6} >
                          <CustomInput
                            id="promoCode"
                            inputProps={{
                              placeholder: "Promo Code",
                              name: 'promoCode',
                              value: this.state.promoCode,
                              onChange: this.onChange,
                              inputProps: {
                                maxLength: 20,
                              }
                            }}
                            formControlProps={{
                              fullWidth: false,
                            }}
                            white="true"
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={2}>
                          {
                            isLoading && <CircularProgress style={{ marginTop:'27px' }} /> ||
                            <Button size="sm" style={{ marginTop:'27px' }} round onClick={this.onApply}>APPLY</Button>
                          }
                        </GridItem>

                      </Grid>
                    </div> : null
                  }

                  <StripeCheckout
                    amount={discountAmount ? discountAmount : selectedPackage.value}
                    stripeKey = {STRIPE_KEYS}
                    token={this.onToken}
                  />
                 </div>
              </CardBody>
            </Card>
            <div>
              <img src={image} style={{width:"100%"}}/>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}/>
        </GridContainer>
      </div>
    );
  }
}

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thirdtStep: "Third step here"
    };
  }

  render() {
    return (
      <div>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}></GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Grid item xs={12}>
                <h3 style={{ textAlign: "center" }}>Your Order has been placed</h3>
              </Grid>
              <Card color="success">
                <CardBody>
                  <div style={{ textAlign: "center" }}>
                    <h6>YOUR ORDER NO:</h6>
                    <h3>{this.props.orderNumber}</h3>
                    <h6>PLEASE NOTE YOUR ORDER NUMBER</h6>
                    <div style={{color:"#FFF "}}>
                      <p>An invoice has been sent to you on your registered email address, if you do not recieve an email for you order for more than 20 minutes, please contact support. </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div>
                <img src={image} style={{width:"100%"}}/>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}></GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

class CreditsPackage extends React.Component {
  constructor(props) {
    super(props);
    this.onStepChange = this.onStepChange.bind(this);
    this.state = {
      firststep: {
        name: null,
        descriptions: null

      }
    };
  }

  onStepChange(step) {
    console.log("Step :", step);
  }

  onOrderNumber = (orderNumber) => {
    this.setState({
      orderNumber,
    })
  }

  render() {
    const steps = [
      { name: "Package", component: <FirstStep packageList={this.props.packageList} getPackage={this.props.getPackage} history={this.props.history}/> },
      { name: "Details", component: <SecondStep paymentData={this.props.paymentData} paymentResponse={this.props.paymentResponse}  onOrderNumber={this.onOrderNumber} props={this.props} history={this.props.history} applyVoucher={this.props.applyVoucher} vocherResponse={this.props.vocherResponse} /> },
      { name: "Confirm", component: <ThirdStep orderNumber={this.state.orderNumber} props={this.props} /> }
    ];
    return (
      <div className="sprint-step">
        <StepZilla
          steps={steps}
          onStepChange={this.onStepChange}
          nextTextOnFinalActionStep={false}
          stepsNavigation={false}
          showNavigation={false}
          nextButtonCls="btn btn-sm btn-custom-success wizard-next-btn"
          backButtonCls="btn btn-sm btn-custom-success wizard-back-btn"
          backButtonText="Back"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  packageList: state.getPackages.packageList,
  vocherResponse: state.discountManagement.vocherResponse,
  paymentResponse: state.discountManagement.paymentResponse
});

const mapDispatchToProps = dispatch => ({
  getPackage: () => dispatch(getPackage()),
  applyVoucher: (voucherNumber) => dispatch(applyVoucher(voucherNumber)),
  paymentData: (data) => dispatch(paymentData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(withRouter(CreditsPackage)));
