import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/ForRoute/RequireAuth.js";
import RouterUnauthorized from "./pages/Error/RouterUnauthorized.js";
import PersistLogin from "./components/ForRoute/PersistLogin.js";
//Login Page
import Login from "./pages/login/Login.js";
//Profile Page
import Profile from "./pages/Profile/Profile.js";
//Error Page
import RouterError from "./pages/Error/RouterError.js";
//Shopper Page
import Homepage from "./pages/Shopper/Homepage/Homepage.js";
import CategoryPage from "./pages/Shopper/CategoryPage/CategoryPage.js";
import ShopPage from "./pages/Shopper/ShopPage/ShopPage.js";
import ProductPage from "./pages/Shopper/ProductPage/ProductPage.js";

function Router() {
  return (
    <Routes>
      {/*Login */}
      <Route path="/login" element={<Login />} />
      <Route path="/profile/" element={<Profile />} />
      {/*Secured Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={["shopper"]} />}>
          {/*Shop */}
          <Route path="/" element={<Homepage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/shop/:shopID" element={<ShopPage />} />
          <Route path="/product/:productID" element={<ProductPage />} />
        </Route>
      </Route>

      {/*Display Unauthorized page  */}
      <Route path="/unauthorized" element={<RouterUnauthorized />} />
      {/*Display Error page if route does not exist */}
      <Route path="*" element={<RouterError />} />
    </Routes>
  );
}

export default Router;
