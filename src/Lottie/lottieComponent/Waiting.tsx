import Lottie from "react-lottie-player";
import waiting from "../../Lottie/lottieJson/waiting.json";

export const Waiting = () => {
  return (
    <Lottie
      data-testid="waiting"
      loop
      animationData={waiting}
      play
      style={{ width: 300, height: 300 }}
    />
  );
};
