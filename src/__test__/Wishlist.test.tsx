import Wishlist from "../Componet/Account/Wishlist";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Wrapper from "../setupTest/Wrapper";
import { mockAxiosGet, mockAxiosPost } from "../__mocks__/globalMock";
import { State, UserData } from "../commonFiles/commonTypes";

vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(),
  };
});

vi.useFakeTimers();

const mockUser: UserData = {
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

const mockItemWishlist = [
  {
    prodId: "1",
    prodName: "Harness",
    prodImg: "image 1",
    prodPrice: "759",
    selected: false,
    prodDiscrip:
      "This is a very long product description that should be truncated with an ellipsis after three lines. This text will simulate a long description for testing purposes.",
  },
  {
    prodId: "2",
    prodName: "Collar",
    prodImg: "image 2",
    prodPrice: "259",
    selected: false,
    prodDescip: "",
  },
];
let testCaseNumber = 0;

const getTestCaseNumber = () => {
  testCaseNumber = testCaseNumber + 1;
  return `TC:${testCaseNumber}`;
};

describe("WishList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it(`${getTestCaseNumber()} should display Sorry We are unable to get your wishlist, when DB rejects`, async () => {
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

  it(`${getTestCaseNumber()} should display You Don't have any favourite item, when no product is added to wishlist`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          items: [],
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
      screen.getByText("You Don't have any favourite item")
    ).toBeInTheDocument();
    expect(screen.getByTestId("emptyCart")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} Should display the loading spinner (CircularProgress) while the wishlist data is being fetched`, async () => {
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
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should display Please Login when user is not logged in`, async () => {
    const mockInitialState: State = {
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

  it(`${getTestCaseNumber()} should display Product, if present in database`, async () => {
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
      screen.getByTestId(`product_${mockItemWishlist[0].prodId}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`product_${mockItemWishlist[1].prodId}`)
    ).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} styling of button should change on hover`, async () => {
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

    const addtoCart = screen.getByTestId("addToCart1");
    const buyNow = screen.getByTestId("buyNow1");

    // assertion on styling on add to cart button entering mouse
    act(() => {
      fireEvent.mouseEnter(addtoCart);
      const computedStyle = window.getComputedStyle(addtoCart);
      const mouseEnterCSSAddtoCart = computedStyle.backgroundColor;
      expect(addtoCart).toHaveStyle({
        backgroundColor: mouseEnterCSSAddtoCart,
      });
    });

    // assertion on styling on add to cart button leaving mouse
    act(() => {
      fireEvent.mouseLeave(addtoCart);
      const computedStyle = window.getComputedStyle(addtoCart);
      const mouseLeaveCSSAddtoCart = computedStyle.backgroundColor;
      expect(addtoCart).toHaveStyle({
        backgroundColor: mouseLeaveCSSAddtoCart,
      });
    });

    // assertion on styling on buyNow button entering mouse
    act(() => {
      fireEvent.mouseEnter(buyNow);
      const computedStyle = window.getComputedStyle(buyNow);
      const mouseEnterCSSBuyNow = computedStyle.backgroundColor;
      expect(buyNow).toHaveStyle({
        backgroundColor: mouseEnterCSSBuyNow,
      });
    });

    // assertion on styling on buyNow button leaving mouse
    act(() => {
      fireEvent.mouseLeave(buyNow);
      const computedStyle = window.getComputedStyle(buyNow);
      const mouseLeaveCSSBuyNow = computedStyle.backgroundColor;
      expect(buyNow).toHaveStyle({
        backgroundColor: mouseLeaveCSSBuyNow,
      });
    });
  });

  it(`${getTestCaseNumber()} should remove product from wishlist, when clickd of X mark`, async () => {
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
        prodId: "2",
      }
    );
    expect(screen.getByTestId("product_1")).toBeInTheDocument();
    expect(screen.queryByTestId("product_2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("emptyCart")).not.toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should display You Don't have any favourite item, when products are removed from wishlist`, async () => {
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

    await act(async () => {
      fireEvent.click(screen.getByTestId("Xbutton_1"));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId("Xbutton_2"));
    });

    expect(mockAxiosPost).toBeCalledWith(
      "http://localhost:3000/wishlist/remove",
      {
        customerId: "123",
        prodId: "2",
      }
    );
    expect(screen.queryByTestId("product_2")).not.toBeInTheDocument();
    expect(screen.getByTestId("emptyCart")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should not remove product from wishlist, when axios get rejected for removal`, async () => {
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

  it(`${getTestCaseNumber()} should correctly display the product image inside the CardMedia component for each product`, async () => {
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
    const productImage1 = screen.getByAltText("Product Image 1");
    expect(productImage1).toBeInTheDocument();
    expect(productImage1).toHaveAttribute("src", "image 1");

    const productImage2 = screen.getByAltText("Product Image 2");
    expect(productImage2).toBeInTheDocument();
    expect(productImage2).toHaveAttribute("src", "image 2");
  });

  it(`${getTestCaseNumber()} should truncate long product descriptions with an ellipsis after three lines`, async () => {
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
    const productDescription = screen.getByText(
      /This is a very long product description/i
    );
    expect(productDescription).toBeInTheDocument();
    expect(screen.getByTestId("prodDiscipt_1")).toHaveStyle({
      "font-size": "14px",
      overflow: "hidden",
      display: "-webkit-box",
      "-webkit-line-clamp": "3",
      "max-width": "100%",
      "text-overflow": "ellipsis",
    });
  });
});
