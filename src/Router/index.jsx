import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Login";
import NewsPage from "../Pages/News";
import UsersPage from "../Pages/User";
import UserPage from "../Pages/UserPage";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/user/:id" element={<UserPage />} />
    </Routes>
  );
}

export default Router;
