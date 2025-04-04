import { Bell, ChevronDown, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Login Alert",
      message: "New login from Windows device in New York",
      time: "3 mins ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Fund Transfer Successful",
      message: "Successfully transferred $500 to John Doe",
      time: "1 hour ago",
      isRead: false,
    },
    {
      id: 3,
      title: "Account Statement",
      message: "Your monthly statement is ready for download",
      time: "1 day ago",
      isRead: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            className="p-2 mr-4 rounded-md lg:hidden hover:bg-gray-100"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <h1 className="text-xl font-semibold text-text-primary">
            Welcome, John Doe
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-gray-100 relative"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-xs flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                    <button className="text-xs text-primary hover:text-primary-dark">
                      Mark all as read
                    </button>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-text-secondary">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          notification.isRead ? "" : "bg-blue-50"
                        }`}
                      >
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-text-primary">
                            {notification.title}
                          </p>
                          <span className="text-xs text-text-secondary">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary mt-1">
                          {notification.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-gray-200 py-2 px-4">
                  <Link
                    href="/notifications"
                    className="text-xs text-primary hover:text-primary-dark"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <ChevronDown size={16} className="text-text-secondary" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <Link
                  href="/account"
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50"
                >
                  Account Settings
                </Link>
                <Link
                  href="/security"
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50"
                >
                  Security
                </Link>
                <div className="border-t border-gray-200 my-1"></div>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm text-danger hover:bg-gray-50"
                >
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
