"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Eye,
  EyeOff,
  Globe,
  Key,
  Monitor,
  Shield,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

export default function SecurityPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);

  // Mock login activity data
  const loginActivities = [
    {
      id: 1,
      device: "Windows PC",
      browser: "Chrome",
      location: "New York, United States",
      ip: "192.168.1.1",
      time: "2023-06-15T14:30:00",
      status: "success",
    },
    {
      id: 2,
      device: "iPhone",
      browser: "Safari",
      location: "New York, United States",
      ip: "192.168.1.2",
      time: "2023-06-14T09:15:00",
      status: "success",
    },
    {
      id: 3,
      device: "Android Phone",
      browser: "Chrome",
      location: "Chicago, United States",
      ip: "192.168.1.3",
      time: "2023-06-12T18:45:00",
      status: "success",
    },
    {
      id: 4,
      device: "Unknown Device",
      browser: "Firefox",
      location: "London, United Kingdom",
      ip: "192.168.1.4",
      time: "2023-06-10T03:22:00",
      status: "failed",
    },
    {
      id: 5,
      device: "Mac",
      browser: "Safari",
      location: "New York, United States",
      ip: "192.168.1.5",
      time: "2023-06-08T11:05:00",
      status: "success",
    },
  ];

  // Mock security alerts
  const securityAlerts = [
    {
      id: 1,
      title: "Password Changed",
      description: "Your account password was successfully changed.",
      date: "2023-06-10",
      severity: "info",
    },
    {
      id: 2,
      title: "Suspicious Login Attempt",
      description:
        "We detected a login attempt from London, UK. This was blocked for your security.",
      date: "2023-06-10",
      severity: "warning",
    },
    {
      id: 3,
      title: "Two-Factor Authentication Enabled",
      description: "Two-factor authentication was enabled for your account.",
      date: "2023-05-28",
      severity: "info",
    },
  ];

  const handleActivityClick = (id: number) => {
    if (expandedActivity === id) {
      setExpandedActivity(null);
    } else {
      setExpandedActivity(id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Security & Privacy</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Security Score */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-2 flex items-center">
              <Shield className="mr-2 text-primary" size={20} />
              Security Score
            </h2>

            <div className="flex items-center space-x-4 mb-4">
              <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-success rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <span className="font-bold text-lg">80%</span>
            </div>

            <div className="flex text-sm text-text-secondary justify-between mb-6">
              <span>Weak</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle size={16} className="text-success mr-2" />
                <span>Two-factor authentication is enabled</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="text-success mr-2" />
                <span>Strong password is set</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle size={16} className="text-warning mr-2" />
                <span>Password is more than 90 days old</span>
              </div>
            </div>
          </div>

          {/* Login Activity */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium flex items-center">
                <Clock className="mr-2 text-primary" size={20} />
                Recent Login Activity
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {loginActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div
                    className={`
                      p-4 flex items-center justify-between cursor-pointer
                      ${
                        expandedActivity === activity.id
                          ? "border-b border-gray-200"
                          : ""
                      }
                    `}
                    onClick={() => handleActivityClick(activity.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`
                        w-10 h-10 rounded-full flex items-center justify-center mr-4
                        ${
                          activity.status === "success"
                            ? "bg-success/10"
                            : "bg-danger/10"
                        }
                      `}
                      >
                        {activity.device.includes("Windows") ||
                        activity.device.includes("Mac") ? (
                          <Monitor
                            size={20}
                            className={
                              activity.status === "success"
                                ? "text-success"
                                : "text-danger"
                            }
                          />
                        ) : (
                          <Smartphone
                            size={20}
                            className={
                              activity.status === "success"
                                ? "text-success"
                                : "text-danger"
                            }
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {activity.device} - {activity.browser}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {formatDate(activity.time)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.status === "success"
                            ? "bg-success/10 text-success"
                            : "bg-danger/10 text-danger"
                        }`}
                      >
                        {activity.status === "success"
                          ? "Successful"
                          : "Failed"}
                      </span>
                      {expandedActivity === activity.id ? (
                        <ChevronUp
                          size={16}
                          className="ml-2 text-text-secondary"
                        />
                      ) : (
                        <ChevronDown
                          size={16}
                          className="ml-2 text-text-secondary"
                        />
                      )}
                    </div>
                  </div>

                  {expandedActivity === activity.id && (
                    <div className="p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-text-secondary mb-1">
                            Location
                          </p>
                          <div className="flex items-center">
                            <Globe size={16} className="mr-2 text-primary" />
                            <span>{activity.location}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary mb-1">
                            IP Address
                          </p>
                          <div className="flex items-center">
                            <span>{activity.ip}</span>
                            <button
                              className="ml-2 p-1 text-text-secondary hover:text-primary"
                              aria-label="Copy IP Address"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {activity.status === "failed" && (
                        <div className="mt-4 p-3 bg-danger/10 text-danger rounded text-sm">
                          This login attempt was blocked because it came from an
                          unrecognized location.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Smartphone className="mr-2 text-primary" size={20} />
              Two-Factor Authentication
            </h2>

            <div className="flex items-center justify-between mb-4">
              <span>Status</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  twoFactorEnabled
                    ? "bg-success/10 text-success"
                    : "bg-danger/10 text-danger"
                }`}
              >
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>

            {twoFactorEnabled ? (
              <Button
                variant="outline"
                fullWidth
                onClick={() => setTwoFactorEnabled(false)}
              >
                Disable 2FA
              </Button>
            ) : (
              <div className="space-y-4">
                <Button fullWidth onClick={() => setShowQRCode(true)}>
                  Enable 2FA
                </Button>

                {showQRCode && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                    <p className="text-sm text-text-secondary mb-4">
                      Scan this QR code with your authenticator app (like Google
                      Authenticator or Authy)
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white p-1">
                        {/* Placeholder for QR code image */}
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-text-secondary">
                            QR Code Image
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Input
                        label="Enter verification code"
                        placeholder="123456"
                      />
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowQRCode(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          setTwoFactorEnabled(true);
                          setShowQRCode(false);
                        }}
                      >
                        Verify & Enable
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Password Change */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Key className="mr-2 text-primary" size={20} />
              Change Password
            </h2>

            <form className="space-y-4">
              <div>
                <Input
                  label="Current Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  rightIcon={
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-text-secondary hover:text-primary"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
              </div>

              <div>
                <Input
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  rightIcon={
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-text-secondary hover:text-primary"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
              </div>

              <div>
                <Input
                  label="Confirm New Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  rightIcon={
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-text-secondary hover:text-primary"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
              </div>

              <Button fullWidth>Change Password</Button>
            </form>
          </div>

          {/* Security Alerts */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-primary" size={20} />
              Security Alerts
            </h2>

            <div className="space-y-4">
              {securityAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === "warning"
                      ? "border-l-warning bg-warning/5"
                      : "border-l-info bg-info/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{alert.title}</h3>
                    <span className="text-xs text-text-secondary">
                      {alert.date}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {alert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
