import React from "react";
import Register from "../views/Register";
import { render, screen, fireEvent } from "./utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createStore } from "redux";
import rootReducer from "../reducers";
import { Provider } from "react-redux";

configure({ adapter: new Adapter() });

describe("Basic register component tests", () => {
  it("Should render 3 text inputs and button for register", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  it("Should render text in text fields when user is typing", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const name = screen.getByLabelText(/name/i);
    const email = screen.getByLabelText(/email/i);
    const pswd = screen.getByLabelText(/password/i);

    fireEvent.change(name, { target: { value: "Heisenberg" } });
    fireEvent.change(email, { target: { value: "heisenberg@gmail.com" } });
    fireEvent.change(pswd, { target: { value: "MyCrystals" } });

    expect((name as HTMLInputElement).value).toBe("Heisenberg");
    expect((email as HTMLInputElement).value).toBe("heisenberg@gmail.com");
    expect((pswd as HTMLInputElement).value).toBe("MyCrystals");
  });
});

describe("Test register form whether it works properly", () => {
  let mockStore: any;
  let wrapper: any;
  beforeEach(() => {
    mockStore = createStore(rootReducer);
    wrapper = mount(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Register />
        </Provider>
      </BrowserRouter>
    );
  });

  it("Gives error message when user name is too short", () => {
    const name = wrapper.find("#name");
    const email = wrapper.find("#email");
    const pswd = wrapper.find("#password");
    const submit = wrapper.find("button");

    name.at(0).simulate("change", { target: { value: "H" } });
    email
      .at(0)
      .simulate("change", { target: { value: "heisenberg@gmail.com" } });
    pswd.at(0).simulate("change", { target: { value: "MyCrystals" } });
    submit.at(0).simulate("click");

    expect(
      wrapper.find("[data-testid='error-msg']").at(0).getDOMNode()
    ).toHaveTextContent("Please, fill the form up correctly");
  });

  it("Gives error message when user email is wrong", () => {
    const name = wrapper.find("#name");
    const email = wrapper.find("#email");
    const pswd = wrapper.find("#password");
    const submit = wrapper.find("button");

    name.at(0).simulate("change", { target: { value: "Heisenberg" } });
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
