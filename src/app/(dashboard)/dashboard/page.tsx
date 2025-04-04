"use client";

import StatCard from "@/components/dashboard/StatCard";
import Button from "@/components/ui/Button";
import {
  ArrowDown,
  ArrowRightLeft,
  ArrowUp,
  BarChart4,
  PiggyBank,
  Shield,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Link from "next/link";

// Mock recent transactions data
const recentTransactions = [
  {
    id: 1,
    type: "debit",
    description: "Starbucks Coffee",
    amount: "$4.50",
    date: "2 hours ago",
    icon: <ArrowDown className="h-3 w-3 text-danger" />,
    status: "completed",
  },
  {
    id: 2,
    type: "credit",
    description: "Paycheck Deposit",
    amount: "$2,500.00",
    date: "Yesterday",
    icon: <ArrowUp className="h-3 w-3 text-success" />,
    status: "completed",
  },
  {
    id: 3,
    type: "debit",
    description: "Amazon.com",
    amount: "$37.99",
    date: "Yesterday",
    icon: <ArrowDown className="h-3 w-3 text-danger" />,
    status: "completed",
  },
  {
    id: 4,
    type: "debit",
    description: "Netflix Subscription",
    amount: "$15.99",
    date: "3 days ago",
    icon: <ArrowDown className="h-3 w-3 text-danger" />,
    status: "completed",
  },
  {
    id: 5,
    type: "credit",
    description: "Refund - Flight Ticket",
    amount: "$320.00",
    date: "1 week ago",
    icon: <ArrowUp className="h-3 w-3 text-success" />,
    status: "completed",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<ArrowRightLeft size={16} />}
            size="sm"
          >
            <Link href="/transactions">View Transactions</Link>
          </Button>
          <Button leftIcon={<ArrowRightLeft size={16} />} size="sm">
            <Link href="/transfer" className="text-white">
              Transfer Funds
            </Link>
          </Button>
        </div>
      </div>

      {/* Account Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/3 -translate-x-1/3"></div>

        <div className="relative">
          <h2 className="text-lg font-medium mb-4">Account Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Account */}
            <div className="bg-primary text-white rounded-lg p-6 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-90">Main Checking Account</p>
                  <h3 className="text-2xl font-bold mt-1">$8,547.65</h3>
                  <p className="text-xs opacity-80 mt-1">
                    Account Number: •••• 4582
                  </p>
                </div>
                <Wallet size={32} className="opacity-80" />
              </div>

              <div className="flex justify-between mt-8">
                <div className="text-center">
                  <p className="text-xs opacity-80">Income</p>
                  <p className="font-medium">+$2,500.00</p>
                </div>
                <div className="text-center">
                  <p className="text-xs opacity-80">Spending</p>
                  <p className="font-medium">-$1,248.30</p>
                </div>
                <div className="text-center">
                  <p className="text-xs opacity-80">Savings</p>
                  <p className="font-medium">+$450.00</p>
                </div>
              </div>
            </div>

            {/* Savings Account */}
            <div className="bg-accent/90 text-white rounded-lg p-6 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-90">Savings Account</p>
                  <h3 className="text-2xl font-bold mt-1">$12,385.42</h3>
                  <p className="text-xs opacity-80 mt-1">
                    Account Number: •••• 7621
                  </p>
                </div>
                <PiggyBank size={32} className="opacity-80" />
              </div>

              <div className="flex justify-between mt-8">
                <div className="text-center">
                  <p className="text-xs opacity-80">Interest</p>
                  <p className="font-medium">+$12.85</p>
                </div>
                <div className="text-center">
                  <p className="text-xs opacity-80">Deposits</p>
                  <p className="font-medium">+$450.00</p>
                </div>
                <div className="text-center">
                  <p className="text-xs opacity-80">APY</p>
                  <p className="font-medium">1.25%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Balance"
          value="$20,933.07"
          icon={Wallet}
          trend={{ value: 12.5, isPositive: true }}
          color="primary"
        />
        <StatCard
          title="Monthly Spending"
          value="$1,248.30"
          icon={ArrowRightLeft}
          trend={{ value: 8.1, isPositive: false }}
          color="danger"
        />
        <StatCard
          title="Monthly Saving"
          value="$462.85"
          icon={TrendingUp}
          trend={{ value: 4.3, isPositive: true }}
          color="success"
        />
        <StatCard
          title="Security Score"
          value="92/100"
          icon={Shield}
          color="info"
        />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Recent Transactions</h2>
          <Link
            href="/transactions"
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            View All
          </Link>
        </div>

        <div className="divide-y divide-gray-200">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "credit"
                        ? "bg-success/10"
                        : "bg-danger/10"
                    }`}
                  >
                    {transaction.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      transaction.type === "credit"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {transaction.amount}
                  </p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success">
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spending Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Spending Overview</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">This Month</span>
            <BarChart4 size={18} className="text-primary" />
          </div>
        </div>

        <div className="h-60 flex items-center justify-center text-text-secondary">
          <p className="text-sm">Spending chart visualization goes here</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="w-3 h-3 bg-primary rounded-full mx-auto"></div>
            <p className="text-xs text-text-secondary mt-1">Groceries</p>
            <p className="font-medium text-sm">$320.50</p>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-accent rounded-full mx-auto"></div>
            <p className="text-xs text-text-secondary mt-1">Shopping</p>
            <p className="font-medium text-sm">$285.75</p>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-success rounded-full mx-auto"></div>
            <p className="text-xs text-text-secondary mt-1">Travel</p>
            <p className="font-medium text-sm">$220.00</p>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-warning rounded-full mx-auto"></div>
            <p className="text-xs text-text-secondary mt-1">Others</p>
            <p className="font-medium text-sm">$422.05</p>
          </div>
        </div>
      </div>
    </div>
  );
}
