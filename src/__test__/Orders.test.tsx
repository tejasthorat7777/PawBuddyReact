import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Orders from "../Componet/Account/Orders";
import Wrapper from "../setupTest/Wrapper";
import {
  mockAxiosGet,
  mockCompress,
  mockDecompress,
  mockStorageGetItem,
  mockUser,
} from "../__mocks__/globalMock";
import { generateRandomOrderId, getDate } from "../commonFiles/commonFunctions";

vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(),
  };
});

const mockItemWishlist = [
  {
    prodId: "1",
    prodName: "Harness",
    prodImg: "image 1",
    prodPrice: "759",
    selected: false,
    customerName: "Arun Thorat",
    orderId: generateRandomOrderId(),
    orderDate: getDate(),
    prodDiscrip:
      "This is a very long product description that should be truncated with an ellipsis after three lines. This text will simulate a long description for testing purposes.",
  },
];

let testCaseNumber = 0;
const getTestCaseNumber = () => {
  testCaseNumber = testCaseNumber + 1;
  return `TC:${testCaseNumber}`;
};

mockStorageGetItem.mockImplementation((key) => {
  if (key === "cachedOrders") {
    return false;
  }
});

describe("Orders", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(`${getTestCaseNumber()} should display circular progress bar`, async () => {
    mockAxiosGet.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should display Please login , when user is not logged in`, async () => {
    render(
      <Wrapper>
        <Orders />
      </Wrapper>
    );
    expect(screen.getByTestId("loginRequired")).toBeInTheDocument();
    expect(screen.getByText("Please Login")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should display fetchemptyCart lottie when axios rejects`, async () => {
    mockAxiosGet.mockRejectedValue({});

    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );
    await waitFor(async () => {
      expect(screen.getByTestId("fetchErrorEmptyCart")).toBeInTheDocument();
      expect(
        screen.getByText("Sorry We are unable to get your Items")
      ).toBeInTheDocument();
    });
  });

  it(`${getTestCaseNumber()} should display order details`, async () => {
    mockAxiosGet.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });

    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );

    await waitFor(async () => {
      expect(screen.getByTestId("orderDetail_1")).toBeInTheDocument();
      expect(screen.getByTestId("invoice_1")).toBeInTheDocument();
      expect(screen.getByTestId("image_1")).toBeInTheDocument();
      expect(screen.getByTestId("button_Buy Again")).toBeInTheDocument();
      expect(screen.getByTestId("button_Track Package")).toBeInTheDocument();
      expect(
        screen.getByTestId("button_Write Product Review")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("button_Return or Replace")
      ).toBeInTheDocument();

      expect(screen.getByText(/Order Placed/i)).toBeInTheDocument();
      expect(screen.getByText(/Total/i)).toBeInTheDocument();
      expect(screen.getByText(/Ship To/i)).toBeInTheDocument();
      expect(screen.getByText(/Order #/i)).toBeInTheDocument();
      expect(screen.getByText(/View order details/i)).toBeInTheDocument();
      expect(screen.getByText(/Invoice/i)).toBeInTheDocument();
      expect(screen.getByText(/Buy Again/i)).toBeInTheDocument();
      expect(screen.getByText(/Track Package/i)).toBeInTheDocument();
      expect(screen.getByText(/Write Product Review/i)).toBeInTheDocument();
      expect(screen.getByText(/Return or Replace/i)).toBeInTheDocument();
    });
  });

  it(`${getTestCaseNumber()} should display product details in Orders`, async () => {
    mockAxiosGet.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });

    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );

    await waitFor(() => {
      const date = screen.getByTestId(`value_${mockItemWishlist[0].orderDate}`);
      expect(date).toBeInTheDocument();
      expect(date).toHaveTextContent(mockItemWishlist[0].orderDate);

      const price = screen.getByTestId(
        `value_${mockItemWishlist[0].prodPrice}`
      );
      expect(price).toBeInTheDocument();
      expect(price).toHaveTextContent(mockItemWishlist[0].prodPrice);

      const custName = screen.getByTestId(
        `value_${mockItemWishlist[0].customerName}`
      );
      expect(custName).toBeInTheDocument();
      expect(custName).toHaveTextContent(mockItemWishlist[0].customerName);

      const orderId = screen.getByTestId(
        `orderId_${mockItemWishlist[0].orderId}`
      );
      expect(orderId).toBeInTheDocument();
      expect(orderId).toHaveTextContent(mockItemWishlist[0].orderId);

      const image = screen.getByTestId(`image_${mockItemWishlist[0].prodId}`);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", mockItemWishlist[0].prodImg);

      const prodDisc = screen.getByTestId(
        `prodDisc_${mockItemWishlist[0].prodId}`
      );
      expect(prodDisc).toBeInTheDocument();
      expect(prodDisc).toHaveTextContent(mockItemWishlist[0].prodDiscrip);
    });
  });

  it(`${getTestCaseNumber()} should display No Date Found when date is undefined`, async () => {
    const dateUndefined = [
      {
        prodId: "1",
        prodName: "Harness",
        prodImg: "image 1",
        prodPrice: "759",
        selected: false,
        customerName: "Arun Thorat",
        orderId: generateRandomOrderId(),
        orderDate: undefined,
        prodDiscrip:
          "This is a very long product description that should be truncated with an ellipsis after three lines. This text will simulate a long description for testing purposes.",
      },
    ];

    mockAxiosGet.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          items: dateUndefined,
        },
      });
    });

    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );

    await waitFor(() => {
      const date = screen.getByTestId(`value_${dateUndefined[0].orderDate}`);
      expect(date).toBeInTheDocument();
      expect(date).toHaveTextContent("No Date Found");
    });
  });

  it(`${getTestCaseNumber()} should display PawBuddy User when CustomerName is undefined`, async () => {
    const dateUndefined = [
      {
        prodId: "1",
        prodName: "Harness",
        prodImg: "image 1",
        prodPrice: "759",
        selected: false,
        customerName: undefined,
        orderId: generateRandomOrderId(),
        orderDate: getDate(),
        prodDiscrip:
          "This is a very long product description that should be truncated with an ellipsis after three lines. This text will simulate a long description for testing purposes.",
      },
    ];

    mockAxiosGet.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          items: dateUndefined,
        },
      });
    });

    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );

    await waitFor(() => {
      const date = screen.getByTestId(`value_${dateUndefined[0].customerName}`);
      expect(date).toBeInTheDocument();
      expect(date).toHaveTextContent("PawBuddy User");
    });
  });

  it(`${getTestCaseNumber()} should display PawBuddy User when CustomerName is empty`, async () => {
    const dateUndefined = [
      {
        prodId: "1",
        prodName: "Harness",
        prodImg: "image 1",
        prodPrice: "759",
        selected: false,
        customerName: "",
        orderId: generateRandomOrderId(),
        orderDate: getDate(),
        prodDiscrip:
          "This is a very long product description that should be truncated with an ellipsis after three lines. This text will simulate a long description for testing purposes.",
      },
    ];

    mockAxiosGet.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          items: dateUndefined,
        },
      });
    });

    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );

    await waitFor(() => {
      const date = screen.getByTestId(`value_`);
      expect(date).toBeInTheDocument();
      expect(date).toHaveTextContent("PawBuddy User");
    });
  });

  it(`${getTestCaseNumber()} should display Number User when orderId is empty`, async () => {
    const orderEmpty = [
      {
        prodId: "1",
        prodName: "Harness",
        prodImg: "image 1",
        prodPrice: "759",
        selected: false,
        customerName: "Arun Thorat",
        orderId: "",
        orderDate: getDate(),
        prodDiscrip:
          "This is a very long product description that should be truncated with an ellipsis after three lines. This text will simulate a long description for testing purposes.",
      },
    ];

    mockAxiosGet.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          items: orderEmpty,
        },
      });
    });

    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );

    await waitFor(() => {
      const orderId = screen.getByTestId(`orderId_`);
      expect(orderId).toBeInTheDocument();
      expect(orderId).toHaveTextContent("Number");
    });
  });

  it(`${getTestCaseNumber()} should display Number User when orderId is undefined`, async () => {
    const orderEmpty = [
      {
        prodId: "1",
        prodName: "Harness",
        prodImg: "image 1",
        prodPrice: "759",
        selected: false,
        customerName: "Arun Thorat",
        orderId: undefined,
        orderDate: getDate(),
        prodDiscrip:
          "This is a very long product description that should be truncated with an ellipsis after three lines. This text will simulate a long description for testing purposes.",
      },
    ];

    mockAxiosGet.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          items: orderEmpty,
        },
      });
    });

    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );

    await waitFor(() => {
      const orderId = screen.getByTestId(`orderId_${orderEmpty[0].orderId}`);
      expect(orderId).toBeInTheDocument();
      expect(orderId).toHaveTextContent("Number");
    });
  });

  it(`${getTestCaseNumber()} should display You Don't have any Order yet when User has not placed any order`, async () => {
    mockAxiosGet.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          items: [],
        },
      });
    });

    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );
    await waitFor(async () => {
      expect(screen.getByTestId("emptyOrders")).toBeInTheDocument();
      expect(
        screen.getByText("You Don't have any Order yet")
      ).toBeInTheDocument();
    });
  });

  it(`${getTestCaseNumber()} should background color of button change on hover`, async () => {
    mockAxiosGet.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          items: mockItemWishlist,
        },
      });
    });

    const buttonsText = [
      "Buy Again",
      "Track Package",
      "Write Product Review",
      "Return or Replace",
    ];

    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );
    await waitFor(async () => {
      const button1 = screen.getByTestId(`button_${buttonsText[0]}`);
      const button2 = screen.getByTestId(`button_${buttonsText[1]}`);
      const button3 = screen.getByTestId(`button_${buttonsText[2]}`);
      const button4 = screen.getByTestId(`button_${buttonsText[3]}`);

      expect(button1).toBeInTheDocument();
      expect(button2).toBeInTheDocument();
      expect(button3).toBeInTheDocument();
      expect(button4).toBeInTheDocument();

      // assertion on styling on button entering mouse
      act(() => {
        fireEvent.mouseEnter(button1);
        const computedStyle = window.getComputedStyle(button1);
        const mouseEnterCSS = computedStyle.backgroundColor;
        expect(button1).toHaveStyle({
          backgroundColor: mouseEnterCSS,
        });
      });

      // assertion on styling on button leaving mouse
      act(() => {
        fireEvent.mouseLeave(button1);
        const computedStyle = window.getComputedStyle(button1);
        const mouseLeaveCSSAddtoCart = computedStyle.backgroundColor;
        expect(button1).toHaveStyle({
          backgroundColor: mouseLeaveCSSAddtoCart,
        });
      });
    });
  });

  it(`${getTestCaseNumber()} should display product details in Orders from cache`, async () => {
    mockDecompress.mockImplementation(() => {
      return JSON.stringify(mockItemWishlist);
    });

    mockStorageGetItem.mockImplementation((key) => {
      if (key === "cachedOrders") {
        return JSON.stringify(mockItemWishlist);
      }
    });

    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123456" },
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Orders />
      </Wrapper>
    );

    await waitFor(() => {
      const date = screen.getByTestId(`value_${mockItemWishlist[0].orderDate}`);
      expect(date).toBeInTheDocument();
      expect(date).toHaveTextContent(mockItemWishlist[0].orderDate);

      const price = screen.getByTestId(
        `value_${mockItemWishlist[0].prodPrice}`
      );
      expect(price).toBeInTheDocument();
      expect(price).toHaveTextContent(mockItemWishlist[0].prodPrice);

      const custName = screen.getByTestId(
        `value_${mockItemWishlist[0].customerName}`
      );
      expect(custName).toBeInTheDocument();
      expect(custName).toHaveTextContent(mockItemWishlist[0].customerName);

      const orderId = screen.getByTestId(
        `orderId_${mockItemWishlist[0].orderId}`
      );
      expect(orderId).toBeInTheDocument();
      expect(orderId).toHaveTextContent(mockItemWishlist[0].orderId);

      const image = screen.getByTestId(`image_${mockItemWishlist[0].prodId}`);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", mockItemWishlist[0].prodImg);

      const prodDisc = screen.getByTestId(
        `prodDisc_${mockItemWishlist[0].prodId}`
      );
      expect(prodDisc).toBeInTheDocument();
      expect(prodDisc).toHaveTextContent(mockItemWishlist[0].prodDiscrip);
    });
  });
});
