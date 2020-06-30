import React from "react";
import MainContainer from "./MainContainer.js";

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <MainContainer>
          <h1 className="page-header">Not Found</h1>
          Page Not Found
        </MainContainer>
      </div>
    );
  }
}

export default NotFound;
