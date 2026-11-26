
"use client";

import { useEffect, useState } from "react";
import {
    Users
} from "lucide-react";

import { projectTypes } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";


const Projects = () => {
    const router= useRouter();
    const [projects, setProjects] = useState<projectTypes[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getProjects = async () => {
            try {
                const res = await fetch("/api/projects/project-list");
                if (!res.ok) {
                    setProjects([]);
                    return;
                }

                const data = await res.json();
                setProjects(data.message || []);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };
        getProjects();
    }, []);



    if (loading) {
        return (

            <div className="h-full w-full flex-col flex items-center justify-center min-h-screen">
                <Image
                    src="/logo.png"
                    loading="eager"
                    width={230}
                    height={230}
                    alt="logo"
                    className="animate-pulse duration-700"
                />
            </div>
        )
    }


const draftProject = projects.filter((project)=>project.project_status === "draft").length;




    return (
        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-375 space-y-7">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Projects
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage your Project and their information.
                        </p>
                    </div>

                   
                </div>

                {/* Overview */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <Users size={20} />
                            </div>
                            <span className="text-xs text-gray-400">All Projects</span>
                        </div>

                        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                            {projects.length}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Total Projects</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                          
                            <span className="text-xs text-gray-400">Draft</span>
                        </div>

                        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                            {draftProject}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Draft Projects</p>
                    </div>
                  




                </div>

                {/* Client Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

                    {/* Table Header */}
                    <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                All Projects
                            </h2>
                            <p className="mt-1 text-xs text-gray-400">
                                {projects.length} project found
                            </p>
                        </div>

                      
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70">
                                    <th className="px-5 py-4 text-xs font-medium text-gray-400">
                                        PROJECT_NAME
                                                                            </th>
                                    <th className="px-5 py-4 text-xs font-medium text-gray-400">
                                        DESC..
                                    </th>
                                    <th className="px-5 py-4 text-xs font-medium text-gray-400">
                                        CATEGORY
                                    </th>
                                    <th className="px-5 py-4 text-xs font-medium text-gray-400">
                                    VISIBILITY
                                    </th>
                                    <th className="px-5 py-4 text-xs font-medium text-gray-400">
                                        STATUS
                                    </th>
                                  
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {projects.map((project, index) => (
                                    <tr
                                        key={index}
                                        onClick={()=>router.push(`projects/${project._id}`)}
                                        className="transition hover:bg-gray-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold uppercase text-violet-700">
                                                    {project.project_name?.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {project?.project_name}
                                                    </p>
                                                  
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-sm font-medium text-gray-700">
                                                {project.project_desc.slice(0, 20) || "—"}
                                            </p>
                                        </td>

                                       

                                        {/* Phone */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              
                                                {project.project_category || "—"}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                           <div className="flex items-center gap-2 text-sm text-gray-600">
                                            {project?.project_visibility}
                                           </div>
                                        </td>
                                        {/* Status */}
                                        <td className="px-5 py-4">
                                           <div className="flex items-center gap-2 text-sm text-gray-600">
                                            {project?.project_status}
                                           </div>
                                        </td>

                                       
                                    </tr>
                                ))}

                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-16 text-center">
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                                <Users size={22} />
                                            </div>
                                            <p className="mt-3 text-sm font-medium text-gray-800">
                                                {"No clients yet"}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {"Add your first project to get started."}
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </main>

    );
};

export default Projects;
