import Wrapper from "../setupTest/Wrapper";
import Home from "../Componet/pages/Home";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import {
  mockAxiosPost,
  mockConsoleLog,
  mockShare,
} from "../__mocks__/globalMock";

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

describe("Home", () => {
  it("TC:1 should change icon when user click on add to wishlist button", async () => {
    const mockInitialState = {
      status: false,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Home />
      </Wrapper>
    );
    expect(
      screen.getByTestId("FavoriteBorderOutlinedIcon_5")
    ).toBeInTheDocument();
    expect(
      // here {} indicates that it has style as per MUI we have not given any style from our side
      screen.getByTestId("FavoriteBorderOutlinedIcon_5").style._values
    ).toEqual({});

    await act(async () => {
      fireEvent.click(screen.getByTestId("wishlist_5"));
    });

    expect(screen.getByTestId("FavoriteIcon_5")).toBeInTheDocument();
    expect(screen.getByTestId("FavoriteIcon_5").style._values).toEqual({
      color: "red",
    });
  });

  it("TC:2 should display only first 8 products", async () => {
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

  it("TC:3 should display other 8 products, when goes on 2nd page", async () => {
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );
    const paginationButton = screen.getByLabelText("Go to next page");
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

  it("TC:4 should display toast message, when user is not login and try to add product to wishlist", async () => {
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId("wishlist_5"));
    });

    expect(screen.getByText("Please Login...")).toBeInTheDocument();
  });

  it("TC:5 Product should add to wishlist, when user is logged in", async () => {
    const mockInitialState = {
      status: false,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Home />
      </Wrapper>
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId("wishlist_5"));
    });

    expect(screen.getByText("Item added to Wishlist")).toBeInTheDocument();
    expect(mockAxiosPost).toHaveBeenLastCalledWith(
      "http://localhost:3000/wishlist/dumped",
      {
        customerId: "123456",
        productId: "5",
        prouctName: "Tickfree",
        imageSource: "/src/assets/tickfree_shampoo_200ml_1.jpg",
        price: "759",
        selected: false,
        description: "",
      }
    );
  });

  it("TC:6 Product should removed from wishlist, when user click again on heart icon", async () => {
    const mockInitialState = {
      status: false,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Home />
      </Wrapper>
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId("wishlist_5"));
    });
    expect(screen.getByText("Item added to Wishlist")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByTestId("wishlist_5"));
    });
    expect(screen.getByText("Item removed from Wishlist")).toBeInTheDocument();
  });

  it("TC:7 should display unable to add in wishlist, when axios reject dumping of data", async () => {
    mockAxiosPost.mockRejectedValue({});
    const mockInitialState = {
      status: false,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Home />
      </Wrapper>
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId("wishlist_5"));
    });
    expect(screen.getByText("Unable to add in Wishlist")).toBeInTheDocument();
  });

  it("TC:8 should log Share successful when user hit share button", async () => {
    const mockInitialState = {
      status: false,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Home />
      </Wrapper>
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId("share_5"));
    });
    expect(mockConsoleLog).toHaveBeenCalledWith("Share successful");
  });

  it("TC:9 should log Error sharing and error and should display Sorry, Error in sharing, when user hit share button and error occured", async () => {
    mockShare.mockRejectedValue({});
    const mockInitialState = {
      status: false,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Home />
      </Wrapper>
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId("share_5"));
    });
    expect(mockConsoleLog).toHaveBeenCalledWith("Error sharing", {});
    expect(screen.getByText("Sorry, Error in sharing")).toBeInTheDocument();
  });
});
