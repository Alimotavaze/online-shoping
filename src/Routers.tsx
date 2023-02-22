import { Contacts } from "@material-ui/icons";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "./App";
import Layout from "./Components/Layout";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import CheckOut from "./Pages/CheckOut";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import Profile, { Orders } from "./Pages/Profile";

type PrivateRouteType = {
  children: React.ReactNode;
};
const PrivateRoute = ({ children }: PrivateRouteType) => {
  const { userInfo } = useApp();
  if (userInfo?.id) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} replace />;
  }
};
export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/contacts" element={<Contacts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckOut />
              </PrivateRoute>
            }
          />
          <Route path="/profile">
            <Route
              index
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/profile/orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
