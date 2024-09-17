import NavBarCust from "./Template/NavbarCust";
import BusinessNavbar from "../business/component/BusinessNavBar";
import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state: RootState) => state?.user);
  const accountType = user.acc_type;
  return (
    <>{accountType === "Business" ? <BusinessNavbar /> : <NavBarCust />}</>
  );
};
export default NavBar;
