import Left from "./Left";
import Navbar from "./Template/Navbar";
import Right from "./Template/Right";


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
