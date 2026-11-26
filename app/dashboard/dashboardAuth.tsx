import { checkUser } from "@/utils/checkuser";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export default async function DashboardAuth({ children }: { children: React.ReactNode }) {
    await connection(); // it will actully runs on user request prerender nhi hota h 
    const user = await checkUser(); 
    if (!user) {
        redirect("/auth/login");
    }
    return <>{children}</>;
}