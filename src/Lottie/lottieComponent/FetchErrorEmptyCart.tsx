import Lottie from "react-lottie-player";
import fetchErrorEmptyCart from "../lottieJson/fetchErrorEmptyCart.json";

export const FetchErrorEmptyCart = () => {
  return (
    <div data-testid="fetchErrorEmptyCart">
      <Lottie
        loop
        animationData={fetchErrorEmptyCart}
        play
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};
