import { Button } from '@/components/ui/button';
import { Copy, Link2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';




const Addclient = ({ setIsOpenaddClient }: { setIsOpenaddClient: Function }) => {
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
                    ...input
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
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className="bg-white w-full max-w-md  rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-medium">Add a client</h2>

                    <button onClick={() => setIsOpenaddClient(false)} className="text-xl">
                        ✕
                    </button>
                </div>

                <form className="space-y-4">
                    <input
                        type="text"
                        name="clientname"
                        value={input.clientname}
                        onChange={handleChange}
                        placeholder="client name"
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <input
                        type="text"
                        value={input.companyname}
                        onChange={handleChange}
                        name="companyname"
                        placeholder="companyname"
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <input
                        type="email"
                        value={input.email}
                        onChange={handleChange}
                        name="email"
                        placeholder="Email"
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <input
                        type="email"
                        value={input.phoneno}
                        onChange={handleChange}
                        name="phoneno"
                        placeholder="phone no"
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <input
                        type="email"
                        value={input.websiteurl}
                        onChange={handleChange}
                        name="websiteurl"
                        placeholder="website url (optinal)"
                        className="w-full border rounded-lg p-2"
                        required
                    />



                    <div className="flex gap-3 pt-2">
                        <Button
                            onClick={Submit}
                            disabled={isSubmit}
                            type="submit"
                            className={`flex-1  px-5  h-11`}
                        >
                            add client
                        </Button>

                        <Button
                            onClick={() => setIsOpenaddClient(false)}
                            type="button"
                            variant="outline"
                            className="flex-1 h-11  px-5 "
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
