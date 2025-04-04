import {
  ArrowRightLeft,
  LayoutDashboard,
  LockIcon,
  LogOut,
  Send,
  ShieldIcon,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ArrowRightLeft,
  },
  {
    name: "Transfer Funds",
    href: "/transfer",
    icon: Send,
  },
  {
    name: "Account Settings",
    href: "/account",
    icon: UserCog,
  },
  {
    name: "Security",
    href: "/security",
    icon: LockIcon,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center">
          <div className="flex items-center justify-center p-1.5 bg-primary rounded-md mr-2">
            <ShieldIcon size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-primary">SecureBank</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-text-primary hover:text-primary hover:bg-secondary"
                }
              `}
            >
              <item.icon
                className={`${
                  isActive ? "text-white" : "text-text-secondary"
                } mr-3 h-5 w-5`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/login"
          className="flex items-center px-4 py-3 text-sm font-medium text-text-primary hover:text-danger hover:bg-danger/10 rounded-md transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-text-secondary" />
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
