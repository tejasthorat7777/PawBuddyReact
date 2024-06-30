import Lottie from "react-lottie-player";
import doneTick from "../lottieJson/doneTick.json";

export const DoneTick = () => {
  return (
    <Lottie
      data-testid="donetick"
      loop
      animationData={doneTick}
      play
      style={{ width: 300, height: 300 }}
    />
  );
};
