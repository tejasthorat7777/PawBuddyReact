import { useSelector } from "react-redux";
import LeftMenu from "./Template/LeftMenu";
import { RootState } from "../redux/store/store";
import BusinessLeftMenu from "../business/component/BusinessLeftMenu";

const Left = () => {
  const user = useSelector((state: RootState) => state.finalState.user);
  const accountType = user.acc_type;
  return (
    <>{accountType === "Business" ? <BusinessLeftMenu /> : <LeftMenu />}</>
  );
};
export default Left;
