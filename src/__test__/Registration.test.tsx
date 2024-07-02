import userEvent from "@testing-library/user-event";
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
    default: vi.fn(() => "mocked-lottie-player"),
  };
});

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

describe("Registration", () => {
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
    expect(screen.getByText("City")).toBeInTheDocument();
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
    expect(screen.getByTestId("name").value).toBe("Pettey");

    expect(screen.getByText("Age")).toBeInTheDocument();
    act(() => {
      fireEvent.change(screen.getByTestId("age"), {
        target: { value: "3" },
      });
    });
    expect(screen.getByTestId("age").value).toBe("3");
  });


  // we need to write for city, for now it is not able to click or change
  it("click on Submit button filled data should dump in db", async () => {
    render(
      <Wrapper>
        <Registration />
      </Wrapper>
    );

    await act(async () => {
      fireEvent.change(screen.getByTestId("name"), {
        target: { value: "Pettey" },
      });
      fireEvent.change(screen.getByTestId("age"), {
        target: { value: "3" },
      });
      fireEvent.change(screen.getByTestId("breed"), {
        target: { value: "Indie" },
      });
      fireEvent.change(screen.getByTestId("birthdate"), {
        target: { value: "2024-07-04" },
      });
      fireEvent.change(screen.getByTestId("owner"), {
        target: { value: "Tejas Thorat" },
      });
      fireEvent.change(screen.getByTestId("identity"), {
        target: { value: "white and orange fur" },
      });
      fireEvent.change(screen.getByTestId("username"), {
        target: { value: "tejasthorat7777" },
      });
      fireEvent.change(screen.getByTestId("password"), {
        target: { value: "Pettey@7777" },
      });
      fireEvent.click(screen.getByTestId("female"));
      fireEvent.click(screen.getByTestId("city"));
      fireEvent.change(screen.getByTestId("city"), { target: { value: 'Pune' } });
    });

    fireEvent.click(screen.getByText("SUBMIT"));

    expect(mockAxiosPost).toHaveBeenCalledWith(
      "http://localhost:3000/sendUsersInfo",
      {
        city: "",
        name: "Pettey",
        age: "3",
        birthdate: "2024-07-04",
        breed: "Indie",
        owner: "Tejas Thorat",
        identification: "white and orange fur",
        username: "tejasthorat7777",
        password: "Pettey@7777",
        gender: "female",
        userId: "Pettey&&2024-07-04",
      }
    );
  });
});
