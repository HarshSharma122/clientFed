import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projectTypes } from '@/types/types';
import { ArrowLeft, Building2, CalendarDays, CheckCircle2, ChevronRight, Flag, FolderOpen, MessageSquare, MoveLeft, Plus, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Overview from './project-taps/overview';
import Addclient from './addclient';
import AddOldclient from './addOldClient';

const ProjectsDetails = ({ projectId }: { projectId: any }) => {
    //   now i send this id to server and check this id is present or not 

    const [project, setProject] = useState<projectTypes>();
    const [Pending, setPending] = useState(true);
    const [isopenaddClient, setIsOpenaddClient] = useState(false);
    const [isOpenoldClient, setIsOpenOldClient] = useState(false);






    const completedMilestones = 10;

    const milestones = [];

    const progress = 10;


    useEffect(() => {
        const sendIdToSeverFn = async () => {
            try {
                const response = await fetch(`/api/projects/findProject/${projectId}`);
                const data = await response.json();
                if (data.status != 200) {
                    toast.error(data.message);
                }
                setPending(false);
                setProject(data.message);
            } catch (error) {
                toast.error("Some Error occured Please try again later! sorry for inconvineance");

            }
        }
        sendIdToSeverFn();

    }, [])



    if (Pending) {
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



    return (
        <>
            <div className="space-y-8">

                {/* Project Header */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="space-y-3">

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Projects</span>
                            <ChevronRight size={14} />
                            <span className="text-gray-900 font-medium">Workspace</span>
                        </div>

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
                                {project?.project_name}
                            </h1>

                            <p className="text-sm text-gray-500 mt-2">
                                {project?.project_category}
                            </p>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2">

                        <Button
                            onClick={() => setIsOpenOldClient(true)}
                            variant="outline"
                            className="h-10 rounded-xl px-4 gap-2"
                        >
                            <Plus size={16} />
                            Existing client
                        </Button>

                        <Button
                            onClick={() => setIsOpenaddClient(true)}
                            variant="outline"
                            className="h-10 rounded-xl px-4 gap-2"
                        >
                            <Plus size={16} />
                            Add client
                        </Button>

                        <Button
                            variant="default"
                            className="h-10 rounded-xl px-4 gap-2"
                        >
                            <Share2 size={16} />
                            Share
                        </Button>

                    </div>

                </div>


                {/* Project Overview Panel */}
                <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">

                    <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

                        {/* Client */}
                        <div className="flex items-center gap-4 p-5">

                            <div className="w-11 h-11 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700">
                                <Building2 size={20} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 mb-1">
                                    Client
                                </p>

                                <p className="font-medium text-gray-900 truncate">
                                    {project?.client?.clientname || "No client assigned"}
                                </p>
                            </div>

                        </div>


                        {/* Deadline */}
                        <div className="flex items-center gap-4 p-5">

                            <div className="w-11 h-11 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700">
                                <CalendarDays size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-1">
                                    Deadline
                                </p>

                                <p className="font-medium text-gray-900">
                                    {project?.deadline || "Not set"}
                                </p>
                            </div>

                        </div>


                        {/* Progress */}
                        <div className="p-5">

                            <div className="flex justify-between items-center mb-3">

                                <p className="text-xs text-gray-500">
                                    Project progress
                                </p>

                                <p className="text-sm font-semibold text-gray-900">
                                    {progress}%
                                </p>

                            </div>

                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-black rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <p className="text-xs text-gray-500 mt-2">
                                {completedMilestones} of {milestones.length} milestones completed
                            </p>

                        </div>

                    </div>

                </div>


                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                    <SummaryCard
                        title="Milestones"
                        value={milestones.length}
                        subtitle={`${completedMilestones} completed`}
                        icon={<Flag size={20} />}
                        color="violet"
                    />

                    <SummaryCard
                        title="Deliverables"
                        value={project?.milestones?.length || 0}
                        subtitle="Project files and links"
                        icon={<FolderOpen size={20} />}
                        color="blue"
                    />

                    <SummaryCard
                        title="Pending feedback"
                        value={0}
                        subtitle="Awaiting client response"
                        icon={<MessageSquare size={20} />}
                        color="orange"
                    />

                    <SummaryCard
                        title="Approved"
                        value={0}
                        subtitle="Approved deliverables"
                        icon={<CheckCircle2 size={20} />}
                        color="green"
                    />

                </div>


                {/* Workspace Tabs */}
                <Tabs defaultValue="overview" className="w-full">

                    <TabsList className="w-full justify-start h-auto bg-transparent p-0 border-b border-gray-200 rounded-none overflow-x-auto">

                        <TabsTrigger
                            value="overview"
                            className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Overview
                        </TabsTrigger>

                        <TabsTrigger
                            value="milestones"
                            className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Milestones
                        </TabsTrigger>

                        <TabsTrigger
                            value="deliverables"
                            className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Deliverables
                        </TabsTrigger>

                        <TabsTrigger
                            value="feedback"
                            className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Feedback
                        </TabsTrigger>

                        <TabsTrigger
                            value="approvals"
                            className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Approvals
                        </TabsTrigger>

                        <TabsTrigger
                            value="activity"
                            className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Activity
                        </TabsTrigger>

                        <TabsTrigger
                            value="handover"
                            className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Handover
                        </TabsTrigger>

                        <TabsTrigger
                            value="settings"
                            className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Settings
                        </TabsTrigger>

                    </TabsList>


                    {/* Overview */}
                    <TabsContent value="overview" className="pt-6">
                        <Overview project={project} />
                    </TabsContent>


                    {/* Milestones */}
                    <TabsContent value="milestones" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Milestones</CardTitle>
                                <CardDescription>
                                    Track your project progress through milestones.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Add your milestone component here */}
                            </CardContent>
                        </Card>
                    </TabsContent>


                    {/* Deliverables */}
                    <TabsContent value="deliverables" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Deliverables</CardTitle>
                                <CardDescription>
                                    Manage project files, links and submitted work.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Add your deliverables component here */}
                            </CardContent>
                        </Card>
                    </TabsContent>


                    {/* Feedback */}
                    <TabsContent value="feedback" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Feedback</CardTitle>
                                <CardDescription>
                                    Review feedback shared by your client.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Add your feedback component here */}
                            </CardContent>
                        </Card>
                    </TabsContent>


                    {/* Approvals */}
                    <TabsContent value="approvals" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Approvals</CardTitle>
                                <CardDescription>
                                    Track items waiting for approval and completed approvals.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Add your approval component here */}
                            </CardContent>
                        </Card>
                    </TabsContent>


                    {/* Activity */}
                    <TabsContent value="activity" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Activity</CardTitle>
                                <CardDescription>
                                    Follow the recent activity of this project.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Add your activity component here */}
                            </CardContent>
                        </Card>
                    </TabsContent>


                    {/* Handover */}
                    <TabsContent value="handover" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project handover</CardTitle>
                                <CardDescription>
                                    Prepare and organize everything for the final delivery.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Add your handover component here */}
                            </CardContent>
                        </Card>
                    </TabsContent>


                    {/* Settings */}
                    <TabsContent value="settings" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project settings</CardTitle>
                                <CardDescription>
                                    Manage your project preferences and settings.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Add your project settings component here */}
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>

            </div>
            {
                isopenaddClient && (
                    <Addclient projectId={projectId} setIsOpenaddClient={setIsOpenaddClient} />
                )
            }
            {
                isOpenoldClient && (
                    <AddOldclient projectid={projectId} setIsOpenOldClient={setIsOpenOldClient} />
                )
            }
        </>
    )
}
const SummaryCard = ({
    title,
    value,
    subtitle,
    icon,
    color,
}: {
    title: string;
    value: number;
    subtitle: string;
    icon: React.ReactNode;
    color: "violet" | "blue" | "orange" | "green";
}) => {
    const styles = {
        violet: "bg-violet-50 text-violet-700",
        blue: "bg-blue-50 text-blue-700",
        orange: "bg-orange-50 text-orange-700",
        green: "bg-green-50 text-green-700",
    };

    return (
        <div className={`rounded-2xl p-5 ${styles[color]}`}>
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center">
                    {icon}
                </div>

                <div>
                    <p className="text-sm font-medium">{title}</p>
                    <h2 className="text-2xl font-bold mt-1">{value}</h2>
                    <p className="text-xs mt-1 opacity-80">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectsDetails
