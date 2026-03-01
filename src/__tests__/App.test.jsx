import { render } from "@testing-library/react";
import App from "../App.jsx";

test("renders the app without crashing", () => {
  render(<App />);
});