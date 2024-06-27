import Lottie from "react-lottie-player";
import loginRequired from "../lottieJson/LoginRequired.json";

export const LoginRequired = () => {
  return (
    <div>
      <Lottie
        loop
        animationData={loginRequired}
        play
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};
