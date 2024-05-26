import { PageType } from "../../commonFiles/commonTypes";
import { Profile } from "../Account/Profile";

const Right = ({ page }: { page: PageType }) => {
  const renderComponent = () => {
    switch (page) {
      case "profile":
        return <Profile />;
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        height: "92vh",
        padding: "1.5rem",
        width: "83vw",
        marginLeft: "17vw",
      }}
    >
      {renderComponent()}
    </div>
  );
};

export default Right;
