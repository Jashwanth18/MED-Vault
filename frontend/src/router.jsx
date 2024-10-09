import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import InventoryLogPage from "./pages/InventoryLogPage";
import MedicinesPage from "./pages/MedicinesPage";
import MedicineDetailsPage from "./pages/MedicineDetailsPage";
import EditMedicinePage from "./pages/EditMedicinePage";
import MedicineLayout from "../layouts/MedicineLayout";
import AddMedicinePage from "./pages/AddMedicinePage";
import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthLayout>
        <HomePage />
      </AuthLayout>
    ),
    children: [
      {
        path: "home",
        element: (
          <AuthLayout>
            <MedicinesPage />
          </AuthLayout>
        ),
      },
      {
        path: "inventory-log",
        element: (
          <AuthLayout>
            <InventoryLogPage />
          </AuthLayout>
        ),
      },
      {
        path: "new-med",
        element: (
          <AuthLayout isAdminRoute={true}>
            <AddMedicinePage />
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/medicines",
    element: (
      <AuthLayout>
        <MedicineLayout />
      </AuthLayout>
    ),
    children: [
      {
        path: ":medId",
        element: (
          <AuthLayout>
            <MedicineDetailsPage />
          </AuthLayout>
        ),
      },
      {
        path: ":medId/edit",
        element: (
          <AuthLayout isAdminRoute={true}>
            <EditMedicinePage />
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <ErrorPage type={"not-found"} redirectRoute={"/home"}></ErrorPage>,
  },
]);

export default router;
