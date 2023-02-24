import React from "react";
import Layout from "./root/layout/Layout";
import { Route, Routes } from "react-router-dom";
import paths from "./routes/paths";
import Login from "./features/Login";
import RequiredAuth from "./routes/RequiredAuth";
import Loader from "./components/Loader";
import ROUTES from "./routes";
import Register from "./features/Register";
import "./App.scss";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={paths.LOGIN} element={<Layout />}>
          <Route path={paths.LOGIN} element={<Login />} />
        </Route>
        <Route path={paths.REGISTER} element={<Layout />}>
          <Route path={paths.REGISTER} element={<Register />} />
        </Route>
        <Route element={<Layout />} path="/">
          <Route element={<RequiredAuth />}>
            <Route
              element={
                <React.Suspense fallback={<Loader />}>
                  <ROUTES.HOME.ELEMENT />
                </React.Suspense>
              }
              path={ROUTES.HOME.path}
            />
            <Route
              element={
                <React.Suspense fallback={<Loader />}>
                  <ROUTES.PROFILE.ELEMENT />
                </React.Suspense>
              }
              path={ROUTES.PROFILE.path}
            />
            <Route
              element={
                <React.Suspense fallback={<Loader />}>
                  <ROUTES.SETTINGS.ELEMENT />
                </React.Suspense>
              }
              path={ROUTES.SETTINGS.path}
            />
          </Route>
        </Route>
        <Route path="*" element={<Layout />}>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
