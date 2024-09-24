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
    default: vi.fn(),
  };
});

let testCaseNumber = 0;
const getTestCaseNumber = () => {
  testCaseNumber = testCaseNumber + 1;
  return `TC:${testCaseNumber}`;
};

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
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  it(`${getTestCaseNumber()} should display Sorry No Product Found when axios rejects`, async () => {
    mockAxiosGet.mockRejectedValue({});
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
    expect(screen.getByText(/Sorry No Product Found/i)).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} Product should add to wishlist, when user is logged in`, async () => {
    mockAxiosGet
      .mockImplementationOnce(() => {
        return {
          data: productsOut,
        };
      })
      .mockImplementation(() => {
        return {
          data: {
            customerId: "936819838169",
            items: items,
          },
        };
      });
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
      "http://localhost:3000/api/wishlist/dumped",
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

  it(`${getTestCaseNumber()} should change icon when user clicks on add to wishlist button`, async () => {
    mockAxiosGet.mockImplementation(() => {
      return {
        data: {
          customerId: "936819838169",
          items: items,
        },
      };
    });
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

  it(`${getTestCaseNumber()} Product should add to Cart, when user is logged in`, async () => {
    mockAxiosGet.mockImplementation(() => {
      return {
        data: {
          customerId: "936819838169",
          items: items,
        },
      };
    });
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

    const caartBtn = `cart_${productsOut[0].products[0].prodId}`;
    await act(async () => {
      fireEvent.click(screen.getByTestId(caartBtn));
    });

    expect(screen.getByText("Item added to Cart")).toBeInTheDocument();
    expect(mockAxiosPost).toHaveBeenLastCalledWith(
      "http://localhost:3000/api/cart/dumped",
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

  it(`${getTestCaseNumber()} Product should removed from wishlist, when user click again on heart icon`, async () => {
    mockAxiosGet.mockImplementation(() => {
      return {
        data: {
          customerId: "936819838169",
          items: items,
        },
      };
    });
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

  it(`${getTestCaseNumber()} Product should removed from Cart, when user click again on + icon`, async () => {
    mockAxiosGet.mockImplementation(() => {
      return {
        data: {
          customerId: "936819838169",
          items: items,
        },
      };
    });
    const mockInitialState = {
      status: false,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Home />
      </Wrapper>
    );
    const cartBtn = `cart_${productsOut[0].products[0].prodId}`;
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId(cartBtn));
    });
    expect(screen.getByText("Item added to Cart")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByTestId(cartBtn));
    });
    expect(screen.getByText("Item removed from Cart")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should display Error updating wishlist. Please try again later., when axios reject dumping of data`, async () => {
    mockAxiosGet.mockImplementation(() => {
      return {
        data: {
          customerId: "936819838169",
          items: items,
        },
      };
    });
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

  it(`${getTestCaseNumber()} should display Error updating Cart. Please try again later., when axios reject dumping of data`, async () => {
    mockAxiosGet.mockImplementation(() => {
      return {
        data: {
          customerId: "936819838169",
          items: items,
        },
      };
    });
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
    const cartBtn = `cart_${productsOut[0].products[0].prodId}`;
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId(cartBtn));
    });
    expect(
      screen.getByText("Error updating Cart. Please try again later.")
    ).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} share funtion should called when user hit share button`, async () => {
    mockAxiosGet.mockImplementation(() => {
      return {
        data: {
          customerId: "936819838169",
          items: items,
        },
      };
    });
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

  it(`${getTestCaseNumber()} should display Sorry, Error in sharing, when user hit share button and error occured`, async () => {
    mockAxiosGet.mockImplementation(() => {
      return {
        data: {
          customerId: "936819838169",
          items: items,
        },
      };
    });
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

  it(`${getTestCaseNumber()} should display only first 8 products`, async () => {
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

  it(`${getTestCaseNumber()} should display other 8 products, when goes on 2nd page`, async () => {
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

  it(`${getTestCaseNumber()} should display toast message, when user is not login and try to add product to wishlist`, async () => {
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

  it(`${getTestCaseNumber()} should display toast message, when user is not login and try to add product to Cart`, async () => {
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const cartBtn = `cart_${productsOut[0].products[0].prodId}`;
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId(cartBtn));
    });
    expect(
      screen.getByText("Please log in to add items to your Cart.")
    ).toBeInTheDocument();
  });
});
