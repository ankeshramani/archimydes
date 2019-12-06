import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import successStyles from "assets/jss/material-kit-pro-react/views/componentsSections/notificationsStyles.jsx";
import { clearSuccess } from "../../actions/success";
import {connect} from "react-redux";
import Check from "@material-ui/icons/Check";



const SuccessPanel = (props) => {
  return (
    <div>
      {props.success && props.success.successMsg &&
      <div className="success-container">
        <SnackbarContent
          message={
            <span>
                  <b>SUCCESS: </b>
               {props.success.successMsg}
                </span>
          }
          customNotificationClear={props.clearSuccess}
s          close
          color="success"
          icon={Check}
        />
      </div>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  success: state.success,
});

const mapDispatchToProps = dispatch => ({
  clearSuccess: () => {dispatch(clearSuccess())},
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(successStyles)(SuccessPanel));