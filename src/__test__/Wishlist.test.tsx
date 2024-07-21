import Wishlist from "../Componet/pages/Wishlist";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Wrapper from "../setupTest/Wrapper";
import { mockAxiosGet, mockAxiosPost } from "../__mocks__/globalMock";

vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(),
  };
});

vi.useFakeTimers();

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

const mockItemWishlist = [
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

describe("WishList", () => {
  it("TC:1 should display Please Login when user is not logged in", async () => {
    const mockInitialState = {
      status: false,
      user: mockUser,
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Wishlist />
      </Wrapper>
    );
    expect(screen.getByText("Please Login")).toBeInTheDocument();
    expect(screen.getByTestId("loginRequired")).toBeInTheDocument();
  });

  it("TC:2 should display Your Cart Is Empty, when no product is added to wishlist", async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: [],
      });
    });
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Wishlist />
      </Wrapper>
    );
    expect(screen.getByText("Your Cart Is Empty")).toBeInTheDocument();
    expect(screen.getByTestId("emptyCart")).toBeInTheDocument();
  });

  it("TC:3 should display Product, if present in database", async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Wishlist />
      </Wrapper>
    );
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(
      screen.getByTestId(`product_${mockItemWishlist[0].productId}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`product_${mockItemWishlist[1].productId}`)
    ).toBeInTheDocument();
  });

  it("TC:4 should display Sorry We are unable to get your wishlist, when DB rejects", async () => {
    mockAxiosGet.mockRejectedValue({});
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Wishlist />
      </Wrapper>
    );
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(
      screen.getByText("Sorry We are unable to get your wishlist")
    ).toBeInTheDocument();
    expect(screen.getByTestId("fetchErrorEmptyCart")).toBeInTheDocument();
  });

  it("TC:5 styling of button should change on hover", async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123" },
    };

    const mouseEnterCSSAddtoCart = {
      "background-color": "rgb(255, 190, 11)",
      color: "white",
      "font-size": "12px",
    };
    const mouseLeaveCSSAddtoCart = {
      "background-color": "rgb(232, 93, 4)",
      color: "white",
      "font-size": "12px",
    };

    const mouseEnterCSSBuyNow = {
      "background-color": "rgb(255, 190, 11)",
      color: "white",
      "font-size": "12px",
      "margin-left": "3rem",
    };
    const mouseLeaveCSSBuyNow = {
      "background-color": "rgb(232, 93, 4)",
      color: "white",
      "font-size": "12px",
      "margin-left": "3rem",
    };

    render(
      <Wrapper initialState={mockInitialState}>
        <Wishlist />
      </Wrapper>
    );

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    const addtoCart = screen.getByTestId("addToCart1");
    const buyNow = screen.getByTestId("buyNow1");

    act(() => {
      fireEvent.mouseEnter(addtoCart);
      expect(addtoCart.style._values).toEqual(mouseEnterCSSAddtoCart);
    });
    act(() => {
      fireEvent.mouseLeave(addtoCart);
      expect(addtoCart.style._values).toEqual(mouseLeaveCSSAddtoCart);
    });

    act(() => {
      fireEvent.mouseEnter(buyNow);
      expect(buyNow.style._values).toEqual(mouseEnterCSSBuyNow);
    });
    act(() => {
      fireEvent.mouseLeave(buyNow);
      expect(buyNow.style._values).toEqual(mouseLeaveCSSBuyNow);
    });
  });

  it("TC:6 should remove product from wishlist, when clickd of X mark", async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Wishlist />
      </Wrapper>
    );
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    act(() => {
      fireEvent.click(screen.getByTestId("Xbutton_2"));
    });

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockAxiosPost).toBeCalledWith(
      "http://localhost:3000/wishlist/remove",
      {
        customerId: "123",
        productId: "2",
      }
    );
    expect(screen.queryByTestId("product_2")).not.toBeInTheDocument();
  });

  it("TC:7 should not remove product from wishlist, when axios get rejected for removal", async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });
    mockAxiosPost.mockRejectedValue({});
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Wishlist />
      </Wrapper>
    );
    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(screen.getByTestId("Xbutton_2"));
    });
    expect(screen.getByTestId("toast")).toBeInTheDocument();
  });
});
