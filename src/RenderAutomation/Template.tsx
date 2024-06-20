import Right from "../Componet/Right/Right";
import Left from "../RenderAutomation/Left";
import Navbar from "../Componet/Navbar/Navbar";

const Template = () => {
  return (
    <main
      style={{
        flex: 1,
        height: "calc(var(--vh, 1vh) * 100)",
        overflow: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Left />
      <Right />
    </main>
  );
};
export default Template;
