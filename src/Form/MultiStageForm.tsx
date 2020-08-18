import React from "react";
import classnames from "classnames";
import User from "./Pages/User";
import Privacy from "./Pages/Privacy";
import Done from "./Pages/Done";
import { FormData } from "../Shared/types";

import "./MultiStageForm.scss";

interface ProgressProps {
  stages: string[];
  currentStage: string;
  currentStageIndex: number;
}

interface State {
  formData: FormData | {};
  currentStageIndex: number;
}

interface Props {}

class StageProgress extends React.Component<ProgressProps> {
  render() {
    const { stages, currentStage } = this.props;
    return (
      <>
        <div className="multistageform-progress">
          {stages.map((stage, i) => (
            <div
              className={classnames("multistageform-progress__heading", {
                "multistageform-progress__heading--active":
                  currentStage === stage,
              })}
              key={i}
            >
              {stage}
            </div>
          ))}
        </div>
      </>
    );
  }
}

const stages: string[] = ["User", "Privacy", "Done"];

class MultiStageForm extends React.Component<Props, State> {
  state: State = {
    formData: {},
    currentStageIndex: 0,
  };
  onSubmitCallback = (data: FormData) => {
    const { formData, currentStageIndex } = this.state;
    this.setState({ formData: { ...formData, [data.section]: data } });

    // These feel like magic numbers, but they're kto accomodate arrays starting from 0
    if (currentStageIndex + 1 === stages.length - 1) {
      // have structured the data in this way purely for demo purposes
      // an array would probably make more sense in a real word scenario (esp with graphql)
      const dataToSend = { ...formData, [data.section]: data };
      console.log("dataToSend", dataToSend);
    }
    this.setState({ currentStageIndex: currentStageIndex + 1 });
  };

  render() {
    const { currentStageIndex } = this.state;
    const formPages = [
      <User onSubmit={this.onSubmitCallback} />,
      <Privacy onSubmit={this.onSubmitCallback} />,
      <Done />,
    ];
    return (
      <>
        <div className="multistageform">
          <StageProgress
            currentStage={stages[currentStageIndex]}
            currentStageIndex={currentStageIndex}
            stages={stages}
          />
        </div>
        <div>{formPages[currentStageIndex]}</div>
      </>
    );
  }
}

export default MultiStageForm;
