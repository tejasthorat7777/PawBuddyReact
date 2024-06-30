import Registration from "../Componet/Registration/Registration";
import Wrapper from "../setupTest/Wrapper";
import { act, fireEvent, render, screen } from "@testing-library/react";

vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(() => "mocked-lottie-player"),
  };
});

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
});
