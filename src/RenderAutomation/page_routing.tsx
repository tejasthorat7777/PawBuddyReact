import { lazy } from "react";

const Home = lazy(() => import("../Componet/pages/Home"));
const Profile = lazy(() => import("../Componet/Account/Profile"));
const Wishlist = lazy(() => import("../Componet/Account/Wishlist"));
const Cart = lazy(() => import("../Componet/pages/Cart"));
const AddProduct = lazy(() => import("../business/component/AddProduct"));
const ListesProducts = lazy(
  () => import("../business/component/ListedProducts")
);
const Orders = lazy(() => import("../Componet/Account/Orders"));
const Dryfood = lazy(() => import("../Componet/pages/Dogfood/DryFood"));
const Gravy = lazy(() => import("../Componet/pages/Dogfood/Gravy"));
const Treats = lazy(() => import("../Componet/pages/Dogfood/Treats"));
const Leash = lazy(() => import("../Componet/pages/Accessories/Leash"));
const Collar = lazy(() => import("../Componet/pages/Accessories/Collar"));
const Harness = lazy(() => import("../Componet/pages/Accessories/Harness"));

const page_routing = [
  { url: "/", component_name: Home },
  { url: "/account/profile", component_name: Profile },
  { url: "/account/whishlist", component_name: Wishlist },
  { url: "/account/orders", component_name: Orders },
  { url: "/cart", component_name: Cart },
  { url: "/business/add_product", component_name: AddProduct },
  { url: "/business/listed_products", component_name: ListesProducts },
  { url: "/dogfood/dryfood", component_name: Dryfood },
  { url: "/dogfood/gravy", component_name: Gravy },
  { url: "/dogfood/treats", component_name: Treats },
  { url: "/accessories/leash", component_name: Leash },
  { url: "/accessories/harness", component_name: Collar },
  { url: "/accessories/collar", component_name: Harness },
];

export default page_routing;
