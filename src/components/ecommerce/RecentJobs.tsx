import ReusableTable from "../tables/BasicTables/BasicTableOne";

interface Job {
  id: number;
  jobName: string;
  jobDescription: string;
  jobType: "Remote" | "Hybrid" | "Onsite";
  status: "Active" | "Inactive";
  action?: React.ReactNode; 
}

const tableData: Job[] = [
  {
    id: 1,
    jobName: "Frontend Developer",
    jobDescription: "Develop and maintain web applications using React.",
    jobType: "Remote",
    status: "Active",
  },
  {
    id: 2,
    jobName: "Backend Engineer",
    jobDescription: "Build scalable APIs with Node.js and Express.",
    jobType: "Hybrid",
    status: "Inactive",
  },
  {
    id: 3,
    jobName: "UI/UX Designer",
    jobDescription: "Design user-friendly interfaces for mobile apps.",
    jobType: "Onsite",
    status: "Active",
  },
];

const tableHeaders = [
  { key: "id", label: "Job ID" },
  { key: "jobName", label: "Job Name" },
  { key: "jobDescription", label: "Job Short Description" },
  { key: "jobType", label: "Job Type" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

// Optional: Function to render action buttons
const renderActionButtons = (job: Job) => (
  <div className="flex gap-2">
    <button
      className="text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-200"
      onClick={() => console.log(`Edit job ${job.id}`)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline mr-1">
        <path d="M16.862 3.487a2.06 2.06 0 0 1 2.915 2.915l-1.086 1.086-2.915-2.915 1.086-1.086zm-2.086 2.086l2.915 2.915-9.086 9.086H5.69v-2.915l9.086-9.086z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
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
  // Map tableData to include action buttons
  const enhancedTableData = tableData.map((job) => ({
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
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <ReusableTable tableData={enhancedTableData} tableHeaders={tableHeaders} />
      </div>
    </div>
  );
}