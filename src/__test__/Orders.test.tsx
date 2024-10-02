import { render, screen, waitFor } from "@testing-library/react";
import Orders from "../Componet/Account/Orders";
import Wrapper from "../setupTest/Wrapper";
import { mockAxiosGet } from "../__mocks__/globalMock";
import { generateRandomOrderId, getDate } from "../commonFiles/commonFunctions";

vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(),
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

describe("Orders", () => {
  it(`${getTestCaseNumber()} should display Please login , when user is not logged in`, async () => {
    render(
      <Wrapper>
        <Orders />
      </Wrapper>
    );
    expect(screen.getByTestId("loginRequired")).toBeInTheDocument();
    expect(screen.getByText("Please Login")).toBeInTheDocument();
  });

  it(`${getTestCaseNumber()} should display fetchemptyCart lottie when axios rejects and should display circular progress bar`, async () => {
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
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByTestId("fetchErrorEmptyCart")).toBeInTheDocument();
      expect(
        screen.getByText("Sorry We are unable to get your Items")
      ).toBeInTheDocument();
    });
  });

  it(`${getTestCaseNumber()} should display order details`, async () => {
    mockAxiosGet.mockImplementation(async () => {
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
    mockAxiosGet.mockImplementation(async () => {
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

    const date = screen.getByTestId(`value_${mockItemWishlist[0].orderDate}`);
    expect(date).toBeInTheDocument();
    expect(date).toHaveTextContent(mockItemWishlist[0].orderDate);

    const price = screen.getByTestId(`value_${mockItemWishlist[0].prodPrice}`);
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
