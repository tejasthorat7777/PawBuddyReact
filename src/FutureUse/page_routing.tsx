import { lazy } from "react";

const Home = lazy(() => import('../Componet/Right/pages/Home'));
const Profile = lazy(() => import("../Componet/Account/Profile"));


const page_routing = [
    { url: '/home', component_name: Home },
    { url: '/account/profile', component_name: Profile }
]

export default page_routing;