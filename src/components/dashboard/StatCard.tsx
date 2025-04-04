import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "success" | "warning" | "danger" | "info";
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "primary",
}: StatCardProps) => {
  const colors = {
    primary: {
      bg: "bg-primary/10",
      icon: "text-primary",
    },
    success: {
      bg: "bg-success/10",
      icon: "text-success",
    },
    warning: {
      bg: "bg-warning/10",
      icon: "text-warning",
    },
    danger: {
      bg: "bg-danger/10",
      icon: "text-danger",
    },
    info: {
      bg: "bg-info/10",
      icon: "text-info",
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <h3 className="text-2xl font-bold text-text-primary">{value}</h3>

          {trend && (
            <div className="flex items-center">
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? "text-success" : "text-danger"
                }`}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-text-secondary ml-1">
                vs. last month
              </span>
            </div>
          )}
        </div>

        <div className={`p-3 rounded-full ${colors[color].bg}`}>
          <Icon className={`h-5 w-5 ${colors[color].icon}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
