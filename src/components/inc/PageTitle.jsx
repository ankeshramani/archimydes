import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import { successColor } from "assets/jss/material-kit-pro-react.jsx";

function PageTitle(props){
  const { title } = props;
  const successTitle = {
    color: successColor
  };

  return (
      <div className="title">
        <h3 style={successTitle}>{title}</h3>
      </div>
  );
}

export default withStyles(style)(PageTitle);