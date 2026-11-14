import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

const Addclient = ({ setIsOpenaddClient }: { setIsOpenaddClient: Function }) => {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
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


            if (response.ok) {
                setIsSubmit(false);
                setIsOpenaddClient(false);
                router.push("/dashboard")
                setInput({
                    clientname: "",
                    email: "",
                    companyname: "",
                    phoneno: "",
                    websiteurl: ""

                })
                toast.message("Client is SuccessFully added");

            } else {

                toast.error("Server side Error");
            }

        } catch (error) {
            toast.error("Please try again after some time");
            return error;


        }
    }

    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className="bg-white w-full max-w-md  rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-medium">Add a new client</h2>

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
