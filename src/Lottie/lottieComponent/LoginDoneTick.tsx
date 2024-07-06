import Lottie from "react-lottie-player";
import loginDoneTick from "../lottieJson/loginDoneTick.json";

export const LoginDoneTick = () => {
  return (
    <Lottie
      loop
      animationData={loginDoneTick}
      play
      style={{ width: 300, height: 300 }}
    />
  );
};
