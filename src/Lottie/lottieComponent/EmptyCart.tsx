import Lottie from "react-lottie-player";
import emptyCart from "../lottieJson/emptyCart.json"

export const EmptyCart = () => {
  return (
    <Lottie
      loop
      animationData={emptyCart}
      play
      style={{ width: 300, height: 300 }}
    />
  );
};
