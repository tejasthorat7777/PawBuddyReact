import Wishlist from "../Componet/pages/Wishlist";
import { act, render, screen } from "@testing-library/react";
import Wrapper from "../setupTest/Wrapper";
import { mockAxiosGet } from "../__mocks__/globalMock";

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

  it("TC:2 should display Your Cart Is Empty when no product is added to wishlist", async () => {
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
  });

  it("TC:3 should display Product if present in database", async () => {
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
    await act(async() => {
      vi.advanceTimersByTime(3000);
    });
    await act(async() => {
      vi.advanceTimersByTime(3000);
    });
    
    expect(screen.getByTestId(`productId_${mockItemWishlist[0].productId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`productId_${mockItemWishlist[1].productId}`)).toBeInTheDocument();

  });
});
