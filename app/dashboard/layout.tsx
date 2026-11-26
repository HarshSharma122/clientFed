import type { Metadata } from "next";
import SideNavbar from "./_components/Sidenavbar";



import { checkUser } from "@/utils/checkuser";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import DashboardAuth from "./dashboardAuth";

export const metadata: Metadata = {
    title: "clientfed",
    description: "A simple client delivery and project approval plateform for freelancer web developer and small agencies",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {

    return (
        <Suspense fallback={
            <div>Loading Dashboard....</div>
        }>
            <div
            >
                <div className="min-h-full flex flex-col">
                    <SideNavbar />
                    <DashboardAuth>{children}</DashboardAuth>
                </div>
            </div>

        </Suspense>
    );
}