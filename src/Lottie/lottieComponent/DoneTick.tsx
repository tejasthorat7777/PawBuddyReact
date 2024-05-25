import Lottie from "react-lottie-player";
import doneTick from "../lottieJson/doneTick.json";

export const DoneTick = () => {
  return (
    <div>
      <Lottie
        loop
        animationData={doneTick}
        play
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};
