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

vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(),
  };
});

let testCaseNumber = 0;
const getTestCaseNumber = () => {
  testCaseNumber = testCaseNumber + 1;
  return `TC:${testCaseNumber}`;
};

const mockUser = {
  name: "",
  age: "",
  breed: "",
  birthdate: "",
  identification: "",
  owner: "",
  username: "",
  userId: "",
  gender: "",
  acc_type: "",
  password: "",
};

describe("Login Page", () => {
  vi.useFakeTimers();
  it(`${getTestCaseNumber()} login box should be present`, () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            ...mockUser,
            username: "priyankathorat",
            password: "blacky",
          },
        ],
      });
    });
    const mockInitialState = {
      status: false,
      user: mockUser,
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <LoginForm />
      </Wrapper>
    );
    const text = screen.getByText("Login Here");
    expect(text).toBeInTheDocument();
    const useremail = screen.getByTestId("userName");
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

  it(`${getTestCaseNumber()} given input email and password should be visible in respective box`, () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            ...mockUser,
            username: "priyankathorat",
            password: "blacky",
          },
        ],
      });
    });
    const mockInitialState = {
      status: false,
      user: mockUser,
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <LoginForm />
      </Wrapper>
    );
    const text = screen.getByText("Login Here");
    expect(text).toBeInTheDocument();
    const useremail = screen.getByTestId("userName") as HTMLInputElement;
    expect(useremail).toBeInTheDocument();
    act(() => {
      fireEvent.change(useremail, { target: { value: "test@example.com" } });
    });
    expect(useremail.value).toBe("test@example.com");

    const userpass = screen.getByTestId("password") as HTMLInputElement;
    expect(userpass).toBeInTheDocument();
    act(() => {
      fireEvent.change(userpass, { target: { value: "123456" } });
    });
    expect(userpass.value).toBe("123456");
  });

  it(`${getTestCaseNumber()} should display Incorrect email or password when incorrect password and email given`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            ...mockUser,
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
    const useremail = screen.getByTestId("userName");
    fireEvent.change(useremail, { target: { value: "test1s@example.com" } });
    const userpass = screen.getByTestId("password");
    fireEvent.change(userpass, { target: { value: "123456" } });

    const submit = screen.getByTestId("btn_Login");
    expect(submit).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submit);
    });

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText("Incorrect email or password")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} styling of submit button should change on hover`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            ...mockUser,
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

    const useremail = screen.getByTestId("userName");
    expect(useremail).toBeInTheDocument();
    fireEvent.change(useremail, { target: { value: "test1s@example.com" } });
    const userpass = screen.getByTestId("password");
    expect(userpass).toBeInTheDocument();
    fireEvent.change(userpass, { target: { value: "123456" } });

    const submit = screen.getByTestId("btn_Login");
    expect(submit).toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(submit);
      const computedStyle = window.getComputedStyle(submit);
      const mouseEnter = computedStyle.backgroundColor;
      expect(submit).toHaveStyle({
        backgroundColor: mouseEnter,
      });
    });

    act(() => {
      fireEvent.mouseLeave(submit);
      const computedStyle = window.getComputedStyle(submit);
      const mouseLeave = computedStyle.backgroundColor;
      expect(submit).toHaveStyle({
        backgroundColor: mouseLeave,
      });
    });
  });

  it(`${getTestCaseNumber()} button should not get clicked when email and password is not provided`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            ...mockUser,
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
    const text = screen.getByText("Login Here");
    expect(text).toBeInTheDocument();

    const useremail = screen.getByTestId("userName") as HTMLInputElement;
    expect(useremail).toBeInTheDocument();
    fireEvent.change(useremail, { target: { value: "" } });
    expect(useremail.value).toBe("");

    const userpass = screen.getByTestId("password") as HTMLInputElement;
    expect(userpass).toBeInTheDocument();
    fireEvent.change(userpass, { target: { value: "" } });
    expect(userpass.value).toBe("");

    const submit = screen.getByTestId("btn_Login");
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);

    const progressBar = screen.queryByRole("progressbar");
    expect(progressBar).not.toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should show email required and password required in respective input box if user try to click login button without credentials`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            ...mockUser,
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

    const useremail = screen.getByTestId("userName") as HTMLInputElement;
    fireEvent.change(useremail, { target: { value: "" } });
    expect(useremail.value).toBe("");

    const userpass = screen.getByTestId("password") as HTMLInputElement;
    fireEvent.change(userpass, { target: { value: "" } });
    expect(userpass.value).toBe("");

    const submit = screen.getByTestId("btn_Login");
    expect(submit).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submit);
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByPlaceholderText("* Email Required")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("* Password Required")
    ).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should done tick appear when credentials are correct`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          ...mockUser,
          username: "priyankathorat",
          password: "blacky",
        },
      });
    });

    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const useremail = screen.getByTestId("userName");
    const userpass = screen.getByTestId("password");
    await act(async () => {
      fireEvent.change(useremail, { target: { value: "priyankathorat" } });
      fireEvent.change(userpass, { target: { value: "blacky" } });
    });

    const submit = screen.getByTestId("btn_Login");
    await act(async () => {
      fireEvent.click(submit);
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId("loginDoneTick")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} Should fail if trimming logic is missing`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          ...mockUser,
          username: "priyankathorat",
          password: "blacky",
        },
      });
    });

    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    const useremail = screen.getByTestId("userName") as HTMLInputElement;
    const userpass = screen.getByTestId("password") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(useremail, {
        target: { value: "   priyankathorat   " },
      });
      fireEvent.change(userpass, { target: { value: "   blacky   " } });
    });

    const submit = screen.getByTestId("btn_Login");
    await act(async () => {
      fireEvent.click(submit);
    });

    expect(useremail.value).toBe("priyankathorat");
    expect(userpass.value).toBe("blacky");
  });

  it(`${getTestCaseNumber()} Should reset password fields after unsuccessful login`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          ...mockUser,
          username: "priyankathorat",
          password: "blacky",
        },
      });
    });

    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    const useremail = screen.getByTestId("userName") as HTMLInputElement;
    const userpass = screen.getByTestId("password") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(useremail, {
        target: { value: "priyankathorat" },
      });
      fireEvent.change(userpass, { target: { value: "blacky123" } });
    });

    const submit = screen.getByTestId("btn_Login");
    await act(async () => {
      fireEvent.click(submit);
    });

    expect(useremail.value).toBe("priyankathorat");
    expect(userpass.value).toBe("");
  });

  it(`${getTestCaseNumber()} should password visible after clicking on verify button`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            ...mockUser,
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
    const useremail = screen.getByTestId("userName");
    const userpass = screen.getByTestId("password");
    await act(async () => {
      fireEvent.change(useremail, { target: { value: "priyankathorat" } });
      fireEvent.change(userpass, { target: { value: "blacky" } });
    });
    expect(userpass).toHaveAttribute("type", "password");

    act(() => {
      fireEvent.click(screen.getByTestId("verify"));
    });
    expect(userpass).toHaveAttribute("type", "text");

    act(() => {
      fireEvent.click(screen.getByTestId("verify"));
    });
    expect(userpass).toHaveAttribute("type", "password");
  });

  it(`${getTestCaseNumber()} should show message'Incorrect email or password' when email is correct but password is incorrect`, async () => {
    vi.clearAllMocks();
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            ...mockUser,
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
    const useremail = screen.getByTestId("userName");
    const userpass = screen.getByTestId("password");
    await act(async () => {
      fireEvent.change(useremail, { target: { value: "priyankathorat" } });
      fireEvent.change(userpass, { target: { value: "1234567" } });
    });

    const submit = screen.getByTestId("btn_Login");
    await act(async () => {
      fireEvent.click(submit);
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText("Incorrect email or password")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should unable to fetch users information`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.reject({});
    });
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const useremail = screen.getByTestId("userName");
    const userpass = screen.getByTestId("password");
    await act(async () => {
      fireEvent.change(useremail, { target: { value: "priyankathorat" } });
      fireEvent.change(userpass, { target: { value: "blacky" } });
    });
    const submit = screen.getByTestId("btn_Login");
    expect(screen.getByText("Login")).toBeTruthy();
    await act(async () => {
      fireEvent.click(submit);
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText("Incorrect email or password")).toBeTruthy();
  });

  it(`${getTestCaseNumber()} should reset password and username when axios rejects`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.reject({});
    });
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const useremail = screen.getByTestId("userName") as HTMLInputElement;
    const userpass = screen.getByTestId("password") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(useremail, { target: { value: "priyankathorat" } });
      fireEvent.change(userpass, { target: { value: "blacky" } });
    });
    const submit = screen.getByTestId("btn_Login");
    expect(screen.getByText("Login")).toBeTruthy();
    await act(async () => {
      fireEvent.click(submit);
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText("Incorrect email or password")).toBeTruthy();
    expect(useremail.value).toBe("");
    expect(userpass.value).toBe("");
  });
});
