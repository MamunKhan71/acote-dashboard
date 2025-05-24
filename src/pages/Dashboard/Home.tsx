import PageMeta from "../../components/common/PageMeta";
import DashboardMetrics from "../../components/dashboard/dashboardMetrics";
import MetricsChart from "../../components/dashboard/OverviewCharts";
import RecentAppointments from "../../components/dashboard/RecentAppointments";
import RecentJobs from "../Jobs/RecentJobs";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
        <div className="col-span-12 space-y-6">
          <DashboardMetrics />
        </div>
        <div className="col-span-12 grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-2 h-full">
              <RecentAppointments />
            </div>
            <MetricsChart />
          </div>
          <RecentJobs />
        </div>
      </div>
    </>
  );
}
