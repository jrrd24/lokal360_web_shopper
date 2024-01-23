import { Route, Routes, useLocation } from "react-router-dom";
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
import Cart from "./pages/Shopper/Cart/Cart.js";
import Checkout from "./pages/Shopper/Checkout/Checkout.js";
import MyAddresses from "./pages/ShopperTools/MyAddresses/MyAddresses.js";
import MyOrders from "./pages/ShopperTools/MyOrders/MyOrders.js";
import SearchResult from "./pages/Shopper/SearchResult/SearchResult.js";
import Register from "./pages/Register/Register.js";
import { useLayoutEffect } from "react";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function Router() {
  return (
    <Wrapper>
      <Routes>
        {/*Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*Secured Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["shopper"]} />}>
            {/*Shop */}
            <Route path="/" element={<Homepage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/shop/:shopID" element={<ShopPage />} />
            <Route path="/product/:productID" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/profile/my_addresses" element={<MyAddresses />} />
            <Route path="/profile/my_orders" element={<MyOrders />} />
            <Route path="/search/:query" exact element={<SearchResult />} />
          </Route>
        </Route>

        {/*Display Unauthorized page  */}
        <Route path="/unauthorized" element={<RouterUnauthorized />} />
        {/*Display Error page if route does not exist */}
        <Route path="*" element={<RouterError />} />
      </Routes>
    </Wrapper>
  );
}

export default Router;
