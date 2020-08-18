
import React from "react";
import { render } from "@testing-library/react";
import MultiStageForm from './MultiStageForm';

describe(':MultiStageForm tests', () => {
  describe(':progress check', () => {
    it('Should display the starting progress track', () => {
      const { getByText } = render(<MultiStageForm />);

      const userElement = getByText(/User/i);
      const privacyElement = getByText(/Privacy/i);
      const doneElement = getByText(/Done/i);
      expect(userElement).toBeInTheDocument();
      expect(privacyElement).toBeInTheDocument();
      expect(doneElement).toBeInTheDocument();

    })
  })
})