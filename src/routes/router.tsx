import { createBrowserRouter } from "react-router";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/admin/AddAdmin";
import ProtectedRoute from "../components/guard/ProtectedRoute";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Dashboard/Home";
import UserProfiles from "../pages/UserProfiles";
import JobPage from "../pages/Jobs/JobPage";
import JobAddingForm from "../pages/Jobs/add/JobsAddPage";
import AppointmentsPage from "../pages/Appointments/AppointmentsPage";
import ProductsPage from "../pages/Products/ProductsPage";
import AddPortfolioPage from "../pages/Portfolio/PortfolioPage";
import EventsPage from "../pages/Events/EventsPage";
import CategoryUtilityPage from "../pages/BasicSettings/CategoryUtilityPage";
import NotFound from "../pages/OtherPage/NotFound";

const router = createBrowserRouter([
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: "profile",
                        element: <UserProfiles />,
                    },
                    {
                        path: "jobs",
                        element: <JobPage />,
                    },
                    {
                        path: "jobs/add",
                        element: <JobAddingForm />,
                    },
                    {
                        path: "appointments",
                        element: <AppointmentsPage />,
                    },
                    {
                        path: "products",
                        element: <ProductsPage />,
                    },
                    {
                        path: "portfolio",
                        element: <AddPortfolioPage />,
                    },
                    {
                        path: "events",
                        element: <EventsPage />,
                    },
                    {
                        path: "utility",
                        element: <CategoryUtilityPage />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;