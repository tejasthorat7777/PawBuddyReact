import Wishlist from "../Componet/pages/Wishlist";
import { render, screen } from "@testing-library/react";
import Wrapper from "../setupTest/Wrapper";

vi.mock("react-lottie-player", () => {
  return {
    default: vi.fn(() => ""),
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
  city: "",
  password: "",
};

const mcokItemWishlist = [
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
  it("should display Please Login when user is not logged in", async () => {
    const mockInitialState = {
      status: false,
      user: mockUser,
      itemWishlist: mcokItemWishlist,
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Wishlist />
      </Wrapper>
    );
    expect(screen.getByText("Please Login")).toBeInTheDocument();
  });

  it("should display Your Cart Is Empty when no product is added to wishlist", async () => {
    const mockInitialState = {
      status: true,
      user: { ...mockUser, userId: "123" },
      itemWishlist: [],
    };
    render(
      <Wrapper initialState={mockInitialState}>
        <Wishlist />
      </Wrapper>
    );
    expect(screen.getByText("Your Cart Is Empty")).toBeInTheDocument();
  });
});
