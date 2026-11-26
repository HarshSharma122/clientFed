import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { toast } from 'sonner';




const category = [
    "Select category",
    "Website Development",
    "Web Application",
    "Mobile App Development",
    "UI/UX Design",
    "Graphic Design",
    "E-commerce Development",
    "Landing Page Design",
    "WordPress Development",
    "Software Development",
    "API Development",
    "SEO & Digital Marketing",
    "Branding & Identity",
    "Content Writing",
    "Video Editing",
    "Other",
]
const AddProject = ({ setIsOpenaddProject }: { setIsOpenaddProject: Function }) => {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [input, setInput] = useState({
        project_name: "",
        project_desc: "",
        project_category: "",
        preview_URL: "",
        deadline: "",
    })

    const handleChange = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const Submit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmit(true);
        try {
            const response = await fetch("/api/projects/add-project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...input
                })
            })

            // the main question is if errro come at the backend side why everytime status code is 200 why


            const data = await response.json();
            if (data.status == 200) {
                setIsSubmit(false);
                setIsOpenaddProject(false);
                router.push("/dashboard")
                setInput({
                    project_name: "",
                    project_desc: "",
                    project_category: "",
                    preview_URL: "",
                    deadline: "",

                })
                toast.message("Project is SuccessFully added");

            } else {
                setIsOpenaddProject(false);
                toast.error(data.message);
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
                    <h2 className="text-xl font-medium">Add new Project</h2>

                    <button onClick={() => setIsOpenaddProject(false)} className="text-xl">
                        ✕
                    </button>
                </div>

                <form className="space-y-4">
                    <input
                        type="text"
                        name="project_name"
                        value={input.project_name}
                        onChange={handleChange}
                        placeholder="Project name"
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <Textarea
                        value={input.project_desc}
                        onChange={handleChange}
                        name="project_desc"
                        placeholder="Project Desc.."
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <select name='project_category' value={input.project_category}
                        onChange={handleChange} className="w-full border rounded-lg p-2"
                    >
                        {
                            category.map((cat, index) => (
                                <option
                                    key={index}>

                                    {cat}

                                </option>
                            ))
                        }
                    </select>

                    <input
                        type="text"
                        value={input.deadline}
                        onChange={handleChange}
                        name="deadline"
                        placeholder="Deadline"
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <input
                        type="text"
                        value={input.preview_URL}
                        onChange={handleChange}
                        name="preview_URL"
                        placeholder="preview_URL (optinal)"
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
                            add project
                        </Button>

                        <Button
                            onClick={() => setIsOpenaddProject(false)}
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

export default AddProject
