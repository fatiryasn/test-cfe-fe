import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import Sidebar from "./components/sidebar/Sidebar";
import AdminSidebar from "./components/sidebar/AdminSidebar"
import Footer from "./components/Footer";
import CashierNavbar from "./components/sidebar/CashierNavbar";

import ProtectedRoute from "./ProtectedRoute";
import "./css/app.css"

import Register from "./common/auth/Register";
import Login from "./common/auth/Login";
import Home from "./common/Home";
import Menu from "./common/Menu";
import Order from "./common/Order";
import Reservation from "./common/Reservation";
import Loyalty from "./common/loyalty/Loyalty";
import Feedback from "./common/Feedback";

import AdminHome from "./admin/dashboard/AdminHome";
import MenuAdmin from "./admin/products/MenuAdmin";
import ReservationAdmin from "./admin/reservations/ReservationAdmin";
import OrderAdmin from "./admin/orders/OrderAdmin";
import UserAdmin from "./admin/users/UserAdmin";
import TableAdmin from "./admin/tables/TableAdmin";
import CommentAdmin from "./admin/comments/CommentAdmin";
import DiscountAdmin from "./admin/discounts/DiscountAdmin";

import Cashier from "./cashier/Cashier";
import OrdHistory from "./cashier/OrdHistory";
import PaymentResult from "./common/PaymentResult";
import CasReservation from "./cashier/CasReservation";

function App() {
  const location = useLocation();
  const hideSidebar = ["/login", "/register", "/payment-result"];

  const renderSidebar = () => {
    if (hideSidebar.includes(location.pathname)) {
      return null; 
    }
    if (location.pathname.startsWith("/admin")) {
      return <AdminSidebar />;
    }
    if(location.pathname.startsWith("/cashier")){
      return <CashierNavbar />
    }
    return <Sidebar />;
  };

  const renderFooter = () => {
    if (hideSidebar.includes(location.pathname)) {
      return null;
    }
    if (location.pathname == "/cashier") {
      return "";
    }
    if( location.pathname === "/cashier/reservation" || location.pathname === "/cashier/history"){
      return <Footer from={"cashier"} />
    }
    if (location.pathname.startsWith("/payment-result")) {
      return <Footer from={"cashier"} />;
    }
    return <Footer from={""} />;
  };

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://cafemdn-api.vercel.app/"

  return (
    <>
      {renderSidebar()}
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="/loyalty" element={<Loyalty />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/menu" element={<MenuAdmin />} />
          <Route path="/admin/order" element={<OrderAdmin />} />
          <Route path="/admin/discount" element={<DiscountAdmin />} />
          <Route path="/admin/reservation" element={<ReservationAdmin />} />
          <Route path="/admin/user" element={<UserAdmin />} />
          <Route path="/admin/table" element={<TableAdmin />} />
          <Route path="/admin/comment" element={<CommentAdmin />} />
        </Route>

        <Route element={<ProtectedRoute requiredRole="cashier" />}>
          <Route path="/cashier" element={<Cashier />} />
          <Route path="/cashier/history" element={<OrdHistory />} />
          <Route path="/cashier/reservation" element={<CasReservation />} />
        </Route>
      </Routes>
      {renderFooter()}
    </>
  );
}

export default App;