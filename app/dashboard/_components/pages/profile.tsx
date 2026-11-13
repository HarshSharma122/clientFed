
"use client";

import { useEffect, useState } from "react";
import {
    UserRound,
    CalendarDays,
    Bell,
    ShieldCheck,
    LogOut,
    Trash2,
    Mail,
    Check,
    AlertTriangle,
    ArrowUpRight,
    Crown,
    Settings,
    LockKeyhole,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { userTypes } from "@/types/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const Profile = () => {
    const router = useRouter();

    const [user, setUser] = useState<userTypes>();
    const [loading, setLoading] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    // Fetch user
    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch("/api/Auth/user");

                if (!res.ok) {
                    setUser(undefined);
                    return;
                }

                const data = await res.json();
                setUser(data.message);
            } catch {
                setUser(undefined);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    // Logout
    const logout = async () => {
        try {
            setIsLogout(true);

            const response = await fetch("/api/Auth/logout");
            if (!response.ok) {
                throw new Error("Logout failed");
            }

            toast.success("Successfully logged out");
            router.push("/auth/login");
            router.refresh();
        } catch {
            toast.error("Please try again later");
        } finally {
            setIsLogout(false);
        }
    };

    const initials =
        user?.username
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase();


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



    return (
        <main className="min-h-screen bg-[#F8F8FB] px-4 py-8 sm:px-7 lg:px-10 lg:py-10">

            <div className="mx-auto max-w-6xl">

                {/* PAGE HEADER */}
                <div className="mb-9">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                        <Settings size={15} />
                        Account settings
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-[#17182B] sm:text-4xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Manage your personal information, account and preferences.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.5fr_0.85fr]">

                    {/* LEFT COLUMN */}
                    <div className="space-y-6">

                        {/* PROFILE CARD */}
                        <section className="relative overflow-hidden rounded-[26px] bg-[#101323] p-6 text-white sm:p-8">

                            <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-violet-600/20 blur-[90px]" />

                            <div className="absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-indigo-500/15 blur-[90px]" />

                            <div className="relative">

                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                                    {/* Avatar */}
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[22px] border border-white/10 bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold shadow-xl shadow-violet-900/30">
                                        {initials}
                                    </div>

                                    {/* User Details */}
                                    <div className="min-w-0 flex-1">

                                        <div className="flex flex-wrap items-center gap-3">

                                            <h2 className="text-2xl font-semibold capitalize tracking-tight sm:text-3xl">
                                                {user?.username}
                                            </h2>

                                            {user?.plan === "pro" && (
                                                <span className="flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                                                    <Crown size={13} />
                                                    Pro Member
                                                </span>
                                            )}

                                        </div>

                                        <p className="mt-2 flex items-center gap-2 break-all text-sm text-white/50">
                                            <Mail size={15} className="shrink-0" />
                                            {user?.email}
                                        </p>

                                        <p className="mt-3 text-xs text-white/35">
                                            {new Date(user?.createdAt!).toDateString()}
                                        </p>

                                    </div>

                                    <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 sm:flex">
                                        <UserRound size={22} className="text-violet-300" />
                                    </div>

                                </div>

                                {/* Account Stats */}
                                <div className="mt-9 grid grid-cols-2 gap-3">

                                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                        <p className="text-xs text-white/40">
                                            Account status
                                        </p>

                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                            <span className="text-sm font-medium">Active</span>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                        <p className="text-xs text-white/40">
                                            Current plan
                                        </p>

                                        <p className="mt-2 text-sm font-medium">
                                            {user?.plan || "Free"}
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </section>

                        {/* PERSONAL INFORMATION */}
                        <section className="rounded-[24px] border border-[#E9E9F0] bg-white p-6 sm:p-7">

                            <div className="mb-6 flex items-center justify-between">

                                <div>
                                    <h3 className="font-semibold text-[#17182B]">
                                        Personal Information
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Your basic account information.
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                    <UserRound size={19} />
                                </div>

                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <p className="text-xs font-medium text-gray-400">
                                        Full name
                                    </p>
                                    <p className="mt-2 text-sm font-semibold capitalize text-[#25263A]">
                                        {user?.username}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-gray-400">
                                        Email address
                                    </p>
                                    <p className="mt-2 break-all text-sm font-semibold text-[#25263A]">
                                        {user?.email}
                                    </p>
                                </div>

                            </div>

                        </section>

                        {/* NOTIFICATIONS */}
                        <section className="rounded-[24px] border border-[#E9E9F0] bg-white p-6 sm:p-7">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                    <Bell size={20} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-[#17182B]">
                                        Notifications
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                        Receive updates about projects, milestones, client feedback and deliverables.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={notificationsEnabled}
                                    aria-label="Toggle notifications"
                                    onClick={() =>
                                        setNotificationsEnabled((prev) => !prev)
                                    }
                                    className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition ${notificationsEnabled
                                        ? "bg-violet-600"
                                        : "bg-gray-200"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${notificationsEnabled
                                            ? "left-6"
                                            : "left-1"
                                            }`}
                                    />
                                </button>

                            </div>

                            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                                <p className="text-xs text-gray-400">
                                    {notificationsEnabled
                                        ? "Notifications are enabled"
                                        : "Notifications are disabled"}
                                </p>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${notificationsEnabled
                                        ? "bg-violet-50 text-violet-600"
                                        : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    {notificationsEnabled ? "On" : "Off"}
                                </span>
                            </div>

                        </section>

                        {/* DANGER ZONE */}
                        <section className="rounded-[24px] border border-red-100 bg-white p-6 sm:p-7">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                    <Trash2 size={20} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-[#17182B]">
                                        Delete Account
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                        Permanently remove your account and associated data.
                                        This action cannot easily be undone.
                                    </p>
                                </div>

                            </div>

                            {!showDeleteConfirm ? (

                                <Button
                                    variant="outline"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="mt-5 rounded-xl border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                                >
                                    <Trash2 size={15} className="mr-2" />
                                    Delete my account
                                </Button>

                            ) : (

                                <div className="mt-5 rounded-2xl bg-red-50 p-4">

                                    <div className="flex items-start gap-3">
                                        <AlertTriangle size={19} className="mt-0.5 shrink-0 text-red-500" />

                                        <div>
                                            <p className="text-sm font-semibold text-red-700">
                                                Are you sure?
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-red-600">
                                                Account deletion must be securely implemented through your backend before any data is removed.
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="mt-4 rounded-xl border-red-200 bg-white text-red-600 hover:bg-red-100"
                                    >
                                        Cancel
                                    </Button>

                                </div>

                            )}

                        </section>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6">

                        {/* MEMBERSHIP */}
                        <section className="rounded-[24px] border border-[#E9E9F0] bg-white p-6">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                    <Crown size={21} />
                                </div>

                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                                    Active
                                </span>

                            </div>

                            <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-gray-400">
                                CURRENT MEMBERSHIP
                            </p>

                            <h3 className="mt-2 text-3xl font-bold text-[#17182B]">
                                {user?.plan || "Free"}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-400">
                                Manage your projects, collaborate with clients and keep everything organized.
                            </p>

                            <div className="my-6 border-t border-gray-100" />

                            <div className="flex items-center gap-3">
                                <CalendarDays size={19} className="text-violet-500" />

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Member since
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-[#25263A]">
                                        {new Date(user?.createdAt!).toDateString()}
                                    </p>
                                </div>
                            </div>

                        </section>

                        {/* SECURITY */}
                        <section className="rounded-[24px] border border-[#E9E9F0] bg-white p-6">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <ShieldCheck size={21} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#17182B]">
                                        Account Security
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Keep your account protected.
                                    </p>
                                </div>

                            </div>

                            <div className="mt-6 space-y-4">

                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                                        <LockKeyhole size={17} />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[#25263A]">
                                            Authentication
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Secure account access
                                        </p>
                                    </div>

                                    <Check size={17} className="text-emerald-500" />
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                                        <Mail size={17} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[#25263A]">
                                            Email address
                                        </p>
                                        <p className="mt-1 truncate text-xs text-gray-400">
                                            {user?.email}
                                        </p>
                                    </div>

                                    <Check size={17} className="text-emerald-500" />
                                </div>

                            </div>

                            <div className="mt-5 rounded-xl bg-[#F8F8FB] p-3">
                                <p className="text-xs leading-5 text-gray-500">
                                    Your account information is managed securely by ClientFed.
                                </p>
                            </div>

                        </section>

                        {/* LOGOUT */}
                        <section className="rounded-[24px] border border-[#E9E9F0] bg-white p-6">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                                    <LogOut size={20} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#17182B]">
                                        Sign out
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Sign out of your ClientFed account.
                                    </p>
                                </div>

                            </div>

                            <Button
                                variant="outline"
                                disabled={isLogout}
                                onClick={logout}
                                className="mt-6 h-11 w-full justify-between rounded-xl border-gray-200 text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                                {isLogout ? "Signing out..." : "Logout"}
                                <ArrowUpRight size={17} />
                            </Button>

                        </section>

                        {/* FOOTER */}
                        <div className="px-2 text-center text-xs text-gray-400">
                            <p>Made for better client collaboration.</p>
                            <p className="mt-2 font-semibold tracking-wide text-violet-500">
                                CLIENTFED.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
};

export default Profile;
