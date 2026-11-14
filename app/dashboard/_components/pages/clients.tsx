
"use client";

import { useEffect, useState } from "react";
import {
    Search, MoreHorizontal,
    Users,
    Globe,
    Mail,
    Phone,
    ArrowUpRight,
    UserRound
} from "lucide-react";

import { clientTypes } from "@/types/types";
import Image from "next/image";


const Clients = () => {
    const [clients, setClients] = useState<clientTypes[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getClients = async () => {
            try {
                const res = await fetch("/api/clients/client-list");
                if (!res.ok) {
                    setClients([]);
                    return;
                }

                const data = await res.json();
                setClients(data.message || []);
            } catch (error) {
                console.error("Failed to fetch clients:", error);
                setClients([]);
            } finally {
                setLoading(false);
            }
        };

        getClients();
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


    const activeclient = clients.filter((client)=>client.status === "active").length;




    return (
        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-375 space-y-7">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                            Clients
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage your clients and their company information.
                        </p>
                    </div>

                   
                </div>

                {/* Overview */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <Users size={20} />
                            </div>
                            <span className="text-xs text-gray-400">All clients</span>
                        </div>

                        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                            {clients.length}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Total clients</p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <UserRound size={20} />
                            </div>
                            <span className="text-xs text-gray-400">Currently active</span>
                        </div>

                        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
                            {activeclient}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Active clients</p>
                    </div>
                </div>

                {/* Client Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

                    {/* Table Header */}
                    <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                All Clients
                            </h2>
                            <p className="mt-1 text-xs text-gray-400">
                                {clients.length} clients found
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-xs">
                            <Search
                                size={17}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search clients..."
                                className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70">
                                    <th className="px-5 py-4 text-xs font-medium text-gray-400">
                                        CLIENT
                                    </th>
                                    <th className="px-5 py-4 text-xs font-medium text-gray-400">
                                        COMPANY
                                    </th>
                                    <th className="px-5 py-4 text-xs font-medium text-gray-400">
                                        WEBSITE
                                    </th>
                                    <th className="px-5 py-4 text-xs font-medium text-gray-400">
                                        PHONE
                                    </th>
                                    <th className="px-5 py-4 text-xs font-medium text-gray-400">
                                        STATUS
                                    </th>
                                    <th className="px-5 py-4 text-xs font-medium text-gray-400">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {clients.map((client, index) => (
                                    <tr
                                        key={index}
                                        className="transition hover:bg-gray-50/70"
                                    >
                                        {/* Client */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold uppercase text-violet-700">
                                                    {client.clientname?.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {client.clientname}
                                                    </p>
                                                    <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                                                        <Mail size={12} />
                                                        {client.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Company */}
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-medium text-gray-700">
                                                {client.companyname || "—"}
                                            </p>
                                        </td>

                                        {/* Website */}
                                        <td className="px-5 py-4">
                                            {client.websiteurl ? (
                                                <a
                                                    href={
                                                        client.websiteurl.startsWith("http")
                                                            ? client.websiteurl
                                                            : `https://${client.websiteurl}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-sm text-violet-600 hover:underline"
                                                >
                                                    <Globe size={14} />
                                                    {client.websiteurl}
                                                    <ArrowUpRight size={13} />
                                                </a>
                                            ) : (
                                                <span className="text-sm text-gray-400">—</span>
                                            )}
                                        </td>

                                        {/* Phone */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone size={14} className="text-gray-400" />
                                                {client.phoneno || "—"}
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${client.status === "active"
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "bg-gray-100 text-gray-500"
                                                    }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${client.status === "active"
                                                            ? "bg-emerald-500"
                                                            : "bg-gray-400"
                                                        }`}
                                                />
                                                {client.status}
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td className="px-5 py-4">
                                            <button
                                                type="button"
                                                title={`More options for ${client.clientname}`}
                                                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                <MoreHorizontal size={19} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {clients.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-16 text-center">
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                                <Users size={22} />
                                            </div>
                                            <p className="mt-3 text-sm font-medium text-gray-800">
                                                {search ? "No clients found" : "No clients yet"}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {search
                                                    ? "Try searching with a different name or email."
                                                    : "Add your first client to get started."}
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

export default Clients;
