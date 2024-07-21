import Wrapper from "../setupTest/Wrapper";
import Home from "../Componet/pages/Home";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Home", () => {
  it("TC:1 should display only first 8 products", async () => {
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );
    expect(screen.getByTestId("product_1")).toBeInTheDocument();
    expect(screen.getByTestId("product_2")).toBeInTheDocument();
    expect(screen.getByTestId("product_3")).toBeInTheDocument();
    expect(screen.getByTestId("product_4")).toBeInTheDocument();
    expect(screen.getByTestId("product_5")).toBeInTheDocument();
    expect(screen.getByTestId("product_6")).toBeInTheDocument();
    expect(screen.getByTestId("product_7")).toBeInTheDocument();
    expect(screen.getByTestId("product_8")).toBeInTheDocument();
    expect(screen.queryByTestId("product_9")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product_10")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product_11")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product_12")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product_13")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product_14")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product_15")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product_16")).not.toBeInTheDocument();
  });

  it("TC:2 should display other 8 products, when goes on 2nd page", async () => {
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );
    const paginationButton = screen.getByLabelText('Go to next page');
    fireEvent.click(paginationButton);
    await waitFor(() => {
        expect(screen.queryByTestId("product_1")).not.toBeInTheDocument();
        expect(screen.queryByTestId("product_2")).not.toBeInTheDocument();
        expect(screen.queryByTestId("product_3")).not.toBeInTheDocument();
        expect(screen.queryByTestId("product_4")).not.toBeInTheDocument();
        expect(screen.queryByTestId("product_5")).not.toBeInTheDocument();
        expect(screen.queryByTestId("product_6")).not.toBeInTheDocument();
        expect(screen.queryByTestId("product_7")).not.toBeInTheDocument();
        expect(screen.queryByTestId("product_8")).not.toBeInTheDocument();
        expect(screen.queryByTestId("product_9")).toBeInTheDocument();
        expect(screen.queryByTestId("product_10")).toBeInTheDocument();
        expect(screen.queryByTestId("product_11")).toBeInTheDocument();
        expect(screen.queryByTestId("product_12")).toBeInTheDocument();
        expect(screen.queryByTestId("product_13")).toBeInTheDocument();
        expect(screen.queryByTestId("product_14")).toBeInTheDocument();
        expect(screen.queryByTestId("product_15")).toBeInTheDocument();
        expect(screen.queryByTestId("product_16")).toBeInTheDocument();
    });
  });
});
