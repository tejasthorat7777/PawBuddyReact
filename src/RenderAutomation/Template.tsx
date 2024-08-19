import Left from "./Left";
import NavBar from "./NavBar";
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
      <NavBar />
      <Left />
      <Right />
    </main>
  );
};
export default Template;
