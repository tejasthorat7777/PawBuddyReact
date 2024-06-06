import { ProfileType } from "../../commonFiles/commonTypes";
import { Profile } from "../Account/Profile";
import { Home } from "./pages/Home";

const Right = ({ page }: { page: ProfileType }) => {

  console.log("rightpgae>>>",page)
  const renderComponent = () => {
    switch (page) {
      case "/profile":
        return <Profile />;
      case "/":
        return <Home />;
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        height: "92vh",
        width: "83vw",
        marginLeft: "17vw",
      }}
    >
      {renderComponent()}
    </div>
  );
};

export default Right;

// {/* <Col id="content" style={{flex: "0.8 2 2"}} className="m-0 p-0 overflowY-auto scrollAnimation">
//         {/* Main Content -- */}
//           //<DynamicPage />
//         {/* End of Main Content -- */}
//       //</Col> */}