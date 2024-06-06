
import { useState } from "react";
import "./App.css";
import { ProfileType } from "./commonFiles/commonTypes.js";
import Registration from "./Componet/Registration/Registration.js";
import Navbar from "./Componet/Navbar/Navbar.js";
import LeftMenu from "./Componet/LeftMenu/LeftMenu.js";
import Right from "./Componet/Right/Right.js";
import { commonStyleDiv } from "./commonFiles/commonTheme.js";
import { Waiting } from "./Lottie/lottieComponent/Waiting.js";

function App() {

  // return(
  //   <BrowserRouter>
  //     <Template/>
  //   </BrowserRouter>
  // )
  const [regi, setRegi] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [page, setPage] = useState<ProfileType>("/");

  const handleImageClick = () => {
    setIsVisible(false);

    setTimeout(() => {
      setRegi(true);
      setIsVisible(true);
    }, 2000);
  };

  const handlePage = (pageName: ProfileType) => {
    setPage(pageName);
  };

  console.log("page>>>>", page);
  return (
    <>
      {isVisible ? (
        regi ? (
          <Registration />
        ) : (
          <>
            <Navbar
              onImageClick={handleImageClick}
              onPage={(componentName: ProfileType) => {
                handlePage(componentName);
              }}
            />
            <Right page={page} />
            <LeftMenu
              onPage={(componentName: ProfileType) => {
                handlePage(componentName);
              }}
            />
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
