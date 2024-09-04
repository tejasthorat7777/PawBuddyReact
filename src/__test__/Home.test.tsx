import Wrapper from "../setupTest/Wrapper";
import Home from "../Componet/pages/Home";
import { fireEvent, render, screen, act } from "@testing-library/react";
import {
  mockAxiosGet,
  mockAxiosPost,
  mockShare,
  rgbStringToHex,
} from "../__mocks__/globalMock";

vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(() => {
      return <div data-testid="loginlottie"></div>;
    }),
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
  acc_type: "",
  password: "",
};

const dummpProducts = [];

for (let i = 1; i <= 16; i++) {
  const result = {
    prodId: `${i}`,
    prodName: "Pedegree",
    prodDiscrip: "nutrients",
    prodPrice: "100",
    pordQuant: "1",
    prodDiscount: "2",
    prodBrand: "Balaji",
    prodWeight: "100",
    prodConditon: "new",
    prodImg: "",
    selected: false,
    rating: 0,
    category: "Dog Food",
    subCategory: "Treat",
  };
  dummpProducts.push(result);
}

const productsOut = [
  {
    products: dummpProducts,
  },
];

const items = [
  {
    prodDiscrip: "Unitest State of America",
    prodId: "Od3nbwBFilvi",
    prodImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgA",
    prodName: "american cheese",
    prodPrice: "123",
    selected: false,
  },
];

describe("Home", () => {
  vi.useFakeTimers();
  beforeEach(() => {
    mockAxiosGet
      .mockImplementationOnce(async () => {
        return {
          data: productsOut,
        };
      })
      .mockImplementation(async () => {
        return {
          data: {
            customerId: "936819838169",
            items: items,
          },
        };
      });
  });
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });
  it("TC:1 should change icon when user clicks on add to wishlist button", async () => {
    const mockInitialState = {
      status: false,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Home />
      </Wrapper>
    );

    const FavoriteBorderOutlinedIcon = `FavoriteBorderOutlinedIcon_${productsOut[0].products[0].prodId}`;
    const FavoriteIcon = `FavoriteIcon_${productsOut[0].products[0].prodId}`;
    const wishilistBtn = `wishlist_${productsOut[0].products[0].prodId}`;

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByTestId(FavoriteBorderOutlinedIcon)).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByTestId(wishilistBtn));
    });

    expect(screen.getByTestId(FavoriteIcon)).toBeInTheDocument();

    // checking icon color after clicked
    const favoriteIconElement = screen.getByTestId(FavoriteIcon);
    const computedStyle = window.getComputedStyle(favoriteIconElement);
    const backClr = rgbStringToHex(computedStyle.color);
    expect(screen.getByTestId(FavoriteIcon)).toHaveStyle({
      color: backClr,
    });
  });

  it("TC:2 should display only first 8 products", async () => {
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
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
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    const paginationButton = screen.getByLabelText("Go to next page");
    await act(async () => {
      fireEvent.click(paginationButton);
    });
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

  it("TC:4 should display toast message, when user is not login and try to add product to wishlist", async () => {
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const wishilistBtn = `wishlist_${productsOut[0].products[0].prodId}`;
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId(wishilistBtn));
    });
    expect(
      screen.getByText("Please log in to add items to your wishlist.")
    ).toBeInTheDocument();
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
    const wishilistBtn = `wishlist_${productsOut[0].products[0].prodId}`;
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId(wishilistBtn));
    });

    expect(screen.getByText("Item added to Wishlist")).toBeInTheDocument();
    expect(mockAxiosPost).toHaveBeenLastCalledWith(
      "http://localhost:3000/wishlist/dumped",
      {
        prodId: "1",
        category: "Dog Food",
        customerId: "123456",
        prodName: "Pedegree",
        prodDiscrip: "nutrients",
        prodPrice: "100",
        pordQuant: "1",
        prodDiscount: "2",
        prodBrand: "Balaji",
        prodWeight: "100",
        prodConditon: "new",
        prodImg: "",
        selected: false,
        rating: 0,
        subCategory: "Treat",
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
    const wishilistBtn = `wishlist_${productsOut[0].products[0].prodId}`;
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId(wishilistBtn));
    });
    expect(screen.getByText("Item added to Wishlist")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByTestId(wishilistBtn));
    });
    expect(screen.getByText("Item removed from Wishlist")).toBeInTheDocument();
  });

  it("TC:7 should display  Error updating wishlist. Please try again later., when axios reject dumping of data", async () => {
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
    const wishilistBtn = `wishlist_${productsOut[0].products[0].prodId}`;
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId(wishilistBtn));
    });
    expect(
      screen.getByText("Error updating wishlist. Please try again later.")
    ).toBeInTheDocument();
  });

  it("TC:8 share funtion should called when user hit share button", async () => {
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
      vi.advanceTimersByTime(5000);
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId("share_1"));
    });
    expect(mockShare).toHaveBeenCalled();
  });

  it("TC:9 should display Sorry, Error in sharing, when user hit share button and error occured", async () => {
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
      vi.advanceTimersByTime(5000);
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId("share_1"));
    });
    expect(screen.getByText("Sorry, Error in sharing")).toBeInTheDocument();
  });
});
