import React from "react";
import Login from "../views/Login";
import { render, screen, fireEvent } from "./utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createStore } from "redux";
import rootReducer from "../reducers";
import { Provider } from "react-redux";

configure({ adapter: new Adapter() });

describe("Basic login component tests", () => {
  it("Should render 2 text inputs and button for login", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("Should render text in text fields when user is typing", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const email = screen.getByLabelText(/email/i);
    const pswd = screen.getByLabelText(/password/i);

    fireEvent.change(email, { target: { value: "heisenberg@gmail.com" } });
    fireEvent.change(pswd, { target: { value: "MyCrystals" } });

    expect((email as HTMLInputElement).value).toBe("heisenberg@gmail.com");
    expect((pswd as HTMLInputElement).value).toBe("MyCrystals");
  });
});

describe("Test login form whether it works properly", () => {
  let mockStore: any;
  let wrapper: any;
  beforeEach(() => {
    mockStore = createStore(rootReducer);
    wrapper = mount(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
  });

  it("Gives error message when user email is wrong", () => {
    const email = wrapper.find("#email");
    const pswd = wrapper.find("#password");
    const submit = wrapper.find("button");

    email
      .at(0)
      .simulate("change", { target: { value: "heisenberg@comgmail" } });
    pswd.at(0).simulate("change", { target: { value: "MyCrystals" } });
    submit.at(0).simulate("click");

    expect(
      wrapper.find("[data-testid='error-msg']").at(0).getDOMNode()
    ).toHaveTextContent("Please, fill the form up correctly");
  });
  it("Gives error message when user password is less than 8 characters", () => {
    const email = wrapper.find("#email");
    const pswd = wrapper.find("#password");
    const submit = wrapper.find("button");

    email
      .at(0)
      .simulate("change", { target: { value: "heisenberg@gmail.com" } });
    pswd.at(0).simulate("change", { target: { value: "MyMeth" } });
    submit.at(0).simulate("click");

    expect(
      wrapper.find("[data-testid='error-msg']").at(0).getDOMNode()
    ).toHaveTextContent("Please, fill the form up correctly");
  });
});
