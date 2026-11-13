"use client"


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    LayoutDashboard, Sparkles
} from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

    const [isSubmit, setIsSubmit] = useState(false);
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    })


    const handleChange = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value});
    }


    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            setIsSubmit(true);

            const response = await fetch("/api/Auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  username:input.username,
                  email:input.email,
                  password:input.password
                })
            });
            const data = await response.json();
            if (data.status!=200) {
                setIsSubmit(false);
                if(data.error){
                    toast.error(data.error[0].message);
                }
                else{
                    toast.error(data.message);
                }
            }
            if (data.status == 200) {
                setIsSubmit(false);
                toast.message(data.message);
                router.push("/dashboard");
            }
        } catch (error) {
            toast.error("Some Error occured!");
        }

    }


    return (
        <main className="min-h-screen grid lg:grid-cols-2 bg-white">

            {/* LEFT SIDE */}
            <section className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#101323] p-12 xl:p-16 text-white">

                {/* Background effects */}
                <div className="absolute -top-40 -left-32 h-125 w-125 rounded-full bg-violet-600/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-100 w-100 rounded-full bg-indigo-500/20 blur-[120px]" />

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">

                    <span className="text-2xl font-bold tracking-tight">
                        ClientFed
                    </span>
                </div>

                {/* Main content */}
                <div className="relative z-10 max-w-xl">

                    <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-violet-200">
                        <Sparkles size={15} />
                        Built for better collaboration
                    </div>

                    <h1 className="text-4xl font-semibold leading-tight xl:text-5xl">
                        Manage projects.
                        <br />
                        Get approvals.
                        <br />
                        <span className="text-violet-400">
                            Grow together.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
                        One place to manage projects, share deliverables,
                        collect feedback and keep your clients in the loop.
                    </p>

                    {/* Dashboard preview */}
                    <div className="mt-12 rounded-2xl border border-white/10 bg-[#1a1e32] p-5 shadow-2xl">

                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div>
                                <p className="text-sm font-medium">Website Redesign</p>
                                <p className="mt-1 text-xs text-gray-400">
                                    Project overview
                                </p>
                            </div>
                            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                                In Progress
                            </span>
                        </div>

                        <div className="mt-5 space-y-5">

                            <div>
                                <div className="mb-2 flex justify-between text-xs">
                                    <span className="text-gray-400">Project progress</span>
                                    <span>68%</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/10">
                                    <div className="h-2 w-[68%] rounded-full bg-violet-500" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-emerald-400" size={18} />
                                        <span className="text-sm">Design & Wireframes</span>
                                    </div>
                                    <span className="text-xs text-gray-400">Approved</span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-4 w-4 rounded-full border-2 border-violet-400" />
                                        <span className="text-sm">Frontend Development</span>
                                    </div>
                                    <span className="text-xs text-violet-300">Reviewing</span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-4 w-4 rounded-full border border-gray-600" />
                                        <span className="text-sm">Final Delivery</span>
                                    </div>
                                    <span className="text-xs text-gray-500">Upcoming</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>



            </section>

            {/* RIGHT SIDE */}
            <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-12">

                <div className="w-full max-w-105">

                    {/* Mobile logo */}
                    <div className="mb-12 flex items-center gap-2 lg:hidden">
                        <div className="rounded-lg bg-violet-600 p-2 text-white">
                            <LayoutDashboard size={20} />
                        </div>
                        <span className="text-xl font-bold text-[#101323]">
                            ClientFed.
                        </span>
                    </div>

                    <div className="mb-9">
                        <p className="mb-3 text-sm font-medium text-violet-600">
                            GET STARTED FOR FREE
                        </p>

                        <h2 className="text-3xl font-semibold tracking-tight text-[#17182b]">
                            Create your account
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            Start managing projects and building better
                            relationships with your clients.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5">

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Full name
                            </label>
                            <Input
                                type="text"
                                name="username"
                                value={input.username}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="h-12 rounded-xl border-gray-200 px-4 focus-visible:ring-violet-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <Input
                                name="email"
                                value={input.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="john@example.com"
                                className="h-12 rounded-xl border-gray-200 px-4 focus-visible:ring-violet-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Input
                                name="password"
                                value={input.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Create a strong password"
                                className="h-12 rounded-xl border-gray-200 px-4 focus-visible:ring-violet-500"
                            />
                            <p className="text-xs text-gray-400">
                                Use at least 8 characters.
                            </p>
                        </div>

                        <Button
                            disabled={isSubmit}
                            type="submit"
                            onClick={handleSubmit}
                            className="h-12 w-full rounded-xl bg-violet-600 text-sm font-semibold hover:bg-violet-700"
                        >
                            Create your account
                            <ArrowRight className="ml-2" size={17} />
                        </Button>

                    </form>

                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-xs text-gray-400">OR</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="font-semibold text-violet-600 hover:text-violet-700"
                        >
                            Sign in
                        </Link>
                    </p>



                </div>
            </section>
        </main>
    );
};

export default Page;
