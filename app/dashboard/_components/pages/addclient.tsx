import { Button } from '@/components/ui/button';
import { Copy, Link2, Users, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';




const Addclient = ({ setIsOpenaddClient, projectId }: { setIsOpenaddClient: Function , projectId:any}) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [invitationLink, setInvitationLink] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [openInvitationPanel, setOpenInvitationPanel] = useState(false);




    const [input, setInput] = useState({
        clientname: "",
        email: "",
        companyname: "",
        phoneno: "",
        websiteurl: ""
    })

    const handleChange = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const Submit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmit(true);
        try {
            const response = await fetch("/api/clients/add-client", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...input,
                    projectId:projectId
                })
            })

            const data = await response.json();


            if (data.status == 200) {
                setIsSubmit(false);
                setOpenInvitationPanel(true);
                setInvitationLink(data.invitationLink);
                setInput({
                    clientname: "",
                    email: "",
                    companyname: "",
                    phoneno: "",
                    websiteurl: ""

                })
                toast.message("Client is SuccessFully added");

            } else {
                toast.error(data.message);
                setIsOpenaddClient(false);

            }

        } catch (error) {
            toast.error("Please try again after some time");
            return error;
        }
    }

    const copyInvitationLink = async (link: string) => {
        await navigator.clipboard.writeText(link);
        setIsCopied(true);
        toast.success("Invitation link copied!");
    };






    if (openInvitationPanel && invitationLink && !isCopied) {
        return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-gray-100">

                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-3">
                            <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                                <Link2 size={22} />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Client Invitation
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Share this link with your client.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 mb-5">
                        <p className="text-sm text-violet-900 leading-6">
                            Your client can use this link to access the project.
                            If they're not logged in, they'll be redirected to login
                            and then automatically returned here.
                        </p>
                    </div>

                    <div className="mb-5">
                        <label className="text-xs font-medium text-gray-500 mb-2 block">
                            INVITATION LINK
                        </label>

                        <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl bg-gray-50">
                            <Link2 size={16} className="text-gray-400 shrink-0" />

                            <p className="text-sm text-gray-600 truncate flex-1">
                                {invitationLink}
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={() => copyInvitationLink(invitationLink)}
                        className="w-full h-11 rounded-xl"
                    >
                        <Copy size={17} className="mr-2" />
                        Copy Invitation Link
                    </Button>

                    <p className="text-xs text-gray-400 text-center mt-4">
                        Only the invited client can access this project.
                    </p>
                </div>
            </div>
        );
    }


    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-gray-100">

                {/* Header */}
                <div className="flex items-start justify-between mb-6">

                    <div className="flex items-start gap-3">
                        <div className="h-11 w-11 rounded-xl bg-black text-white flex items-center justify-center">
                            <Users size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Add a new client
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Add client details to keep your projects organized.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpenaddClient(false)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Form */}
                <form onSubmit={Submit} className="space-y-4">

                    {/* Client Name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Client name
                        </label>

                        <input
                            type="text"
                            name="clientname"
                            value={input.clientname}
                            onChange={handleChange}
                            placeholder="Enter client name"
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
                            required
                        />
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Company name
                        </label>

                        <input
                            type="text"
                            name="companyname"
                            value={input.companyname}
                            onChange={handleChange}
                            placeholder="Enter company name"
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Email address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={handleChange}
                            placeholder="client@example.com"
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Phone number
                        </label>

                        <input
                            type="tel"
                            name="phoneno"
                            value={input.phoneno}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
                            required
                        />
                    </div>

                    {/* Website */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Website <span className="text-gray-400 font-normal">(optional)</span>
                        </label>

                        <input
                            type="url"
                            name="websiteurl"
                            value={input.websiteurl}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-3">

                        <Button
                            disabled={isSubmit}
                            type="submit"
                            className="flex-1 h-11 rounded-xl"
                        >
                            {isSubmit ? "Adding client..." : "Add client"}
                        </Button>

                        <Button
                            onClick={() => setIsOpenaddClient(false)}
                            type="button"
                            variant="outline"
                            className="flex-1 h-11 rounded-xl"
                        >
                            Cancel
                        </Button>

                    </div>

                </form>

            </div>
        </div>
    )
}

export default Addclient
