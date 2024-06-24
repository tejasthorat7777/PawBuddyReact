import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import userSlice from "../redux/Slice/loginSlice";
import { Provider } from "react-redux";
import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const store = configureStore({
    reducer: {
      userData: userSlice,
    },
  });
  return (
    <MemoryRouter>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
};
export default Wrapper;
