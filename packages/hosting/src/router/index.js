import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminLayout, PublicLayout } from "../components/layout";
import { PrivateRoute } from "./PrivateRoute";
import * as A from "../pages";
import { Page404 } from "../pages/404";

export const Router = () => {
  return (
    <Routes>
      {/*// Public routes*/}
      <Route
        exact
        path="/login"
        element={
          <PublicLayout>
            <A.LoginIntegration />
          </PublicLayout>
        }
      />
      <Route
        exact
        path="/register"
        element={<div>Aqui la pagina para el registro del usuario</div>}
      />

      {/*// Private routes*/}
      <Route path="/" element={<PrivateRoute />}>
        <Route
          exact
          path=""
          element={
            <AdminLayout>
              <A.HomeIntegration />
            </AdminLayout>
          }
        />
        <Route
          exact
          path="profile"
          element={<AdminLayout>Aqui va el perfil del usuario</AdminLayout>}
        />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
