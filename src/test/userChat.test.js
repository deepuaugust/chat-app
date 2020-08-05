import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UserChat from "../components/UserChat";

configure({ adapter: new Adapter() });
const mockStore = configureStore();
jest.mock("react-dom");

const location = {
  pathname: "/user/chat/1",
};

let initialState = {
  userListReducer: [{ id: 1, user: "Sample user", messages: ["Hello"] }],
};

let store = mockStore(initialState);

const div = global.document.createElement("div");

describe("UserChat Component", () => {
  it("renders without crashing", () => {
    ReactDOM.render(
      <Router>
        <UserChat store={store} location={location} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
