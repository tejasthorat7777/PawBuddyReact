import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import page_routing from "./page_routing"

const DynamicPage = ({page}) => {

  const newPage = [];
  page_routing.map((ObjectPage, i) => {
    if (ObjectPage.url === page) {
      newPage.push(ObjectPage);
    }
  });
  return (
    <div id="dynamic_page" className="container-fluid h-100">
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          {newPage.map((objRoute, i) => (
            <Route
              exact 
              path={objRoute.url}
              key={i}
              element={<objRoute.component_name />}
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};

export default DynamicPage;
