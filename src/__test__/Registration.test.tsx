import Registration from "../Componet/Registration/Registration";
import { mockAxiosPost } from "../__mocks__/globalMock";
import Wrapper from "../setupTest/Wrapper";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(() => ""),
  };
});

vi.useFakeTimers();

const sendData = (femaleRadio?: string) => {
  const name = screen.getByTestId("name") as HTMLInputElement;
  fireEvent.change(name, {
    target: { value: "Pettey" },
  });

  const age = screen.getByTestId("age") as HTMLInputElement;
  fireEvent.change(age, {
    target: { value: "3" },
  });

  const breed = screen.getByTestId("breed") as HTMLInputElement;
  fireEvent.change(breed, {
    target: { value: "Indie" },
  });

  const birthDate = screen.getByTestId("birthdate") as HTMLInputElement;
  fireEvent.change(birthDate, {
    target: { value: "2024-07-04" },
  });

  const owner = screen.getByTestId("owner") as HTMLInputElement;
  fireEvent.change(owner, {
    target: { value: "Tejas Thorat" },
  });

  const identity = screen.getByTestId("identity") as HTMLInputElement;
  fireEvent.change(identity, {
    target: { value: "white and orange fur" },
  });

  const username = screen.getByTestId("username") as HTMLInputElement;
  fireEvent.change(username, {
    target: { value: "tejasthorat7777" },
  });

  const password = screen.getByTestId("password") as HTMLInputElement;
  fireEvent.change(password, {
    target: { value: "Pettey@7777" },
  });

  const female = screen.getByTestId("female") as HTMLInputElement;
  const male = screen.getByTestId("male") as HTMLInputElement;

  femaleRadio ? fireEvent.click(female) : fireEvent.click(male);
};

describe("Registration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("TC:1 Registration form should be visible", async () => {
    render(
      <Wrapper>
        <Registration />
      </Wrapper>
    );
    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Breed")).toBeInTheDocument();
    expect(screen.getByText("Birthdate")).toBeInTheDocument();
    expect(screen.getByText("Owner")).toBeInTheDocument();
    expect(screen.getByText("Identification")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Gender :")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText("Account Type")).toBeInTheDocument();
    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
  });

  it("TC:2 given input should reflect on dom", async () => {
    render(
      <Wrapper>
        <Registration />
      </Wrapper>
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    act(() => {
      fireEvent.change(screen.getByTestId("name"), {
        target: { value: "Pettey" },
      });
    });
    const nameInput = screen.getByTestId("name") as HTMLInputElement;
    expect(nameInput.value).toBe("Pettey");

    expect(screen.getByText("Age")).toBeInTheDocument();
    act(() => {
      fireEvent.change(screen.getByTestId("age"), {
        target: { value: "3" },
      });
    });
    const ageInput = screen.getByTestId("age") as HTMLInputElement;
    expect(ageInput.value).toBe("3");
  });

  it("TC:3 click on Submit button filled data should dump in db", async () => {
    render(
      <Wrapper>
        <Registration />
      </Wrapper>
    );

    await act(async () => {
      sendData("female");
    });

    await act(async () => {
      fireEvent.mouseDown(screen.getByRole("combobox"));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId("acc_typeBusiness"));
    });
    await act(async () => {
      fireEvent.click(screen.getByText("SUBMIT"));
    });

    expect(mockAxiosPost).toHaveBeenCalledWith(
      "http://localhost:3000/api/sendUsersInfo",
      {
        acc_type: "Business",
        name: "Pettey",
        age: "3",
        birthdate: "2024-07-04",
        breed: "Indie",
        owner: "Tejas Thorat",
        identification: "white and orange fur",
        username: "tejasthorat7777",
        password: "Pettey@7777",
        gender: "female",
        userId: expect.any(String),
      }
    );
  });

  it("TC:4 should display Registration Successful on submitting information to db is successful", async () => {
    render(
      <Wrapper>
        <Registration />
      </Wrapper>
    );
    await act(async () => {
      sendData();
      fireEvent.click(screen.getByText("SUBMIT"));
    });

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("Registration Successful")).toBeInTheDocument();
  });

  it("TC:6 should display loader when click submit button", async () => {
    mockAxiosPost.mockImplementation(async () => {
      return new Promise((resolve) => setTimeout(() => resolve({}), 3000));
    });
    render(
      <Wrapper>
        <Registration />
      </Wrapper>
    );

    await act(async () => {
      sendData();
      fireEvent.click(screen.getByText("SUBMIT"));
    });

    expect(screen.getByText("Relax... Saving Your Data")).toBeInTheDocument();
    expect(screen.getByTestId("waiting")).toBeInTheDocument();
  });

  it("TC:7 should display not found on submitting information to db is Unsuccessful", async () => {
    mockAxiosPost.mockRejectedValue({});
    render(
      <Wrapper>
        <Registration />
      </Wrapper>
    );
    await act(async () => {
      sendData();
      fireEvent.click(screen.getByText("SUBMIT"));
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId("notfound")).toBeInTheDocument();
  });
});
