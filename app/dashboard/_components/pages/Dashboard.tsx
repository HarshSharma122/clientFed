
"use client";

import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileUp,
  FolderKanban,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import Addclient from "./addclient";

const stats = [
  {
    title: "Total Projects",
    value: "12",
    change: "+12%",
    description: "Compared to last month",
    icon: FolderKanban,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Completed Projects",
    value: "08",
    change: "+20%",
    description: "Compared to last month",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Total Clients",
    value: "06",
    change: "+14%",
    description: "Compared to last month",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Pending Approvals",
    value: "04",
    change: "Needs attention",
    description: "Waiting for client review",
    icon: Clock3,
    color: "bg-orange-50 text-orange-600",
  },
];

const projects = [
  {
    name: "ABC Company Website",
    client: "ABC Corporation",
    progress: 75,
    status: "In Progress",
    color: "bg-violet-600",
    statusColor: "bg-violet-50 text-violet-700",
    deadline: "Nov 24, 2026",
    initials: "AC",
  },
  {
    name: "E-commerce Application",
    client: "Shopify Store",
    progress: 45,
    status: "In Progress",
    color: "bg-blue-600",
    statusColor: "bg-blue-50 text-blue-700",
    deadline: "Nov 28, 2026",
    initials: "EC",
  },
  {
    name: "Portfolio Website",
    client: "James Wilson",
    progress: 100,
    status: "Completed",
    color: "bg-emerald-600",
    statusColor: "bg-emerald-50 text-emerald-700",
    deadline: "Nov 10, 2026",
    initials: "PW",
  },
];

const activities = [
  {
    title: "New deliverable uploaded",
    detail: "ABC Company Website",
    time: "2 hours ago",
    icon: FileUp,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Client requested changes",
    detail: "E-commerce Application",
    time: "4 hours ago",
    icon: MessageSquare,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Milestone approved",
    detail: "Portfolio Website",
    time: "Yesterday",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "New project created",
    detail: "CRM Dashboard",
    time: "Yesterday",
    icon: FolderKanban,
    color: "bg-blue-50 text-blue-600",
  },
];

const Dashboard = () => {


  const [isopenaddClient, setIsOpenaddClient] = useState(false);


  return (

    <>
      <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px] space-y-7">

          {/* Header */}
          <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">
                {new Date().toDateString()}
              </p>

              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Welcome back, Harsh
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Here's what's happening with your projects today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                <Bell size={19} />
              </Button>

              <Button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6941C6] px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[#5835AD]">
                <Plus size={18} />
                New Project
              </Button>
              <Button onClick={() => setIsOpenaddClient(true)} variant="outline" className="flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium">
                <Plus size={18} />
                Add client
              </Button>
            </div>
          </header>

          {/* Search */}
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search projects, clients..."
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200/80 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}>
                      <Icon size={21} />
                    </div>

                    <button className="text-gray-400 hover:text-gray-700">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-2">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                      {item.value}
                    </h2>

                    <span className="mb-1 text-xs font-medium text-emerald-600">
                      {item.change}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Analytics and Activity */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">

            {/* Project Analytics */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity size={19} className="text-violet-600" />
                    <h2 className="font-semibold text-gray-900">
                      Project Overview
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    Track your project activity over time
                  </p>
                </div>

                <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none">
                  <option>This Month</option>
                  <option>Last 3 Months</option>
                  <option>This Year</option>
                </select>
              </div>

              <div className="mt-8">
                <div className="flex items-end gap-3">
                  <h3 className="text-3xl font-semibold text-gray-900">
                    12
                  </h3>
                  <span className="mb-1 flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <ArrowUpRight size={15} />
                    12% growth
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  Total projects created
                </p>
              </div>

              {/* Chart */}
              <div className="mt-7 w-full">
                <svg
                  viewBox="0 0 700 190"
                  className="h-auto w-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7950D9" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#7950D9" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {[20, 65, 110, 155].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="700"
                      y2={y}
                      stroke="#F0EFF4"
                      strokeDasharray="4 5"
                    />
                  ))}

                  <path
                    d="M0 145 C55 130 70 80 140 105 S220 125 280 78 S365 90 420 70 S510 115 560 82 S640 92 700 30 L700 175 L0 175 Z"
                    fill="url(#chartFill)"
                  />

                  <path
                    d="M0 145 C55 130 70 80 140 105 S220 125 280 78 S365 90 420 70 S510 115 560 82 S640 92 700 30"
                    fill="none"
                    stroke="#7950D9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <circle cx="700" cy="30" r="5" fill="#7950D9" />
                </svg>

                <div className="mt-3 flex justify-between text-[11px] text-gray-400">
                  <span>Nov 01</span>
                  <span>Nov 07</span>
                  <span>Nov 14</span>
                  <span>Nov 21</span>
                  <span>Nov 30</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">
                  Recent Activity
                </h2>

                <button className="flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-800">
                  View all
                  <ChevronRight size={15} />
                </button>
              </div>

              <div className="mt-7 space-y-6">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <div key={index} className="flex gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.color}`}>
                        <Icon size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {activity.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-400">
                          {activity.detail}
                        </p>

                        <p className="mt-1 text-[11px] text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-gray-900">
                  My Projects
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Keep track of your ongoing work
                </p>
              </div>

              <button className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-800">
                View all projects
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="mt-6 hidden grid-cols-[2fr_1fr_1.2fr_1fr_auto] gap-4 border-b border-gray-100 pb-3 text-xs font-medium text-gray-400 md:grid">
              <span>PROJECT</span>
              <span>DEADLINE</span>
              <span>PROGRESS</span>
              <span>STATUS</span>
              <span></span>
            </div>

            <div className="divide-y divide-gray-100">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="grid grid-cols-1 gap-4 py-5 md:grid-cols-[2fr_1fr_1.2fr_1fr_auto] md:items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-semibold text-white ${project.color}`}>
                      {project.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {project.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {project.client}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CalendarDays size={15} className="text-gray-400" />
                    {project.deadline}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-gray-400">Progress</span>
                      <span className="font-medium text-gray-700">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${project.color}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>

                  <button className="hidden text-gray-400 hover:text-gray-700 md:block">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>



        </div>
      </main>


      {
        isopenaddClient && (
          <Addclient setIsOpenaddClient={setIsOpenaddClient} />
        )
      }
    </>
  );
};

export default Dashboard;
