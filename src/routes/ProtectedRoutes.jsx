import { useEffect } from "react";
import { Outlet } from "react-router";
import { Login } from "../pages/Index";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const ProtectedRoutes = () => {
  const auth = useSelector((state) => state.auth);
  const needRealoadPage = JSON.parse(localStorage.getItem("needRealoadPage"));
  const { pathname } = useLocation();
  const exceptions = ["share"];

  useEffect(() => {
    if (needRealoadPage) {
      localStorage.setItem("needRealoadPage", false);
      window.location = "/";
    }
  }, [needRealoadPage]);

  return auth.isAuthenticated ? <MainLayout><Outlet /></MainLayout> : exceptions.some((exception) => pathname.includes(exception)) ? <Outlet /> : <Login />;
  // return auth.isAuthenticated ? <MainLayout><Outlet /></MainLayout> : <Login />;
};

export default ProtectedRoutes;
