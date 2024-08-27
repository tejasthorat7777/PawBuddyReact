import { lazy } from "react";

const Home = lazy(() => import("../Componet/pages/Home"));
const Profile = lazy(() => import("../Componet/Account/Profile"));
const Wishlist = lazy(() => import("../Componet/Account/Wishlist"));
const Cart = lazy(() => import("../Componet/pages/Cart"));
const AddProduct = lazy(() => import("../business/component/AddProduct"));

const page_routing = [
  { url: "/", component_name: Home },
  { url: "/account/profile", component_name: Profile },
  { url: "/account/whishlist", component_name: Wishlist },
  { url: "/cart", component_name: Cart },
  { url: "/business/add_product", component_name: AddProduct },
];

export default page_routing;
