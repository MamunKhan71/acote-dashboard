import { Link } from "react-router";
import { PlusIcon } from "../../icons";
import { useGetAllPostedJobsQuery } from "../../redux/endpoints/dashboardEndpoints";
import ReusableTable from "../../components/tables/BasicTables/BasicTableOne";
import Button from "../../components/ui/button/Button";

const tableHeaders = [
  { key: "_id", label: "Job ID" },
  { key: "jobTitle", label: "Job Title" },
  { key: "workArrangement", label: "Work Arrangement" },
  { key: "action", label: "Action" },
];

const renderActionButtons = (job) => (
  <div className="flex gap-2">
    <button
      className="text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-200"
      onClick={() => console.log(`Edit job ${job.id}`)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline mr-1">
        <path d="M16.862 3.487a2.06 2.06 0 0 1 2.915 2.915l-1.086 1.086-2.915-2.915 1.086-1.086zm-2.086 2.086l2.915 2.915-9.086 9.086H5.69v-2.915l9.086-9.086z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      Edit
    </button>
    <button
      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 inline-flex gap-2 items-center"
      onClick={() => console.log(`Delete job ${job.id}`)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H5H21" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6M10 11V17" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11V17" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 6H15" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Delete
    </button>
  </div>
);

export default function RecentJobs() {
  const { data: allJobs } = useGetAllPostedJobsQuery();

  // Map tableData to include action buttons
  const enhancedTableData = allJobs?.map((job) => ({
    ...job,
    action: renderActionButtons(job),
  }));

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Jobs
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <Link to={'/jobs/add'}>
            <Button>
              <PlusIcon />
              Add New Job
            </Button>
          </Link>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <ReusableTable tableData={enhancedTableData ?? []} tableHeaders={tableHeaders} />
      </div>
    </div>
  );
}