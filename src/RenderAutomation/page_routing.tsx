import { lazy } from "react";

const Home = lazy(() => import("../Componet/LeftMenu/Home"));
const Profile = lazy(() => import("../Componet/Account/Profile"));
const Wishlist = lazy(() => import("../Componet/Account/Wishlist"));
const Cart = lazy(() => import("../Componet/pages/Cart"));
const AddProduct = lazy(() => import("../business/component/AddProduct"));
const ListesProducts = lazy(
  () => import("../business/component/ListedProducts")
);
const Orders = lazy(() => import("../Componet/Account/Orders"));
const Dryfood = lazy(() => import("../Componet/LeftMenu/Dogfood/DryFood"));
const Gravy = lazy(() => import("../Componet/LeftMenu/Dogfood/Gravy"));
const Treats = lazy(() => import("../Componet/LeftMenu/Dogfood/Treats"));
const Leash = lazy(() => import("../Componet/LeftMenu/Accessories/Leash"));
const Collar = lazy(() => import("../Componet/LeftMenu/Accessories/Collar"));
const Harness = lazy(() => import("../Componet/LeftMenu/Accessories/Harness"));
const Shining = lazy(() => import("../Componet/LeftMenu/Shampoo/Shining"));
const Tickandflea = lazy(() => import("../Componet/LeftMenu/Shampoo/Tickandflea"));
const Scented = lazy(() => import("../Componet/LeftMenu/Shampoo/Scented"));
const Scooper = lazy(() => import("../Componet/LeftMenu/Bathroom/Scooper"));
const Toiletspray = lazy(
  () => import("../Componet/LeftMenu/Bathroom/Toiletspray")
);
const Perfume = lazy(() => import("../Componet/LeftMenu/Bathroom/Perfume"));

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
  { url: "/shampoo/shinigshampoo", component_name: Shining },
  { url: "/shampoo/tickAndFleaShampoo", component_name: Tickandflea },
  { url: "/shampoo/shampooSented", component_name: Scented },
  { url: "/bathroom/spray", component_name: Scooper },
  { url: "/bathroom/scooper", component_name: Toiletspray },
  { url: "/bathroom/perfume", component_name: Perfume },
];

export default page_routing;
