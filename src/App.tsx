import { Route, BrowserRouter as Router, Routes } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";
import AppointmentsPage from "./pages/Appointments/AppointmentsPage";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import BarChart from "./pages/Charts/BarChart";
import LineChart from "./pages/Charts/LineChart";
import Home from "./pages/Dashboard/Home";
import EventsPage from "./pages/Events/EventsPage";
import FormElements from "./pages/Forms/FormElements";
import JobAddingForm from "./pages/Jobs/add/JobsAddPage";
import JobPage from "./pages/Jobs/JobPage";
import NotFound from "./pages/OtherPage/NotFound";
import AddPortfolioPage from "./pages/Portfolio/PortfolioPage";
import ProductsPage from "./pages/Products/ProductsPage";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import UserProfiles from "./pages/UserProfiles";
import CategoryUtilityPage from "./pages/BasicSettings/CategoryUtilityPage";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route path="/jobs/add" element={<JobAddingForm />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/portfolio" element={<AddPortfolioPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/utility" element={<CategoryUtilityPage />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
