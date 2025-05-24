import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";
import AppointmentsPage from "./pages/Appointments/AppointmentsPage";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import CategoryUtilityPage from "./pages/BasicSettings/CategoryUtilityPage";
import Home from "./pages/Dashboard/Home";
import EventsPage from "./pages/Events/EventsPage";
import JobAddingForm from "./pages/Jobs/add/JobsAddPage";
import JobPage from "./pages/Jobs/JobPage";
import NotFound from "./pages/OtherPage/NotFound";
import AddPortfolioPage from "./pages/Portfolio/PortfolioPage";
import ProductsPage from "./pages/Products/ProductsPage";
import UserProfiles from "./pages/UserProfiles";
import ProtectedRoute from "./components/guard/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route index path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route path="/jobs/add" element={<JobAddingForm />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/portfolio" element={<AddPortfolioPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/utility" element={<CategoryUtilityPage />} />
          </Route>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
