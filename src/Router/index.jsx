import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Login";
import MetaTags from "../Pages/MetaTags";
import NewNews from "../Pages/NewNews";
import NewsPage from "../Pages/News";
import NewsOnePage from "../Pages/NewsOnePage";
import UsersPage from "../Pages/User";
import UserPage from "../Pages/UserPage";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<UsersPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/user/:id" element={<UserPage />} />
      <Route path="/news/:id" element={<NewsOnePage />} />
      <Route path="/newNews" element={<NewNews />} />
      <Route path='/metaTags' element={<MetaTags/>} />
    </Routes>
  );
}

export default Router;
