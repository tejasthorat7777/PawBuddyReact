import { act, fireEvent, render, screen } from "@testing-library/react";
import Wrapper from "../setupTest/Wrapper";
import { mockAxiosGet, mockAxiosPost } from "../__mocks__/globalMock";
import { State, UserData } from "../commonFiles/commonTypes";
import Cart from "../Componet/pages/Cart";
import { apiUrl, getDate } from "../commonFiles/commonFunctions";

vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(),
  };
});

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

describe("CartList", () => {
  vi.useFakeTimers();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(`${getTestCaseNumber()} should display Sorry We are unable to get your Items, when DB rejects`, async () => {
    mockAxiosGet.mockRejectedValue({});
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Cart />
      </Wrapper>
    );
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(
      screen.getByText("Sorry We are unable to get your Items")
    ).toBeInTheDocument();
    expect(screen.getByTestId("fetchErrorEmptyCart")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should display Your Cart is Empty, when no product is added to Cart`, async () => {
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
        <Cart />
      </Wrapper>
    );
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText("Your Cart is Empty")).toBeInTheDocument();
    expect(screen.getByTestId("emptyCart")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} Should display the loading spinner (CircularProgress) while the Cart data is being fetched`, async () => {
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
        <Cart />
      </Wrapper>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should item get removed from cart after order is placed`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123", name: "tejas" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Cart />
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

    await act(async () => {
      fireEvent.click(screen.getByTestId("orderBtn_1"));
    });
    expect(mockAxiosPost).toHaveBeenCalledWith(`${apiUrl}/cart/remove`, {
      customerId: "123",
      prodId: "1",
    });
  });

  it(`${getTestCaseNumber()} should display Please Login when user is not logged in`, async () => {
    const mockInitialState: State = {
      status: false,
      user: mockUser,
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Cart />
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
        <Cart />
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

  it(`${getTestCaseNumber()} should remove product from Cart, when clickd on Remove button`, async () => {
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
        <Cart />
      </Wrapper>
    );
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    act(() => {
      fireEvent.click(screen.getByTestId("remove_2"));
    });

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockAxiosPost).toBeCalledWith("http://localhost:3000/cart/remove", {
      customerId: "123",
      prodId: "2",
    });
    expect(screen.getByTestId("product_1")).toBeInTheDocument();
    expect(screen.queryByTestId("product_2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("emptyCart")).not.toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should display Your Cart is Empty, when products are removed from Cart`, async () => {
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
        <Cart />
      </Wrapper>
    );
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("remove_1"));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId("remove_2"));
    });

    expect(mockAxiosPost).toBeCalledWith("http://localhost:3000/cart/remove", {
      customerId: "123",
      prodId: "2",
    });
    expect(screen.queryByTestId("product_2")).not.toBeInTheDocument();
    expect(screen.getByTestId("emptyCart")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should not remove product from Cart, when axios get rejected for removal`, async () => {
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
        <Cart />
      </Wrapper>
    );
    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("remove_2"));
    });
    expect(
      screen.getByText("Error updating wishlist. Please try again later.")
    ).toBeInTheDocument();
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
        <Cart />
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

  it(`${getTestCaseNumber()} should placed order by click on button`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123", name: "tejas" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Cart />
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

    await act(async () => {
      fireEvent.click(screen.getByTestId("orderBtn_1"));
    });
    const customerName = "tejas";
    const orderDate = getDate();
    const orderId = expect.any(String);
    const customerId = "123";

    const newItm = {
      customerId,
      customerName,
      orderDate,
      orderId,
      prodId: "1",
      prodName: "Harness",
      prodImg: "image 1",
      prodPrice: "759",
      selected: false,
      prodDiscrip:
        "This is a very long product description that should be truncated with an ellipsis after three lines. This text will simulate a long description for testing purposes.",
    };

    expect(mockAxiosPost).toHaveBeenCalledWith(
      `${apiUrl}/orders/dumped`,
      newItm
    );
  });

  it(`${getTestCaseNumber()} should substract quantity on cart by clicking - button`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123", name: "tejas" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Cart />
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

    const quant = screen.getByTestId("value_1");
    expect(quant).toHaveValue("1");

    const add = screen.getByTestId("add_1");
    await act(async () => {
      fireEvent.click(add);
    });

    await act(async () => {
      fireEvent.click(add);
    });

    expect(quant).toHaveValue("3");

    const substract = screen.getByTestId("delete_1");
    await act(async () => {
      fireEvent.click(substract);
    });

    expect(quant).toHaveValue("2");
  });

  it(`${getTestCaseNumber()} should add quantity on cart by clicking + button`, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123", name: "tejas" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Cart />
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

    const quant = screen.getByTestId("value_1");
    expect(quant).toHaveValue("1");

    const add = screen.getByTestId("add_1");
    await act(async () => {
      fireEvent.click(add);
    });

    expect(quant).toHaveValue("2");
  });

  it(`${getTestCaseNumber()} should display toast msg You must have 1 Item when user click - button and quant is 1 `, async () => {
    mockAxiosGet.mockImplementation(async () => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123", name: "tejas" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Cart />
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

    const quant = screen.getByTestId("value_1");
    expect(quant).toHaveValue("1");

    const substract = screen.getByTestId("delete_1");
    await act(async () => {
      fireEvent.click(substract);
    });

    expect(screen.getByText("You must have 1 Item")).toBeInTheDocument();
    expect(quant).toHaveValue("1");
  });
});
