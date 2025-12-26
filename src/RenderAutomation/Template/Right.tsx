import DynamicPage from "../../RenderAutomation/DynamicPage";

const Right = () => {
  return (
    <div
      className="right-content-container"
      style={{
        position: "absolute",
        marginTop: "8vh",
        height: "92vh",
        width: "calc(100% - 17vw)",
        marginLeft: "17vw",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <DynamicPage />
    </div>
  );
};

export default Right;
