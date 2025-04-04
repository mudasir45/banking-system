"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Building,
  Calendar,
  Check,
  FileText,
  Mail,
  MapPin,
  Phone,
  Upload,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form validation schema
const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
  occupation: z.string().optional(),
  employer: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // profile, documents, preferences
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  const [documentUploadSuccess, setDocumentUploadSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phone: "(123) 456-7890",
      dateOfBirth: "1985-07-15",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      occupation: "Software Developer",
      employer: "Tech Company Inc.",
    },
  });

  const handleProfileUpdate = async (data: ProfileFormData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setProfileUpdateSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setProfileUpdateSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.files && event.target.files.length > 0) {
      setIsLoading(true);

      // Simulate document upload
      setTimeout(() => {
        setIsLoading(false);
        setDocumentUploadSuccess(true);

        // Reset success message after 3 seconds
        setTimeout(() => {
          setDocumentUploadSuccess(false);
        }, 3000);
      }, 1500);
    }
  };

  // Mock account details
  const accountDetails = {
    accountNumber: "•••• 4582",
    accountType: "Checking Account",
    routingNumber: "123456789",
    openDate: "January 15, 2020",
    status: "Active",
    balance: "$8,547.65",
    availableBalance: "$8,547.65",
    interestRate: "N/A",
  };

  // Documents to upload
  const requiredDocuments = [
    {
      id: 1,
      name: "Government ID",
      description: "Passport, Driver's License, or State ID",
      required: true,
      uploaded: true,
      date: "06/15/2023",
    },
    {
      id: 2,
      name: "Proof of Address",
      description: "Utility bill or bank statement from the last 90 days",
      required: true,
      uploaded: true,
      date: "06/15/2023",
    },
    {
      id: 3,
      name: "Social Security Card",
      description: "Copy of your Social Security Card",
      required: false,
      uploaded: false,
      date: null,
    },
    {
      id: 4,
      name: "Income Verification",
      description: "Recent pay stub or tax return",
      required: false,
      uploaded: false,
      date: null,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Account Management</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === "profile"
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary hover:text-primary"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Personal Information
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === "documents"
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary hover:text-primary"
            }`}
            onClick={() => setActiveTab("documents")}
          >
            Documents & KYC
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === "preferences"
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary hover:text-primary"
            }`}
            onClick={() => setActiveTab("preferences")}
          >
            Account Details
          </button>
        </div>

        <div className="p-6">
          {/* Profile Information Tab */}
          {activeTab === "profile" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-1">
                  Personal Information
                </h2>
                <p className="text-text-secondary text-sm">
                  Update your personal information and contact details
                </p>
              </div>

              {profileUpdateSuccess && (
                <div className="mb-6 bg-success/10 border border-success/30 text-success p-4 rounded-md flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium">
                      Profile Updated Successfully
                    </h3>
                    <p className="text-sm">
                      Your personal information has been updated.
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit(handleProfileUpdate)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      id="firstName"
                      label="First Name"
                      placeholder="John"
                      leftIcon={<User size={18} />}
                      error={errors.firstName?.message}
                      {...register("firstName")}
                    />
                  </div>

                  <div>
                    <Input
                      id="lastName"
                      label="Last Name"
                      placeholder="Doe"
                      leftIcon={<User size={18} />}
                      error={errors.lastName?.message}
                      {...register("lastName")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      id="email"
                      type="email"
                      label="Email Address"
                      placeholder="johndoe@example.com"
                      leftIcon={<Mail size={18} />}
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>

                  <div>
                    <Input
                      id="phone"
                      label="Phone Number"
                      placeholder="(123) 456-7890"
                      leftIcon={<Phone size={18} />}
                      error={errors.phone?.message}
                      {...register("phone")}
                    />
                  </div>
                </div>

                <div>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    label="Date of Birth"
                    leftIcon={<Calendar size={18} />}
                    error={errors.dateOfBirth?.message}
                    {...register("dateOfBirth")}
                  />
                </div>

                <div>
                  <Input
                    id="address"
                    label="Address"
                    placeholder="123 Main St"
                    leftIcon={<MapPin size={18} />}
                    error={errors.address?.message}
                    {...register("address")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <Input
                      id="city"
                      label="City"
                      placeholder="New York"
                      error={errors.city?.message}
                      {...register("city")}
                    />
                  </div>

                  <div>
                    <Input
                      id="state"
                      label="State"
                      placeholder="NY"
                      error={errors.state?.message}
                      {...register("state")}
                    />
                  </div>

                  <div>
                    <Input
                      id="zipCode"
                      label="Zip Code"
                      placeholder="10001"
                      error={errors.zipCode?.message}
                      {...register("zipCode")}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium mb-4">
                    Employment Information (Optional)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        id="occupation"
                        label="Occupation"
                        placeholder="Software Developer"
                        leftIcon={<User size={18} />}
                        {...register("occupation")}
                      />
                    </div>

                    <div>
                      <Input
                        id="employer"
                        label="Employer"
                        placeholder="Company Name"
                        leftIcon={<Building size={18} />}
                        {...register("employer")}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" isLoading={isLoading}>
                    Update Profile
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-1">Documents & KYC</h2>
                <p className="text-text-secondary text-sm">
                  Upload your identification and verification documents
                </p>
              </div>

              {documentUploadSuccess && (
                <div className="mb-6 bg-success/10 border border-success/30 text-success p-4 rounded-md flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium">
                      Document Uploaded Successfully
                    </h3>
                    <p className="text-sm">
                      Your document has been uploaded and is under review.
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-md mb-6">
                <div className="flex">
                  <AlertCircle size={20} className="text-primary mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-primary">
                      Verification Required
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      To comply with financial regulations, we need to verify
                      your identity. Please upload the required documents below.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {requiredDocuments.map((document) => (
                  <div
                    key={document.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center">
                          <FileText className="mr-2 text-primary" size={18} />
                          <h3 className="font-medium">
                            {document.name}
                            {document.required && (
                              <span className="text-danger ml-1 text-sm">
                                *
                              </span>
                            )}
                          </h3>
                        </div>
                        <p className="text-sm text-text-secondary mt-1">
                          {document.description}
                        </p>
                        {document.uploaded && (
                          <div className="flex items-center mt-2 text-success text-sm">
                            <Check size={14} className="mr-1" />
                            <span>Uploaded on {document.date}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="relative">
                          <input
                            type="file"
                            id={`document-${document.id}`}
                            className="sr-only"
                            onChange={handleDocumentUpload}
                            disabled={isLoading}
                          />
                          <label
                            htmlFor={`document-${document.id}`}
                            className={`
                              inline-flex items-center px-4 py-2 rounded-md text-sm font-medium 
                              ${
                                document.uploaded
                                  ? "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200"
                                  : "bg-primary text-white hover:bg-primary-dark"
                              }
                              cursor-pointer
                            `}
                          >
                            <Upload size={16} className="mr-2" />
                            {document.uploaded ? "Replace" : "Upload"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-text-secondary text-sm">
                <p>
                  <span className="text-danger mr-1">*</span>
                  Required documents
                </p>
              </div>
            </div>
          )}

          {/* Account Details Tab */}
          {activeTab === "preferences" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-1">Account Details</h2>
                <p className="text-text-secondary text-sm">
                  View your account information and status
                </p>
              </div>

              <div className="bg-background-alt rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <h3 className="text-sm text-text-secondary">
                      Account Number
                    </h3>
                    <p className="font-medium mt-1">
                      {accountDetails.accountNumber}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm text-text-secondary">
                      Account Type
                    </h3>
                    <p className="font-medium mt-1">
                      {accountDetails.accountType}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm text-text-secondary">
                      Routing Number
                    </h3>
                    <p className="font-medium mt-1">
                      {accountDetails.routingNumber}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm text-text-secondary">
                      Opening Date
                    </h3>
                    <p className="font-medium mt-1">
                      {accountDetails.openDate}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm text-text-secondary">Status</h3>
                    <div className="flex items-center mt-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-success mr-2"></span>
                      <p className="font-medium">{accountDetails.status}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm text-text-secondary">
                      Interest Rate
                    </h3>
                    <p className="font-medium mt-1">
                      {accountDetails.interestRate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-4">Current Balance</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-text-secondary text-sm">
                      Current Balance
                    </h4>
                    <p className="text-2xl font-bold text-primary mt-1">
                      {accountDetails.balance}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-text-secondary text-sm">
                      Available Balance
                    </h4>
                    <p className="text-2xl font-bold text-success mt-1">
                      {accountDetails.availableBalance}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Account Services</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                    <div>
                      <h4 className="font-medium">Order New Checkbook</h4>
                      <p className="text-sm text-text-secondary">
                        Order a new checkbook for your account
                      </p>
                    </div>
                    <Button size="sm">Order Now</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                    <div>
                      <h4 className="font-medium">Account Statements</h4>
                      <p className="text-sm text-text-secondary">
                        View and download your account statements
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Statements
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                    <div>
                      <h4 className="font-medium">Tax Documents</h4>
                      <p className="text-sm text-text-secondary">
                        Access your tax-related documents
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Documents
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
