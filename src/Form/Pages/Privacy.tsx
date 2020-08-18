import React from "react";
import { FormData } from "../../Shared/types";
import './Privacy.scss';
interface Props {
  onSubmit: (formData: FormData) => void;
}

interface State {
  checkTray: boolean;
  checkOther: boolean;
}
class Privacy extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checkTray: false,
      checkOther: false,
    };
  }

  handleTray = () => {
    const { checkTray } = this.state;
    this.setState({ checkTray: !checkTray });
  };
  handleOther = () => {
    const { checkOther } = this.state;
    this.setState({ checkOther: !checkOther });
  };

  handleSubmit = () => {
    const { checkTray, checkOther } = this.state;
    const { onSubmit } = this.props;
    const formData: FormData = {
      section: "Privacy",
      fields: {
        checkTrayInput: checkTray,
        checkOtherInput: checkOther,
      },
    };

    onSubmit(formData);
  };
  render() {
    const { checkTray, checkOther } = this.state;
    return (
      <>
        <div className="privacy">
          <div className="privacy-checkbox-container" onClick={this.handleTray}>
            <input
              type="checkbox"
              checked={checkTray}
              aria-label="tray-product-input"
              onChange={this.handleTray}
            />
            <div>Recieve updates about Tray.io product by email</div>
          </div>
          <div
            className="privacy-checkbox-container"
            onClick={this.handleOther}
          >
            <input
              type="checkbox"
              checked={checkOther}
              aria-label="tray-other-input"
              onChange={this.handleOther}
            />
            <div>
              Recieve communication by email for other products created by the
              Tray.io team
            </div>
          </div>
          <button className="submit-button" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </>
    );
  }
}

export default Privacy;
