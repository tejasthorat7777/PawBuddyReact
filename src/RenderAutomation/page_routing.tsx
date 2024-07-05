import { lazy } from "react";

const Home = lazy(() => import("../Componet/pages/Home"));
const Profile = lazy(() => import("../Componet/Account/Profile"));
const Wishlist = lazy(() => import("../Componet/pages/Wishlist"));

const page_routing = [
  { url: "/", component_name: Home },
  { url: "/account/profile", component_name: Profile },
  { url: "/whishlist", component_name: Wishlist },
];

export default page_routing;