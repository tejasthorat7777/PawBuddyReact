// import AppBusiness from "../../business/component/AppBusiness";
import AppBusiness from "../../business/component/AppBusiness";
import DynamicPage from "../../RenderAutomation/DynamicPage";

const Right = () => {
  return (
    <div
      style={{
        position: "absolute",
        marginTop: "8vh",
        height: "92vh",
        width: "83vw",
        marginLeft: "17vw",
      }}
    >
      {/* <AppBusiness/> */}
      <DynamicPage />
    </div>
  );
};

export default Right;
