import Lottie from "react-lottie-player";
import emptyOrders from "../lottieJson/emptyOrders.json";

export const EmptyOrders = () => {
  return (
    <div data-testid="emptyOrders" id="emptyOrders">
      <Lottie
        loop
        animationData={emptyOrders}
        play
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};
