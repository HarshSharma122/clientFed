"use client"

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  LayoutDashboard, CheckCircle2,
  LockKeyhole
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
   const router = useRouter();
  
      const [isSubmit, setIsSubmit] = useState(false);
      const [input, setInput] = useState({
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
  
              const response = await fetch("/api/Auth/signin", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
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
    <main className="grid min-h-screen bg-white lg:grid-cols-2">

      {/* LEFT SECTION */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-[#101323] p-12 text-white lg:flex xl:p-16">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-[100px]" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
         
          <span className="text-2xl font-bold">
            ClientFed<span className="text-violet-400"></span>
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-violet-200">
            <LockKeyhole size={15} />
            Your workspace awaits
          </div>

          <h1 className="text-4xl font-semibold leading-tight xl:text-5xl">
            Good to see you
            <br />
            <span className="text-violet-400">
              back.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
            Pick up right where you left off. Manage your projects,
            review milestones and keep your clients connected.
          </p>

          {/* Project Preview */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-[#1a1e32] p-6 shadow-2xl">

            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-medium">Your Workspace</p>
                <p className="mt-1 text-xs text-gray-400">
                  Project activity overview
                </p>
              </div>
              <div className="rounded-lg bg-violet-500/10 p-2 text-violet-400">
                <LayoutDashboard size={19} />
              </div>
            </div>

            <div className="mt-5 space-y-4">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Website Development</p>
                  <p className="mt-1 text-xs text-gray-400">
                    3 milestones
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  Active
                </span>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <div className="flex-1">
                  <p className="text-sm">UI Design</p>
                  <p className="mt-1 text-xs text-gray-500">Approved by client</p>
                </div>
                <span className="text-xs text-emerald-400">Done</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-[18px] w-[18px] rounded-full border-2 border-violet-400" />
                <div className="flex-1">
                  <p className="text-sm">Frontend Development</p>
                  <p className="mt-1 text-xs text-gray-500">Waiting for feedback</p>
                </div>
                <span className="text-xs text-violet-300">Review</span>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* RIGHT SECTION */}
      <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-12">

        <div className="w-full max-w-[420px]">

          {/* Mobile logo */}
          <div className="mb-14 flex items-center gap-2 lg:hidden">
            <div className="rounded-lg bg-violet-600 p-2 text-white">
              <LayoutDashboard size={20} />
            </div>
            <span className="text-xl font-bold text-[#101323]">
              ClientFed.
            </span>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <p className="mb-3 text-sm font-semibold tracking-wide text-violet-600">
              WELCOME BACK
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-[#17182b]">
              Sign in to your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Enter your details to access your workspace.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="h-12 rounded-xl border-gray-200 px-4 focus-visible:ring-violet-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-violet-600 hover:text-violet-700"
                >
                  Forgot password?
                </Link>
              </div>

              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="h-12 rounded-xl border-gray-200 px-4 focus-visible:ring-violet-500"
              />
            </div>

            <Button
            disabled={isSubmit}
            onClick={handleSubmit}
              type="submit"
              className="h-12 w-full rounded-xl bg-violet-600 font-semibold hover:bg-violet-700"
            >
              Sign in
              <ArrowRight size={17} className="ml-2" />
            </Button>

          </form>

          {/* Signup */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/auth/get-started"
              className="font-semibold text-violet-600 hover:text-violet-700"
            >
              Create account
            </Link>
          </p>

        </div>
      </section>
    </main>
  );
};

export default Page;
