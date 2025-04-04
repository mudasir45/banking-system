"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Info,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

// Mock transaction data
const transactionsData = [
  {
    id: 1,
    type: "debit",
    description: "Starbucks Coffee",
    category: "Food & Drinks",
    amount: "$4.50",
    date: "2023-06-15",
    time: "10:32 AM",
    status: "completed",
    account: "Main Checking •••• 4582",
  },
  {
    id: 2,
    type: "credit",
    description: "Paycheck Deposit",
    category: "Income",
    amount: "$2,500.00",
    date: "2023-06-14",
    time: "9:00 AM",
    status: "completed",
    account: "Main Checking •••• 4582",
  },
  {
    id: 3,
    type: "debit",
    description: "Amazon.com",
    category: "Shopping",
    amount: "$37.99",
    date: "2023-06-14",
    time: "3:15 PM",
    status: "completed",
    account: "Main Checking •••• 4582",
  },
  {
    id: 4,
    type: "debit",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: "$15.99",
    date: "2023-06-12",
    time: "12:00 AM",
    status: "completed",
    account: "Main Checking •••• 4582",
  },
  {
    id: 5,
    type: "credit",
    description: "Refund - Flight Ticket",
    category: "Travel",
    amount: "$320.00",
    date: "2023-06-08",
    time: "2:43 PM",
    status: "completed",
    account: "Main Checking •••• 4582",
  },
  {
    id: 6,
    type: "debit",
    description: "Utility Bill - Electricity",
    category: "Bills",
    amount: "$78.25",
    date: "2023-06-05",
    time: "10:00 AM",
    status: "completed",
    account: "Main Checking •••• 4582",
  },
  {
    id: 7,
    type: "debit",
    description: "Grocery Store",
    category: "Groceries",
    amount: "$125.40",
    date: "2023-06-04",
    time: "11:32 AM",
    status: "completed",
    account: "Main Checking •••• 4582",
  },
  {
    id: 8,
    type: "credit",
    description: "Dividend Payment",
    category: "Investment",
    amount: "$32.65",
    date: "2023-06-01",
    time: "8:30 AM",
    status: "completed",
    account: "Savings •••• 7621",
  },
  {
    id: 9,
    type: "debit",
    description: "Gas Station",
    category: "Transportation",
    amount: "$45.80",
    date: "2023-05-29",
    time: "4:12 PM",
    status: "completed",
    account: "Main Checking •••• 4582",
  },
  {
    id: 10,
    type: "debit",
    description: "Restaurant - Dinner",
    category: "Food & Drinks",
    amount: "$78.50",
    date: "2023-05-28",
    time: "8:45 PM",
    status: "completed",
    account: "Main Checking •••• 4582",
  },
];

