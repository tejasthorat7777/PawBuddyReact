import LoginForm from "../Componet/Login/LoginForm";
import { render, screen } from "@testing-library/react";
import Wrapper from "../setupTest/Wrapper";

describe("Login Page", () => {
  it("Email present", () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );
    const text = screen.getByText("Login Here");
    expect(text).toBeInTheDocument();
  });
});
