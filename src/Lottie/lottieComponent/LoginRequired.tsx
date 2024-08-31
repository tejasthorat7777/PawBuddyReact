import Lottie from "react-lottie-player";
import loginRequired from "../lottieJson/LoginRequired.json";

export const LoginRequired = () => {
  return (
    <div data-testid="loginRequired" id="loginRequired">
      <Lottie
        loop
        animationData={loginRequired}
        play
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};
