import Login from "./header/login";
import { Routes, Route, Link } from "react-router-dom";
import { Suspense } from "react";
import RouteLink from "./routes.jsx";

function App() {
  return (
    <>
      <Suspense fallback={<div>Đang tải...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          {RouteLink.map((route, index) => (
            <Route 
              key={index} 
              path={route.path} 
              element={route.element} 
            />
          ))}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
