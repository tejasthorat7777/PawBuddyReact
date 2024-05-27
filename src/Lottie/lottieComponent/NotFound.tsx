import Lottie from "react-lottie-player";
import notFound from "../lottieJson/fotNound.json"

export const NotFound = () => {
  return (
    <div>
      <Lottie
        loop
        animationData={notFound}
        play
        style={{ width: 300, height: 300 }}
      />
      <pre>
            Something Went Wrong... <br /> please try again
          </pre>
    </div>
  );
};
