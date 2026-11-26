import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projectTypes } from '@/types/types';
import { ArrowLeft, Building2, CalendarDays, CheckCircle2, Flag, FolderOpen, MessageSquare, MoveLeft, Plus, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Overview from './project-taps/overview';
import Addclient from './addclient';

const ProjectsDetails = ({ projectId }: { projectId: any }) => {
    //   now i send this id to server and check this id is present or not 

    const [project, setProject] = useState<projectTypes>();
    const [Pending, setPending] = useState(true);
    const [isopenaddClient, setIsOpenaddClient] = useState(false);

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
            <div>

                {/* main top heading */}
                <div className="mt-2 flex items-center justify-between">

                    <div className="">
                        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                            {project?.project_name}
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            {
                                project?.project_category
                            }

                        </p>
                    </div>


                    <div className="flex  gap-4">
                        <Button onClick={() => setIsOpenaddClient(true)} variant="outline" className="flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm shadow-sm font-medium">
                            <Plus size={18} />
                            Add client
                        </Button>
                        <Button variant="outline" className="flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium shadow-sm transition">
                            <Share2 size={18} />
                            Share project
                        </Button>
                    </div>


                </div>






                <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">

                    <div className="flex items-center gap-3 p-2">
                        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                            <Building2 size={23} />
                        </div>
                        <div>
                            <p className="font-semibold">{project?.client?.clientname || "harsh sharma"}</p>
                            <p className="text-xs text-gray-500">Client</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:pl-6 p-2">
                        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                            <CalendarDays size={23} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Deadline</p>
                            <p className="font-semibold mt-1">
                                {project?.deadline}
                            </p>
                        </div>
                    </div>


                    <div className="md:pl-6 p-2">
                        <div className="flex justify-between mb-3">
                            <p className="text-sm font-medium">Project Progress</p>
                            <p className="text-xs text-gray-500">
                                {completedMilestones} of {milestones.length} milestones
                            </p>
                        </div>

                        <p className="font-bold mb-2">{progress}% completed</p>

                        <div className="h-2.5 bg-violet-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-violet-600 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>







                {/* Summary Cards */}
                <div className="px-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

                    <SummaryCard
                        title="Milestones"
                        value={milestones.length}
                        subtitle={`${completedMilestones} completed`}
                        icon={<Flag size={24} />}
                        color="violet"
                    />

                    <SummaryCard
                        title="Deliverables"
                        value={project?.milestones?.length!}
                        subtitle="Project files and links"
                        icon={<FolderOpen size={24} />}
                        color="blue"
                    />

                    <SummaryCard
                        title="Pending Feedback"
                        value={0}
                        subtitle="Needs attention"
                        icon={<MessageSquare size={24} />}
                        color="orange"
                    />

                    <SummaryCard
                        title="Approved"
                        value={0}
                        subtitle="Approved items"
                        icon={<CheckCircle2 size={24} />}
                        color="green"
                    />
                </div>





                {/* tabs */}

                <Tabs defaultValue="overview" className=" mt-10 px-5">
                    <TabsList className="w-300 py-7 px-3">
                        <TabsTrigger className="p-5" value="overview">Overview</TabsTrigger>
                        <TabsTrigger className="p-5" value="milestones">Milestones</TabsTrigger>
                        <TabsTrigger className="p-5" value="deliverables">Deliverables</TabsTrigger>
                        <TabsTrigger className="p-5" value="feedback">Feedback</TabsTrigger>
                        <TabsTrigger className="p-5" value="approvals">Approvals</TabsTrigger>
                        <TabsTrigger className="p-5" value="activity">Activity</TabsTrigger>
                        <TabsTrigger className="p-5" value="handover">Handover</TabsTrigger>
                        <TabsTrigger className="p-5" value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <Overview project={project} />
                    </TabsContent>


                    <TabsContent value="milestones">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription>
                                    View your key metrics and recent project activity. Track progress
                                    across all your active projects.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                You have 12 active projects and 3 pending tasks.
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="deliverables">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription>
                                    View your key metrics and recent project activity. Track progress
                                    across all your active projects.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                You have 12 active projects and 3 pending tasks.
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="feedback">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription>
                                    View your key metrics and recent project activity. Track progress
                                    across all your active projects.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                You have 12 active projects and 3 pending tasks.
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="approvals">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription>
                                    View your key metrics and recent project activity. Track progress
                                    across all your active projects.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                You have 12 active projects and 3 pending tasks.
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="activity">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription>
                                    View your key metrics and recent project activity. Track progress
                                    across all your active projects.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                You have 12 active projects and 3 pending tasks.
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="handover">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription>
                                    View your key metrics and recent project activity. Track progress
                                    across all your active projects.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                You have 12 active projects and 3 pending tasks.
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                                <CardDescription>
                                    Manage your account preferences and options. Customize your
                                    experience to fit your needs.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Configure notifications, security, and themes.
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>


            </div>




            {
                isopenaddClient && (
                    <Addclient setIsOpenaddClient={setIsOpenaddClient} />
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
