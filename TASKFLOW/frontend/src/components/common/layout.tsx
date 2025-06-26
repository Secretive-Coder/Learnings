import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Outlet } from "@tanstack/react-router";
import axios from "axios";
import { Button } from "../ui/button";
import { Circle, Clock, TrendingUp, Zap } from "lucide-react";
import type { LayoutProps, Task } from "@/config/types";



const Layout = ({ onLogout, user }: LayoutProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const { data } = await axios.get("http://localhost:4000/api/tasks/gp", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const arr = Array.isArray(data)
        ? data
        : Array.isArray(data?.tasks)
          ? data.tasks
          : Array.isArray(data?.data)
            ? data.data
            : [];
      setTasks(arr);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error fetching tasks");
      }

      if (axios.isAxiosError(err) && err.response?.status === 401) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const stats = useMemo(() => {
    const completedTasks = tasks.filter(
      (t) =>
        t.completed === true ||
        t.completed === 1 ||
        (typeof t.completed === "string" && t.completed.toLowerCase() === "yes")
    ).length;

    const totalCount = tasks.length;
    const pendingCount = totalCount - completedTasks;
    const completionPercentage = totalCount
      ? Math.round((completedTasks / totalCount) * 100)
      : 0;

    return {
      totalCount,
      completedTasks,
      pendingCount,
      completionPercentage,
    };
  }, [tasks]);

  const StatCard = ({
    title,
    value,
    icon,
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
  }) => (
    <div className="p-2 transition-all duration-300 bg-white border border-purple-100 shadow-sm sm:p-3 rounded-xl hover:shadow-md hover:border-purple-100 group">
      <div className="flex items-center gap-2 ">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 group-hover:from-fuchsia-500/20 group-hover:to-purple-500/20">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold text-transparent sm:text-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text">
            {value}
          </p>
          <p className="text-xs font-medium text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );

  // LOADING
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin" />
      </div>
    );

  // ERROR
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="max-w-md p-4 text-red-600 border border-red-100 bg-red-50 rounded-xl">
          <p className="mb-2 font-medium">Error loading tasks</p>
          <p className="text-sm">{error}</p>
          <Button
            onClick={fetchTasks}
            className="px-4 py-2 mt-4 text-sm font-medium text-red-700 transition-colors duration-200 bg-red-100 rounded-lg hover:bg-red-200"
          >
            Try Again
          </Button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />
      <Sidebar user={user} tasks={tasks} />

      <div className="p-3 pt-16 ml-0 transition-all duration-300 xl:ml-64 lg:ml-64 md:ml-16 sm:p-4 md:p-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 sm:gap-6 ">
          <div className="space-y-3 xl:col-span-2 sm:space-y-4 ">
            <Outlet context={{ tasks, refreshTasks: fetchTasks }} />
          </div>

          <div className="space-y-4 xl:col-span-1 sm:space-y-6">
            <div className="p-4 bg-white border border-purple-100 shadow-sm rounded-xl sm:p-5">
              <h3 className="flex items-center gap-2 mb-3 text-base font-semibold text-gray-800 sm:text-lg sm:mb-4">
                <TrendingUp className="w-5 h-5 text-purple-500 sm:w-5 sm:h-5" />
                Task Statistics
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-4 sm:gap-4 sm:mb-6 ">
                <StatCard
                  title="Total Tasks"
                  value={stats.totalCount}
                  icon={
                    <Circle className="w-3.5 h-3.5 text-purple-500 sm:h-4 sm:w-4" />
                  }
                />
                <StatCard
                  title="Completed Tasks"
                  value={stats.completedTasks}
                  icon={
                    <Circle className="w-3.5 h-3.5 text-green-500 sm:h-4 sm:w-4" />
                  }
                />
                <StatCard
                  title="Pending Tasks"
                  value={stats.pendingCount}
                  icon={
                    <Circle className="w-3.5 h-3.5 text-red-500 sm:h-4 sm:w-4" />
                  }
                />
                <StatCard
                  title="Completion Percentage"
                  value={`${stats.completionPercentage}%`}
                  icon={
                    <Zap className="w-3.5 h-3.5 text-purple-500 sm:h-4 sm:w-4" />
                  }
                />

                <hr className="my-3 border-purple-100 sm:my-4" />

                <div className="space-y-2 sm:space-yes-3">
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="flex items-center text-xs font-medium sm:text-sm gap-1.5 ">
                      <Circle className="w-2.5 h-2.5 text-purple-500 sm:h-3 sm:w-3 fill-purple-500" />
                      Task Progress
                    </span>
                    <span className="text-xs text-purple-700 bg-purple-100 px-1.5 py-0.5 sm:px-2 rounded-full">
                      {stats.completedTasks} / {stats.totalCount}
                    </span>
                  </div>

                  <div className="relative pt-1">
                    <div className="flex gap-1.5 items-center">
                      <div className="flex-1 h-2 overflow-hidden bg-purple-100 rounded-full sm:h-3">
                        <div
                          className="h-full transition-all duration-500 bg-gradient-to-r from-fuchsia-500 to-purple-600"
                          style={{ width: `${stats.completionPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-purple-100 shadow-sm rounded-xl sm:p-5">
              <h3 className="flex items-center gap-2 mb-3 text-base font-semibold text-gray-800 sm:text-lg sm:mb-4">
                <Clock className="w-4 h-4 text-purple-500 sm:w-5 sm:h-5" />
                Recent Activity
              </h3>

              <div className="space-y-2 sm:space-y-3 ">
                {tasks.slice(0, 3).map((task) => (
                  <div
                    key={task._id || task.id}
                    className="flex items-center justify-between p-2 transition-colors duration-200 border border-transparent rounded-lg hover:bg-purple-50/50 sm:p-3 hover:border-purple-100"
                  >
                    <div className="flex-1 min-w-0">
                      <Circle className="w-3 h-3 text-purple-500 sm:w-4 sm:h-4" />
                      <span className="text-sm font-medium text-gray-700 break-words whitespace-normal">
                        {task.title}
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5">
                        {task.createdAt
                          ? new Date(task.createdAt).toLocaleDateString()
                          : "No date"}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-1 text-xs rounded-full shrink-0 ml-2 ${task.completed ? "bg-green-100 text-green-700" : "bg-fuchsia-100 text-fuchsia-700"}`}
                    >
                      {task.completed ? "Done" : "Pending"}
                    </span>
                  </div>
                ))}

                {tasks.length === 0 && (
                  <div className="px-2 py-4 text-center sm:py-6">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-purple-100 rounded-full sm:w-16 sm:h-16 sm:mb-4">
                      <Clock className="w-6 h-6 text-purple-500 sm:w-8 sm:h-8" />
                    </div>
                    <p className="text-sm text-gray-500 ">No recent activity</p>
                    <p className="mt-1 text-xs text-gray-400">
                      Tasks will appear here as you create them
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
