import LoginForm from "../Componet/Login/LoginForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Wrapper from "../setupTest/Wrapper";
import { mockAxiosGet } from "../__mocks__/globalMock";

const user = {
  name: "",
  age: "",
  breed: "",
  birthdate: "",
  identification: "",
  owner: "",
  username: "",
  userId: "",
  gender: "",
  city: "",
  password: "",
};

describe("Login Page", () => {

  it("TC:1 login box should be present", () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const text = screen.getByText("Login Here");
    expect(text).toBeInTheDocument();
    const useremail = screen.getByTestId("username");
    expect(useremail).toBeInTheDocument();
    expect(useremail).toHaveStyle({
      height: "100%",
      width: "100%",
      borderRadius: "10px",
      padding: "5%",
      fontFamily: "cursive",
    });
    const userpass = screen.getByTestId("password");
    expect(userpass).toBeInTheDocument();
    expect(userpass).toHaveStyle({
      height: "100%",
      width: "100%",
      borderRadius: "10px",
      padding: "5%",
      fontFamily: "cursive",
    });
  });

  it("TC:2 given input email and password should be visible in respective box", () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const text = screen.getByText("Login Here");
    expect(text).toBeInTheDocument();
    const useremail = screen.getByTestId("username") as HTMLInputElement;
    expect(useremail).toBeInTheDocument();
    fireEvent.change(useremail, { target: { value: "test@example.com" } });

    expect(useremail.value).toBe("test@example.com");

    const userpass = screen.getByTestId("password") as HTMLInputElement;
    expect(userpass).toBeInTheDocument();
    fireEvent.change(userpass, { target: { value: "123456" } });
    expect(userpass.value).toBe("123456");
  });

  it("TC:3 //pending test case// - should logged in when credentials are correct", async () => {
    mockAxiosGet.mockImplementation(() => {
      return Promise.resolve({
        data: [
          {
            ...user,
            username: "priyankathorat",
            password: "blacky",
          },
        ],
      });
    });

    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const useremail = screen.getByTestId("username");
    expect(useremail).toBeInTheDocument();
    fireEvent.change(useremail, { target: { value: "test@example.com" } });
    const userpass = screen.getByTestId("password");
    expect(userpass).toBeInTheDocument();
    fireEvent.change(userpass, { target: { value: "123456" } });

    const submit = screen.getByTestId("submitBtn");
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);
    fireEvent.mouseEnter(submit);
    fireEvent.mouseLeave(submit);
    // what should happen if user is correct
    expect(screen.getByText("logged-in")).toBeInTheDocument();
  });

  it("TC:4 should display Incorrect email or password when incorrect password and email given", async () => {
    mockAxiosGet.mockImplementation(() => {
      return Promise.resolve({
        data: [
          {
            ...user,
            username: "priyankathorat",
            password: "blacky",
          },
        ],
      });
    });

    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const useremail = screen.getByTestId("username");
    fireEvent.change(useremail, { target: { value: "test1s@example.com" } });
    const userpass = screen.getByTestId("password");
    fireEvent.change(userpass, { target: { value: "123456" } });

    const submit = screen.getByTestId("submitBtn");
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);

    await waitFor(() => {
      expect(
        screen.getByText("Incorrect email or password")
      ).toBeInTheDocument();
    });
  });

  it("TC:5 something went wrong message should display when axios gets rejected", async () => {
    mockAxiosGet.mockRejectedValue({});
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const useremail = screen.getByTestId("username");
    expect(useremail).toBeInTheDocument();
    fireEvent.change(useremail, { target: { value: "test1s@example.com" } });
    const userpass = screen.getByTestId("password");
    expect(userpass).toBeInTheDocument();
    fireEvent.change(userpass, { target: { value: "123456" } });

    const submit = screen.getByTestId("submitBtn");
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByText("something went wrong")).toBeInTheDocument();
    });
  });

  it("TC:6 styling of submit button should change on hover", async () => {

    const mouseEnterCSS = {
      "background-color": "rgb(0, 17, 28)",
      "font-family": "cursive",
      height: "100%",
      width: "95%",
      "border-radius": "10px",
    };
    const mouseLeaveCSS = {
      "background-color": "rgb(89, 112, 129)",
      "font-family": "cursive",
      height: "100%",
      width: "95%",
      "border-radius": "10px",
    };

    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    const submit = screen.getByTestId("submitBtn");
    expect(submit).toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(submit);
      expect(submit.style._values).toEqual(mouseEnterCSS);
    });

    act(() => {
      fireEvent.mouseLeave(submit);
      expect(submit.style._values).toEqual(mouseLeaveCSS);
    });

  });

});
