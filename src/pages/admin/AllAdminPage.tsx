import { useState } from "react";
import { AllAdminsGetResponse } from "../../common/common.interface";
import SignUpForm from "../../components/auth/SignUpForm";
import { Modal } from "../../components/modal";
import ReusableTable from "../../components/tables/BasicTables/BasicTableOne";
import { useDeleteAdminMutation, useGetAllAdminsQuery } from "../../redux/endpoints/userEndpoints";

const tableHeaders = [
    { key: "_id", label: "User ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
    { key: "action", label: "Action" },
];

const renderActionButtons = (user: AllAdminsGetResponse, deleteAdmin: (id: string) => Promise<any>, refetch: () => void) => (
    <div className="flex gap-2">
        <button
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 inline-flex gap-2 items-center"
            onClick={() => {
                // Handle delete action
                if (window.confirm("Are you sure you want to delete this admin?")) {
                    deleteAdmin(user._id);
                    refetch();
                }
            }}
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3 6H5H21"
                    stroke="red"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6M10 11V17"
                    stroke="red"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14 11V17"
                    stroke="red"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9 6H15"
                    stroke="red"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            Delete
        </button>
    </div>
);

export default function AllAdmin() {
    const { data: admins , refetch} = useGetAllAdminsQuery()
    const [isOpen, setIsOpen] = useState(false);
    const [deleteAdmin] = useDeleteAdminMutation()
    // Wrap deleteAdmin to accept an id and call the mutation trigger with the correct argument
    const handleDeleteAdmin = (id: string) => deleteAdmin(id);
    // Map tableData to include action buttons
    const enhancedTableData = admins?.map((admin: AllAdminsGetResponse) => ({
        ...admin,
        createdAt: new Date(admin?.createdAt).toLocaleDateString(), // Format date for display
        updatedAt: new Date(admin?.updatedAt).toLocaleDateString(), // Format date for display
        action: renderActionButtons(admin, handleDeleteAdmin, refetch),
    }));

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Admin Management
                    </h3>
                </div>
                {/* <Link to={'/create-admin'} className="flex items-center gap-3"> */}
                <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-plus-icon lucide-plus"
                    >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                    Add New Admin
                </button>
                {/* </Link> */}
            </div>
            <div className="max-w-full overflow-x-auto">
                <ReusableTable tableData={enhancedTableData ?? []} tableHeaders={tableHeaders} />
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} >
                    <SignUpForm />
                </Modal>
            </div>
        </div>
    );
}