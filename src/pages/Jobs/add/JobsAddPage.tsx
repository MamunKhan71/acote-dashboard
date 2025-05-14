import { useState } from "react";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Label from "../../../components/form/Label";
import MultiSelect from "../../../components/form/MultiSelect";
import Select from "../../../components/form/Select";
import Button from "../../../components/ui/button/Button";
import { PlusIcon } from "../../../icons";

const skillOptions = [
    "JavaScript", "TypeScript", "React", "Node.js", "Next.js",
    "RESTful APIs", "GraphQL", "SQL", "NoSQL", "Git", "CI/CD", "Cloud Services (AWS/Azure/GCP)"
].map(skill => ({ value: skill, text: skill }));

function SidePreviewList({
    title,
    items,
    onRemove
}: {
    title: string;
    items: string[];
    onRemove: (index: number) => void;
}) {
    if (items.length === 0) return null;

    return (
        <ul className="list-disc mt-2 space-y-1 bg-green-50 dark:bg-black dark:text-white min-w-96 border dark:border-gray-700 rounded-lg p-4">
            <div className="space-y-2 mb-2">
                <h2 className="font-semibold">{title}</h2>
                <hr className="border-gray-700" />
            </div>
            {items.map((item, index) => (
                <li key={index} className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-circle-check text-brand-500 mt-0.5 flex-shrink-0"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span>{item}</span>
                    </div>
                    <button
                        type="button"
                        className="text-white text-sm py-1.5 px-2 bg-red-400 rounded-sm"
                        onClick={() => onRemove(index)}
                    >
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default function JobAddingForm() {
    const [formData, setFormData] = useState({
        title: "Frontend Developer",
        company: "Acote Group LTD.",
        workType: "Remote",
        roleSummary: "",
        responsibilities: [] as string[],
        benefits: [] as string[],
        requiredSkills: ["JavaScript", "React", "Next.js"],
        embedLink: "",
    });

    const [newResponsibility, setNewResponsibility] = useState("");
    const [newBenefit, setNewBenefit] = useState("");

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addToList = (field: "responsibilities" | "benefits", value: string) => {
        if (!value.trim()) return;
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], value.trim()]
        }));
        field === "responsibilities" ? setNewResponsibility("") : setNewBenefit("");
    };

    const removeFromList = (field: "responsibilities" | "benefits", index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted job details:", formData);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Left Side: Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-black p-6 rounded-xl shadow-md w-full lg:w-3/5">
                <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={e => handleChange("title", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Work Arrangement</Label>
                    <Select
                        options={[
                            { value: "Remote", label: "Remote" },
                            { value: "On-site", label: "On-site" },
                            { value: "Hybrid", label: "Hybrid" }
                        ]}
                        placeholder="Select work type"
                        value={formData.workType}
                        onChange={val => handleChange("workType", val)}
                    />
                </div>

                <div>
                    <Label htmlFor="roleSummary">About the Role</Label>
                    <TextArea
                        id="roleSummary"
                        rows={4}
                        value={formData.roleSummary}
                        onChange={val => handleChange("roleSummary", val)}
                        placeholder="We're looking for an experienced Full Stack Developer..."
                    />
                </div>

                {/* Responsibilities */}
                <div className="w-full">
                    <Label>Key Responsibilities</Label>
                    <div className="w-full grid grid-cols-6 gap-6">
                        <div className="col-span-5 w-full">
                            <Input
                                className="w-full"
                                value={newResponsibility}
                                placeholder="Add responsibility"
                                onChange={e => setNewResponsibility(e.target.value)}
                            />
                        </div>
                        <Button type="button" onClick={() => addToList("responsibilities", newResponsibility)}>
                            <PlusIcon /> Add
                        </Button>
                    </div>
                    <SidePreviewList
                        title="Responsibilities"
                        items={formData.responsibilities}
                        onRemove={index => removeFromList("responsibilities", index)}
                    />
                </div>

                {/* Required Skills */}
                <MultiSelect
                    label="Required Skills"
                    options={skillOptions}
                    defaultSelected={formData.requiredSkills}
                    onChange={values => handleChange("requiredSkills", values)}
                />

                {/* Benefits */}
                <div>
                    <Label>Benefits</Label>
                    <div className="w-full grid grid-cols-6 gap-6">
                        <div className="col-span-5 w-full">
                            <Input
                                value={newBenefit}
                                placeholder="Add benefit"
                                onChange={e => setNewBenefit(e.target.value)}
                            />
                        </div>
                        <Button type="button" onClick={() => addToList("benefits", newBenefit)}>
                            + Add
                        </Button>
                    </div>
                    <SidePreviewList
                        title="Benefits"
                        items={formData.benefits}
                        onRemove={index => removeFromList("benefits", index)}
                    />
                </div>

                {/* Embed Link */}
                <div>
                    <Label htmlFor="embedLink">External Form Embed Link (optional)</Label>
                    <Input
                        id="embedLink"
                        value={formData.embedLink}
                        placeholder="https://forms.gle/xyz"
                        onChange={e => handleChange("embedLink", e.target.value)}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Save Job Details
                </Button>
            </form>

            {/* Right Side: Embedded Preview or Skeleton */}
            <div className="w-full lg:w-2/5 max-h-full overflow-y-auto rounded-xl border dark:border-gray-700">
                {formData.embedLink ? (
                    <iframe
                        src={formData.embedLink}
                        width="100%"
                        height="1000"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        className="w-full h-full rounded-xl bg-white"
                    >
                        Loading…
                    </iframe>
                ) : (
                    // Skeleton placeholder
                    <div className="animate-pulse flex flex-col gap-4 p-6">
                        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                        <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
