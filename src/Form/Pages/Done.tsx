import React from "react";
import './Done.scss';

class Done extends React.Component {
  render() {
    return (
      <>
        <div className="done">
          <div className="done-message">
            Please verify your email address, you should have recieved an email
            from us already
          </div>
        </div>
      </>
    );
  }
}

export default Done;
