import { Button } from '@/components/ui/button';
import { Users, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';




const AddOldclient = ({ setIsOpenOldClient, projectid }: { setIsOpenOldClient: Function, projectid: any }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [input, setInput] = useState({

        email: "",

    })

    const handleChange = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const Submit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmit(true);
        try {
            const response = await fetch("/api/clients/find-client-by-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...input,
                    projectId: projectid
                })
            })

            const data = await response.json();


            if (data.status == 200) {
                setIsSubmit(false);
                setIsOpenOldClient(true);
                setInput({
                    email: "",
                })
                toast.message("Client is SuccessFully added to project");

            } else {
                toast.error(data.message);
                setIsOpenOldClient(false);

            }

        } catch (error) {
            toast.error("Please try again after some time");
            return error;
        }
    }





    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-gray-100">

                {/* Header */}
                <div className="flex items-start justify-between mb-6">

                    <div className="flex items-start gap-3">
                        <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-black text-white text-lg">
                            <Users size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Add existing client
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Connect with a client you've already worked with.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpenOldClient(false)}
                        className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-1.5 transition"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Form */}
                <form className="space-y-5">

                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                        >
                            Client email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={input.email}
                            onChange={handleChange}
                            name="email"
                            placeholder="client@example.com"
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                            required
                        />

                        <p className="text-xs text-gray-400">
                            We'll use this email to find your existing client.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-1">

                        <Button
                            onClick={Submit}
                            disabled={isSubmit}
                            type="submit"
                            className="flex-1 h-11 rounded-xl"
                        >
                            {isSubmit ? "Adding client..." : "Add client"}
                        </Button>

                        <Button
                            onClick={() => setIsOpenOldClient(false)}
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

export default AddOldclient
