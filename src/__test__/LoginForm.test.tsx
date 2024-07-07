import LoginForm from "../Componet/Login/LoginForm";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Wrapper from "../setupTest/Wrapper";
import { mockAxiosGet } from "../__mocks__/globalMock";

vi.useFakeTimers();
vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(() => ""),
  };
});

vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(() => ""),
  };
});

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
  city: "",
  password: "",
};

const mcokItemWishlist = [
  {
    productId: "1",
    prouctName: "Harness",
    imageSource: "",
    price: "759",
    selected: false,
    description: "",
  },
  {
    productId: "2",
    prouctName: "Collar",
    imageSource: "",
    price: "259",
    selected: false,
    description: "",
  },
];

describe("Login Page", () => {
  it("TC:1 login box should be present", () => {
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
      itemWishlist: mcokItemWishlist,
    };
    render(
      <Wrapper initialState={mockInitialState}>
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
      itemWishlist: mcokItemWishlist,
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <LoginForm />
     </Wrapper>
    );
    const text = screen.getByText("Login Here");
    expect(text).toBeInTheDocument();
    const useremail = screen.getByTestId("username") as HTMLInputElement;
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

  it("TC:3 should display Incorrect email or password when incorrect password and email given", async () => {
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
      <Wrapper initialState={''}>
        <LoginForm />
      </Wrapper>
    );
    const useremail = screen.getByTestId("username");
    fireEvent.change(useremail, { target: { value: "test1s@example.com" } });
    const userpass = screen.getByTestId("password");
    fireEvent.change(userpass, { target: { value: "123456" } });

    const submit = screen.getByTestId("submitBtn");
    expect(submit).toBeInTheDocument();

    act(() => {
      fireEvent.click(submit);
      fireEvent.mouseEnter(submit);
      fireEvent.mouseLeave(submit);
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText("Incorrect email or password")).toBeInTheDocument();
  });

  it("TC:4 styling of submit button should change on hover", async () => {
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
    const mouseEnterCSS = {
      position: "absolute",
      "background-color": "rgb(0, 17, 28)",
      "font-family": "cursive",
      height: "8%",
      width: "25%",
      "border-radius": "10px",
    };
    const mouseLeaveCSS = {
      position: "absolute",
      "background-color": "rgb(89, 112, 129)",
      "font-family": "cursive",
      height: "8%",
      width: "25%",
      "border-radius": "10px",
    };

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

    act(() => {
      fireEvent.mouseEnter(submit);
      expect(submit.style._values).toEqual(mouseEnterCSS);
    });

    act(() => {
      fireEvent.mouseLeave(submit);
      expect(submit.style._values).toEqual(mouseLeaveCSS);
    });
  });

  it("TC:5 button should not get clicked when email and password is not provided", async () => {
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

    const useremail = screen.getByTestId("username") as HTMLInputElement;
    expect(useremail).toBeInTheDocument();
    fireEvent.change(useremail, { target: { value: "" } });
    expect(useremail.value).toBe("");

    const userpass = screen.getByTestId("password") as HTMLInputElement;
    expect(userpass).toBeInTheDocument();
    fireEvent.change(userpass, { target: { value: "" } });
    expect(userpass.value).toBe("");

    const submit = screen.getByTestId("submitBtn");
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);

    const progressBar = screen.queryByRole("progressbar");
    expect(progressBar).not.toBeInTheDocument();
  });

  it("TC:6 should show email required and password required in respective input box if user try to click login button without credentials", async () => {
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

    const useremail = screen.getByTestId("username") as HTMLInputElement;
    fireEvent.change(useremail, { target: { value: "" } });
    expect(useremail.value).toBe("");

    const userpass = screen.getByTestId("password") as HTMLInputElement;
    fireEvent.change(userpass, { target: { value: "" } });
    expect(userpass.value).toBe("");

    const submit = screen.getByTestId("submitBtn");
    expect(submit).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submit);
      fireEvent.mouseEnter(submit);
      fireEvent.mouseLeave(submit);
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(
      screen.getByPlaceholderText("* Username Required")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("* Password Required")
    ).toBeInTheDocument();
  });

  it("TC:7 should done tick appear when credentials are correct", async () => {
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
    const useremail = screen.getByTestId("username");
    const userpass = screen.getByTestId("password");
    await act(async () => {
      fireEvent.change(useremail, { target: { value: "priyankathorat" } });
      fireEvent.change(userpass, { target: { value: "blacky" } });
    });

    const submit = screen.getByTestId("submitBtn");
    await act(async () => {
      fireEvent.click(submit);
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId("loginDoneTick")).toBeInTheDocument();
  });

  it("TC:8 should password visible after clicking on verify button", async () => {
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
    const useremail = screen.getByTestId("username");
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
  it("TC:9 it should show message'Incorrect email or password' when email is correct but password is incorrect ", async () => {
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
    const useremail = screen.getByTestId("username");
    const userpass = screen.getByTestId("password");
    await act(async () => {
      fireEvent.change(useremail, { target: { value: "priyankathorat" } });
      fireEvent.change(userpass, { target: { value: "1234567" } });
    });

    const submit = screen.getByTestId("submitBtn");
    await act(async () => {
      fireEvent.click(submit);
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText("Incorrect email or password")).toBeInTheDocument();
  });
  it("TC:10 unable to fetch users information",()=>{
    mockAxiosGet.mockImplementation(async () => {
      return Promise.reject({})
    });
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
  })
 
});
