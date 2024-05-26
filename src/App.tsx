import { useState } from "react";
import "./App.css";
import LeftMenu from "./Componet/LeftMenu/LeftMenu";
import Navbar from "./Componet/Navbar/Navbar";
import Registration from "./Componet/Registration/Registration";
import { Waiting } from "./Lottie/lottieComponent/Waiting";
import { commonStyleDiv } from "./commonFiles/common";
import Right from "./Componet/Right/Right";
import { PageType } from "./commonFiles/commonTypes";

function App() {
  const [regi, setRegi] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [page, setPage] = useState<PageType>("dashboard");

  const handleImageClick = () => {
    setIsVisible(false);

    setTimeout(() => {
      setRegi(true);
      setIsVisible(true);
    }, 2000);
  };

  const handlePage = (pageName: PageType) => {
    setPage(pageName);
  };

  return (
    <>
      {isVisible ? (
        regi ? (
          <Registration />
        ) : (
          <>
            <Navbar
              onImageClick={handleImageClick}
              onPage={(componentName: PageType) => {
                handlePage(componentName);
              }}
            />
            <Right page={page} />
            <LeftMenu />
          </>
        )
      ) : (
        <div style={commonStyleDiv}>
          <Waiting />
          To Registration
        </div>
      )}
    </>
  );
}

export default App;
