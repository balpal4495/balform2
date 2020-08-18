import React from "react";
import { render } from "@testing-library/react";
import Done from "./Done";

describe(":Done tests", () => {
  describe(":render", () => {
    it("Should display success text", () => {
      const { getByText } = render(<Done />);
      const doneText = getByText(
        /Please verify your email address, you should have recieved an email from us already/
      );

      expect(doneText).toBeInTheDocument();
    });
  });
});
