import PageMeta from "../../components/common/PageMeta";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MetricsChart from "../../components/ecommerce/OverviewCharts";
import RecentAppointments from "../../components/ecommerce/RecentAppointments";
import RecentJobs from "../../components/ecommerce/RecentJobs";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
        <div className="col-span-12 space-y-6">
          <EcommerceMetrics />
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
