import { lazy } from "react";

const Home = lazy(() => import('../Componet/Right/pages/Home'));
const Profile = lazy(() => import("../Componet/Account/Profile"));


const page_routing = [
    { url: '/', component_name: Home },
    { url: '/dogfood/dryfood', component_name: Profile }
]

export default page_routing;