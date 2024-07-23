import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import page_routing from "./page_routing";
import MuiBackdrop from "../commonFiles/MuiBackdrop";

const DynamicPage = () => {
  return (
    <div
      id="dynamic_page"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Suspense
        fallback={
          <MuiBackdrop
            isLoading={true}
            iconStyle={{
              width: "3%",
              height: "5%",
              position: "absolute",
              top: "46%",
              left: "48%",
            }}
          />
        }
      >
        <Routes>
          {page_routing.map((objRoute, index) => (
            <Route
              path={objRoute.url}
              key={index}
              element={<objRoute.component_name />}
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};

export default DynamicPage;
