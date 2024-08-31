import Lottie from "react-lottie-player";
import badRequest from "../lottieJson/bad-request.json";

export const BadRequest = () => {
  return (
    <Lottie
      data-testid="badrequest"
      loop
      animationData={badRequest}
      play
      style={{ width: 300, height: 300 }}
    />
  );
};
