import React, { useState, ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";

// Generic interface for table headers
interface TableHeader {
  key: string;
  label: string;
  width?: string; // Optional width for styling
}

// Generic interface for table data (any object with string keys)
interface TableData {
  [key: string]: any;
}

// Props for the ReusableTable component
interface ReusableTableProps {
  tableHeaders: TableHeader[];
  tableData: TableData[];
  renderCell?: (key: string, value: any, row: TableData) => ReactNode; // Custom cell renderer
  rowsPerPage?: number; // Configurable rows per page
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  tableHeaders,
  tableData,
  renderCell,
  rowsPerPage = 10,
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = tableData.slice(startIndex, startIndex + rowsPerPage);

  // Handle navigation
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Default cell renderer
  const defaultRenderCell = (key: string, value: any): ReactNode => {
    if (key === "status") {
      return (
        <Badge
          size="sm"
          color={
            value === "Active"
              ? "success"
              : value === "Inactive"
                ? "error"
                : "warning"
          }
        >
          {value}
        </Badge>
      );
    }
    if (key === "action" && value) {
      return value; 
    }
    return value?.toString() || "-"; // Fallback for simple values
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell
                  key={header.key}
                  isHeader
                  className={`px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400${header.width ? ` w-[${header.width}]` : ""}`}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedData.map((row, index) => (
              <TableRow key={row.id || index}>
                {tableHeaders.map((header) => (
                  <TableCell
                    key={header.key}
                    className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-500 dark:text-gray-400"
                  >
                    {(renderCell || defaultRenderCell)(header.key, row[header.key], row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {tableData.length > rowsPerPage && (
        <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200 dark:border-white/[0.05]">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReusableTable;