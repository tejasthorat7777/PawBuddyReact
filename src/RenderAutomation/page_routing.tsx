import { lazy } from "react";

const Home = lazy(() => import("../Componet/pages/Home"));
const Profile = lazy(() => import("../Componet/Account/Profile"));
const Wishlist = lazy(() => import("../Componet/Account/Wishlist"));
const Cart = lazy(() => import("../Componet/pages/Cart"));
const AddProduct = lazy(() => import("../business/component/AddProduct"));
const ListesProducts = lazy(()=> import("../business/component/ListedProducts"));
const Orders = lazy(()=> import("../Componet/Account/Orders"));

const page_routing = [
  { url: "/", component_name: Home },
  { url: "/account/profile", component_name: Profile },
  { url: "/account/whishlist", component_name: Wishlist },
  { url: "/account/orders", component_name: Orders },
  { url: "/cart", component_name: Cart },
  { url: "/business/add_product", component_name: AddProduct },
  { url: "/business/listed_products", component_name: ListesProducts },
];

export default page_routing;
