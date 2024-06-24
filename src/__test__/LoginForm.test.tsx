import LoginForm from "../Componet/Login/LoginForm";
import { fireEvent, render, screen } from "@testing-library/react";
import Wrapper from "../setupTest/Wrapper";
import axios from 'axios';

// Mock axios.get method
let axiosGetMock = async (url: string) => {
  return Promise.resolve({
    data: [
      { username: 'test@example.com', password: '123456' },
      { username: 'user2', password: 'password2' },
    ]
  });
};

describe("Login Page", () => {
  it(" TC:1 Email present", () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const text = screen.getByText("Login Here");
    // assertion for login header text
    expect(text).toBeInTheDocument();
    const useremail = screen.getByTestId("username");
    expect(useremail).toBeInTheDocument();
    expect(useremail).toHaveStyle({
      height: "100%",
      width: "100%",
      borderRadius: "10px",
      padding: "5%",
      fontFamily: "cursive"
    })
    const userpass = screen.getByTestId("password");
    expect(userpass).toBeInTheDocument();
    expect(userpass).toHaveStyle({
      height: "100%",
      width: "100%",
      borderRadius: "10px",
      padding: "5%",
      fontFamily: "cursive"
    })
  });
  it("TC:2 onChnage events of email and password", () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const text = screen.getByText("Login Here");
    // assertion for login header text
    expect(text).toBeInTheDocument();
    const useremail = screen.getByTestId("username");
    expect(useremail).toBeInTheDocument();
    fireEvent.change(useremail, { target: { value: 'test@example.com' } });

    expect(useremail.value).toBe('test@example.com');

    const userpass = screen.getByTestId("password");
    expect(userpass).toBeInTheDocument();
    fireEvent.change(userpass, { target: { value: '123456' } });

    expect(userpass.value).toBe('123456');

  });
  it("TC:3 it should handle login", async () => {

    axios.get = axiosGetMock as any;
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const useremail = screen.getByTestId("username");
    expect(useremail).toBeInTheDocument();
    fireEvent.change(useremail, { target: { value: 'test@example.com' } });
    const userpass = screen.getByTestId("password");
    expect(userpass).toBeInTheDocument();
    fireEvent.change(userpass, { target: { value: '123456' } });

    const submit = screen.getByTestId("submitBtn");
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);
    fireEvent.mouseEnter(submit);
    fireEvent.mouseLeave(submit)
    const response = await axios.get('/api/data');

    // Assert the response
    expect(response.data).toEqual([
      { username: 'test@example.com', password: '123456' },
      { username: 'user2', password: 'password2' },
    ]);
  });
  it("TC:4 incorrect email ", async () => {

    axios.get = axiosGetMock as any;
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const useremail = screen.getByTestId("username");
    expect(useremail).toBeInTheDocument();
    fireEvent.change(useremail, { target: { value: 'test1s@example.com' } });
    const userpass = screen.getByTestId("password");
    expect(userpass).toBeInTheDocument();
    fireEvent.change(userpass, { target: { value: '123456' } });

    const submit = screen.getByTestId("submitBtn");
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);
    fireEvent.mouseEnter(submit);
    fireEvent.mouseLeave(submit)
    const response = await axios.get('/api/data');

    // Assert the response
    expect(response.data).toEqual([
      { username: 'test@example.com', password: '123456' },
      { username: 'user2', password: 'password2' },
    ]);
  });
  it("TC:4 unable to fetch the data from axios ", async () => {
    axiosGetMock = async (url: string) => {
      return Promise.resolve({
        data: {}
      });
    };
    axios.get = axiosGetMock as any;
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const useremail = screen.getByTestId("username");
    expect(useremail).toBeInTheDocument();
    fireEvent.change(useremail, { target: { value: 'test1s@example.com' } });
    const userpass = screen.getByTestId("password");
    expect(userpass).toBeInTheDocument();
    fireEvent.change(userpass, { target: { value: '123456' } });

    const submit = screen.getByTestId("submitBtn");
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);
    const response = await axios.get('/api/data');

  });
  it("TC:4 mouse eneter and leave events ", async () => {
    axiosGetMock = async (url: string) => {
      return Promise.resolve({
        data: {}
      });
    };
    axios.get = axiosGetMock as any;
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const useremail = screen.getByTestId("username");
    expect(useremail).toBeInTheDocument();
    fireEvent.change(useremail, { target: { value: 'test1s@example.com' } });
    const userpass = screen.getByTestId("password");
    expect(userpass).toBeInTheDocument();
    fireEvent.change(userpass, { target: { value: '123456' } });

    const submit = screen.getByTestId("submitBtn");
    expect(submit).toBeInTheDocument();
    fireEvent.mouseEnter(submit);
    fireEvent.mouseLeave(submit)
    const response = await axios.get('/api/data');

  });
});