// Filter and pagination
export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "credit" | "debit">(
    "all"
  );
  const [selectedTransaction, setSelectedTransaction] = useState<
    (typeof transactionsData)[0] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const itemsPerPage = 6;

  // Filter transactions based on search, type, and other filters
  const filteredTransactions = transactionsData.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || transaction.type === selectedType;
    const matchesDateFrom =
      !filterDateFrom || transaction.date >= filterDateFrom;
    const matchesDateTo = !filterDateTo || transaction.date <= filterDateTo;
    const matchesCategory =
      !filterCategory || transaction.category === filterCategory;

    return (
      matchesSearch &&
      matchesType &&
      matchesDateFrom &&
      matchesDateTo &&
      matchesCategory
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Categories for filter
  const categories = Array.from(
    new Set(transactionsData.map((t) => t.category))
  );

  const handleTransactionClick = (
    transaction: (typeof transactionsData)[0]
  ) => {
    setSelectedTransaction(transaction);
  };

  const closeTransactionDetails = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Transaction History</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" leftIcon={<Download size={16} />} size="sm">
            Export CSV
          </Button>
          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
            className="w-full"
          />
        </div>

        <div className="flex space-x-2">
          <Button
            variant={selectedType === "all" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedType("all")}
            className="flex-1 sm:flex-none"
          >
            All
          </Button>
          <Button
            variant={selectedType === "credit" ? "primary" : "outline"}
            size="sm"
            leftIcon={<ArrowUp size={16} className="text-success" />}
            onClick={() => setSelectedType("credit")}
            className="flex-1 sm:flex-none"
          >
            Income
          </Button>
          <Button
            variant={selectedType === "debit" ? "primary" : "outline"}
            size="sm"
            leftIcon={<ArrowDown size={16} className="text-danger" />}
            onClick={() => setSelectedType("debit")}
            className="flex-1 sm:flex-none"
          >
            Expense
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Date From
              </label>
              <Input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                leftIcon={<Calendar size={16} />}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Date To
              </label>
              <Input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                leftIcon={<Calendar size={16} />}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<X size={16} />}
              onClick={() => {
                setFilterDateFrom("");
                setFilterDateTo("");
                setFilterCategory("");
              }}
              className="mr-2"
            >
              Clear Filters
            </Button>
            <Button size="sm" onClick={() => setShowFilters(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Transaction Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Description</span>
                    <ArrowUpDown
                      size={14}
                      className="text-text-secondary cursor-pointer"
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Category</span>
                    <ArrowUpDown
                      size={14}
                      className="text-text-secondary cursor-pointer"
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    <ArrowUpDown
                      size={14}
                      className="text-text-secondary cursor-pointer"
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Amount</span>
                    <ArrowUpDown
                      size={14}
                      className="text-text-secondary cursor-pointer"
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                            transaction.type === "credit"
                              ? "bg-success/10"
                              : "bg-danger/10"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowUp size={16} className="text-success" />
                          ) : (
                            <ArrowDown size={16} className="text-danger" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text-primary">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {transaction.account}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-primary">
                        {transaction.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-primary">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {transaction.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${
                          transaction.type === "credit"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {transaction.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success/10 text-success">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-text-secondary"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Info size={24} className="mb-2" />
                      <h3 className="text-base font-medium">
                        No transactions found
                      </h3>
                      <p className="text-sm mt-1">
                        Try changing your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-text-secondary">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredTransactions.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredTransactions.length}
                  </span>{" "}
                  transactions
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-text-secondary hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                            ? "z-10 bg-primary border-primary text-white"
                            : "bg-white border-gray-300 text-text-primary hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-text-secondary hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight size={16} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium">Transaction Details</h3>
              <button
                className="text-text-secondary hover:text-text-primary"
                onClick={closeTransactionDetails}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      selectedTransaction.type === "credit"
                        ? "bg-success/10"
                        : "bg-danger/10"
                    }`}
                  >
                    {selectedTransaction.type === "credit" ? (
                      <ArrowUp size={24} className="text-success" />
                    ) : (
                      <ArrowDown size={24} className="text-danger" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">
                      {selectedTransaction.description}
                    </h4>
                    <p className="text-text-secondary">
                      {selectedTransaction.category}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-xl font-bold ${
                    selectedTransaction.type === "credit"
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {selectedTransaction.type === "credit" ? "+" : "-"}
                  {selectedTransaction.amount}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Transaction Date
                  </p>
                  <p className="font-medium">
                    {new Date(selectedTransaction.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Transaction Time
                  </p>
                  <p className="font-medium">{selectedTransaction.time}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Status</p>
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success/10 text-success">
                    {selectedTransaction.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Transaction Type
                  </p>
                  <p className="font-medium capitalize">
                    {selectedTransaction.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Account</p>
                  <p className="font-medium">{selectedTransaction.account}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Transaction ID
                  </p>
                  <p className="font-medium text-text-secondary">
                    TRX{String(selectedTransaction.id).padStart(8, "0")}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={closeTransactionDetails}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<Download size={16} />}
                  onClick={closeTransactionDetails}
                >
                  Download Receipt
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
