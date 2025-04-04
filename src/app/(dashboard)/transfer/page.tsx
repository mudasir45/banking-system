"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Check,
  Clock,
  CreditCard,
  Send,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const transferSchema = z.object({
  fromAccount: z.string().min(1, "Please select an account"),
  toAccount: z.string().min(1, "Please enter a valid recipient account"),
  amount: z.string().refine(
    (val) => {
      const num = parseFloat(val.replace(/,/g, ""));
      return !isNaN(num) && num > 0;
    },
    { message: "Please enter a valid amount" }
  ),
  description: z.string().optional(),
});

type TransferFormData = z.infer<typeof transferSchema>;

export default function TransferPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [transferStatus, setTransferStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [recentRecipients, setRecentRecipients] = useState([
    {
      id: 1,
      name: "John Smith",
      accountNumber: "**** 5678",
      bank: "FirstBank",
      avatar: null,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      accountNumber: "**** 9012",
      bank: "Chase Bank",
      avatar: null,
    },
    {
      id: 3,
      name: "Michael Brown",
      accountNumber: "**** 3456",
      bank: "Bank of America",
      avatar: null,
    },
  ]);
  const [transferReceipt, setTransferReceipt] = useState<{
    referenceNumber: string;
    date: string;
    time: string;
    amount: string;
    fromAccount: string;
    toAccount: string;
    recipient: string;
    description: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fromAccount: "checking",
      toAccount: "",
      amount: "",
      description: "",
    },
  });

  const fromAccount = watch("fromAccount");
  const amount = watch("amount");

  const accounts = [
    {
      id: "checking",
      name: "Main Checking Account",
      number: "•••• 4582",
      balance: "$8,547.65",
    },
    {
      id: "savings",
      name: "Savings Account",
      number: "•••• 7621",
      balance: "$12,385.42",
    },
  ];

  const handleRecentRecipientClick = (
    recipient: (typeof recentRecipients)[0]
  ) => {
    setValue("toAccount", recipient.accountNumber);
  };

  const handleTransfer = async (data: TransferFormData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // Generate a random success/error for demonstration
      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        setTransferStatus("success");
        setTransferReceipt({
          referenceNumber:
            "TRF" +
            Math.floor(Math.random() * 1000000000)
              .toString()
              .padStart(9, "0"),
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          amount: data.amount,
          fromAccount:
            accounts.find((a) => a.id === data.fromAccount)?.name || "",
          toAccount: data.toAccount,
          recipient: data.toAccount, // In a real app, we would lookup the recipient name
          description: data.description || "N/A",
        });
      } else {
        setTransferStatus("error");
      }
    }, 2000);
  };

  const handleResetForm = () => {
    reset();
    setTransferStatus("idle");
    setTransferReceipt(null);
  };

  if (transferStatus === "success" && transferReceipt) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-6 bg-success text-white text-center">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white">
              <Check className="h-6 w-6 text-success" />
            </div>
            <h2 className="text-xl font-bold mb-1">Transfer Successful!</h2>
            <p className="opacity-80">
              Your funds have been transferred successfully.
            </p>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Transfer Receipt</h3>

            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-text-secondary text-sm">
                  Reference No.
                </span>
                <span className="font-medium">
                  {transferReceipt.referenceNumber}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-text-secondary text-sm">Date & Time</span>
                <span className="font-medium">
                  {transferReceipt.date} at {transferReceipt.time}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-text-secondary text-sm">Amount</span>
                <span className="font-medium text-success">
                  ${transferReceipt.amount}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-text-secondary text-sm">
                  From Account
                </span>
                <span className="font-medium">
                  {transferReceipt.fromAccount}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-text-secondary text-sm">To Account</span>
                <span className="font-medium">{transferReceipt.toAccount}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-text-secondary text-sm">Recipient</span>
                <span className="font-medium">{transferReceipt.recipient}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-text-secondary text-sm">Description</span>
                <span className="font-medium">
                  {transferReceipt.description}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 flex justify-between">
            <Button variant="outline" onClick={handleResetForm}>
              New Transfer
            </Button>
            <Button>Download Receipt</Button>
          </div>
        </div>
      </div>
    );
  }

  if (transferStatus === "error") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-6 bg-danger text-white text-center">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white">
              <X className="h-6 w-6 text-danger" />
            </div>
            <h2 className="text-xl font-bold mb-1">Transfer Failed</h2>
            <p className="opacity-80">
              We couldn't process your transfer at this time.
            </p>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">What went wrong?</h3>
            <p className="text-text-secondary">
              The transfer could not be completed due to the following reason:
            </p>
            <p className="mt-2 p-3 bg-danger/10 rounded text-danger">
              Insufficient funds in your account. Please try again with a
              smaller amount or use a different account.
            </p>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Need help?</h4>
              <p className="text-sm text-text-secondary">
                If you believe this is an error, please contact our support team
                at <span className="text-primary">support@securebank.com</span>{" "}
                or call us at{" "}
                <span className="text-primary">1-800-123-4567</span>.
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            <Button onClick={handleResetForm}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Transfer Funds</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-6">Make a Transfer</h2>

            <form onSubmit={handleSubmit(handleTransfer)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  From Account
                </label>
                <div className="space-y-3">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className={`
                        border rounded-lg p-4 cursor-pointer transition-colors
                        ${
                          fromAccount === account.id
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-primary"
                        }
                      `}
                      onClick={() => setValue("fromAccount", account.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{account.name}</p>
                            <p className="text-sm text-text-secondary">
                              {account.number}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{account.balance}</p>
                          <p className="text-xs text-text-secondary">
                            Available Balance
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        className="sr-only"
                        value={account.id}
                        {...register("fromAccount")}
                      />
                    </div>
                  ))}
                </div>
                {errors.fromAccount && (
                  <p className="mt-1 text-xs text-danger">
                    {errors.fromAccount.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  To Account
                </label>
                <Input
                  placeholder="Enter account number or IBAN"
                  {...register("toAccount")}
                  error={errors.toAccount?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    className="pl-8"
                    placeholder="0.00"
                    {...register("amount")}
                    error={errors.amount?.message}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Description (Optional)
                </label>
                <Input
                  placeholder="e.g., Rent payment, Gift, etc."
                  {...register("description")}
                />
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium text-text-secondary mb-3">
                  Transfer Summary
                </h3>
                <div className="bg-background-alt rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-text-secondary">Transfer Amount</span>
                    <span className="font-medium">
                      {amount ? `$${amount}` : "$0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-text-secondary">Fee</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-primary">
                      {amount ? `$${amount}` : "$0.00"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  leftIcon={<Send size={16} />}
                >
                  Transfer Funds
                </Button>
                <p className="text-xs text-text-secondary text-center mt-2">
                  By clicking the button, you agree to our Terms and Conditions
                </p>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-medium mb-4 flex items-center">
              <Clock size={16} className="mr-2 text-text-secondary" />
              Recent Recipients
            </h3>

            <div className="space-y-3">
              {recentRecipients.map((recipient) => (
                <div
                  key={recipient.id}
                  className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-primary"
                  onClick={() => handleRecentRecipientClick(recipient)}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{recipient.name}</p>
                      <p className="text-xs text-text-secondary">
                        {recipient.accountNumber} • {recipient.bank}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4">Transfer Tips</h3>

            <div className="space-y-3 text-sm">
              <div className="flex">
                <div className="mr-3 text-primary">
                  <ArrowRight size={16} />
                </div>
                <p>Double-check recipient account details before confirming.</p>
              </div>
              <div className="flex">
                <div className="mr-3 text-primary">
                  <ArrowRight size={16} />
                </div>
                <p>
                  International transfers may take 1-3 business days to process.
                </p>
              </div>
              <div className="flex">
                <div className="mr-3 text-primary">
                  <ArrowRight size={16} />
                </div>
                <p>
                  Save frequent recipients for faster transactions in the
                  future.
                </p>
              </div>
              <div className="flex">
                <div className="mr-3 text-primary">
                  <ArrowRight size={16} />
                </div>
                <p>
                  There are no fees for transfers between SecureBank accounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
