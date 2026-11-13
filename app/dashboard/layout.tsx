import type { Metadata } from "next";
import SideNavbar from "./_components/Sidenavbar";
import { checkUser } from "@/utils/checkuser";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "clientfed",
    description: "A simple client delivery and project approval plateform for freelancer web developer and small agencies",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
    const user = await checkUser();
    if(!user){
        redirect("/auth/login");
    }
    return (
        <div
        >

            <div className="min-h-full flex flex-col">

               <SideNavbar/>    
                {children}
                
                
            </div>
        </div>
    );
}