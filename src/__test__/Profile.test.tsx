import Wrapper from "../setupTest/Wrapper";
import Profile from "../Componet/Account/Profile";
import { render } from "@testing-library/react";
vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(),
  };
});

const mockUser = {
  age: "3",
  birthdate: "2022-01-26",
  breed: "Indie",
  acc_type: "Customer",
  gender: "female",
  identification: "Orange Fur",
  name: "Pettey",
  owner: "Tejas Thorat",
  password: "Pettey@7777",
  userId: "Pettey&&2022-01-26",
  username: "tejasthorat7777",
};

const mockState = {
  status: false,
  user: mockUser,
};

describe("Profile page", () => {
  it("TC:1 it should show all details when user login sucessfully", () => {
    const profilePage = render(
      <Wrapper initialState={mockState}>
        <Profile />
      </Wrapper>
    );
    expect(profilePage.getByText("*You cannot edit this fields")).toBeTruthy();
    expect(profilePage.getByText("Name")).toBeTruthy();
    expect(profilePage.getByText("Pettey")).toBeTruthy();
    expect(profilePage.getByText("Age")).toBeTruthy();
    expect(profilePage.getByText("3")).toBeTruthy();
    expect(profilePage.getByText("Breed")).toBeTruthy();
    expect(profilePage.getByText("Indie")).toBeTruthy();
    expect(profilePage.getByText("Birthdate")).toBeTruthy();
    expect(profilePage.getByText("Indie")).toBeTruthy();
    expect(profilePage.getByText("2022-01-26")).toBeTruthy();
    expect(profilePage.getByText("Identification")).toBeTruthy();
    expect(profilePage.getByText("Orange Fur")).toBeTruthy();
    expect(profilePage.getByText("Tejas Thorat")).toBeTruthy();
    expect(profilePage.getByText("Username")).toBeTruthy();
    expect(profilePage.getByText("tejasthorat7777")).toBeTruthy();
    expect(profilePage.getByText("Password")).toBeTruthy();
    expect(profilePage.getByText("Pettey@7777")).toBeTruthy();
    expect(profilePage.getByText("Gender")).toBeTruthy();
    expect(profilePage.getByText("female")).toBeTruthy();
    expect(profilePage.getByText("Account Type")).toBeTruthy();
    expect(profilePage.getByText("Customer")).toBeTruthy();
  });
  it("TC:2 it should ask for login", () => {
    const invalidLogin = {
      status: false,
      user: {
        ...mockUser,
        userId: "",
      },
    };
    const profilePage = render(
      <Wrapper initialState={invalidLogin}>
        <Profile />
      </Wrapper>
    );
    expect(profilePage.getByText("Please Login")).toBeTruthy();
    // a lottie animation is displayed on screen
    expect(profilePage.getByTestId("loginRequired")).toBeTruthy();
  });
});
