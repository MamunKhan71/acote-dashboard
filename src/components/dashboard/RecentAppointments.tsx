import ReusableTable from "../tables/BasicTables/BasicTableOne";

const tableHeaders = [
  { key: "username", label: "Username" },
  { key: "appointedDate", label: "Appointed Date" },
  { key: "details", label: "Details" },
  { key: "meetLink", label: "Join Meeting" },
];

const tableData = [
  {
    id: 1,
    username: "Mamun Or Rashid",
    appointedDate: "2025-05-10",
    details: "Routine check-up for acote website",
    meetLink: "https://meet.example.com/lindsey",
  },
  {
    id: 2,
    username: "Md. Mamun",
    appointedDate: "2025-05-11",
    details: "Follow-up for interview results.",
    meetLink: "https://meet.example.com/john",
  },
  {
    id: 3,
    username: "Toha Hossain",
    appointedDate: "2025-05-11",
    details: "Follow-up for interview results.",
    meetLink: "https://meet.example.com/john",
  },
  {
    id: 4,
    username: "Sajjad Hossain",
    appointedDate: "2025-05-11",
    details: "Follow-up for interview results.",
    meetLink: "https://meet.example.com/john",
  },
];

const renderCell = (key: string, value: any) => {
  if (key === "meetLink" && typeof value === "string") {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-brand-600 hover:underline text-sm font-medium"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 7L16 12L23 17V7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Join
      </a>
    );
  }
  return value;
};

export default function RecentAppointments() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 h-full">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Appointments
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <ReusableTable
          tableData={tableData}
          tableHeaders={tableHeaders}
          renderCell={renderCell}
        />
      </div>
    </div>
  );
}
