import { ProfileType } from "../../commonFiles/commonTypes";
import { Profile } from "../Account/Profile";

const Right = ({ page }: { page: ProfileType }) => {
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
        padding: ".75rem",
        width: "83vw",
        marginLeft: "17vw",
      }}
    >
      {renderComponent()}
    </div>
  );
};

export default Right;
