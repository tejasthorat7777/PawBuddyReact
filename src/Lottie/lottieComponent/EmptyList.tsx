import Lottie from "react-lottie-player";
import emptylist from "../lottieJson/emptyList.json";

export const EmptyList = () => {
  return (
    <div data-testid="emptylist" id="emptylist">
      <Lottie
        loop
        animationData={emptylist}
        play
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};
