
import React from "react";
import {
    CalendarDays,
    Flag,
    CheckCircle2,
    Circle,
    Upload,
    ArrowRight,
    Clock,
} from "lucide-react";
import { projectTypes } from "@/types/types";

const Overview = ({ project }: { project: projectTypes | undefined }) => {
    return (
        <div className="mt-6 px-1">

            {/* Overview Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-5">

                {/* Project Details */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6">

                    <h2 className="text-xl font-bold text-gray-900">
                        Project Overview
                    </h2>

                    <p className="text-sm text-gray-500 leading-6 mt-3">
                        {project?.project_desc} {"No project description available."}
                    </p>

                    {/* Key Details */}
                    <div className="mt-7">
                        <h3 className="font-semibold text-gray-900 mb-5">
                            Key Details
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            <div>
                                <p className="text-xs text-gray-400 mb-2">
                                    Project Type
                                </p>

                                <span className="inline-flex px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 text-xs font-medium">
                                    {project?.project_category || "Not specified"}
                                </span>
                            </div>



                            {
                                project?.project_start_date && (

                                    <div>
                                        <p className="text-xs text-gray-400 mb-2">
                                            Start Date
                                        </p>
                                        <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <CalendarDays size={16} className="text-gray-400" />
                                            {project.project_start_date}
                                        </p>
                                    </div>
                                )
                            }

                            <div>
                                <p className="text-xs text-gray-400 mb-2">
                                    Deadline
                                </p>

                                <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <CalendarDays size={16} className="text-gray-400" />
                                    {project?.deadline}
                                </p>
                            </div>


                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="border-t border-gray-100 mt-8 pt-6">

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-gray-900">
                                Recent Activity
                            </h3>

                            <button
                                className="text-sm text-violet-600 flex items-center gap-1 hover:gap-2 transition-all"
                            >
                                View All <ArrowRight size={15} />
                            </button>
                        </div>

                        {/* {activities.length > 0 ? (
              <div className="space-y-5">
                {activities.slice(0, 4).map((activity) => (
                  <div
                    key={activity._id}
                    className="flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                      <Upload size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {activity.title}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 py-4">
                No recent activity yet.
              </p>
            )} */}
                    </div>
                </div>

                {/* Upcoming Milestones */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6">

                    <div className="flex items-center justify-between mb-7">
                        <h2 className="text-lg font-bold text-gray-900">
                            Upcoming Milestones
                        </h2>

                        <button
                            className="text-sm text-violet-600 flex items-center gap-1 hover:gap-2 transition-all"
                        >
                            View All <ArrowRight size={15} />
                        </button>
                    </div>

                    {/* {milestones.length > 0 ? (
            <div>
              {[...milestones]
                .sort(
                  (a, b) =>
                    (a.position ?? 0) - (b.position ?? 0)
                )
                .slice(0, 6)
                .map((milestone, index, array) => {
                  const status = getStatus(milestone.status);

                  return (
                    <div
                      key={milestone._id}
                      className="relative flex gap-4 pb-7 last:pb-0"
                    >
                      {index !== array.length - 1 && (
                        <div className="absolute left-[10px] top-6 bottom-0 w-px bg-gray-200" />
                      )}

                      <div className="relative z-10 bg-white h-fit">
                        {status.icon}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-800">
                          {milestone.title}
                        </h3>

                        <p className={`text-xs mt-1 ${status.color}`}>
                          {status.label}
                          <span className="text-gray-400">
                            {" "}· {formatDate(milestone.startdate)}
                            {" "}– {formatDate(milestone.duedate)}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Clock size={30} className="text-gray-300" />

              <p className="text-sm text-gray-500 mt-3">
                No milestones added yet.
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Add milestones to track project progress.
              </p>
            </div>
          )} */}

                    {/* Milestone Summary */}
                    {/* {milestones.length > 0 && (
            <div className="mt-6 pt-5 border-t border-gray-100">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Milestone progress</span>
                <span>
                  {completedMilestones}/{milestones.length} completed
                </span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-600 rounded-full transition-all"
                  style={{
                    width: `${
                      (completedMilestones / milestones.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          )} */}
                </div>
            </div>
        </div>
    );
};

export default Overview;
