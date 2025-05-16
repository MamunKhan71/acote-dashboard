import { useState } from "react";
import FileInput from "../../components/form/input/FileInput";
import Input from "../../components/form/input/InputField";
import MultiSelect from "../../components/form/MultiSelect";
import Label from "../../components/form/Label";

const SectionWithBullets = ({
    title,
    intro,
    setIntro,
    points,
    setPoints,
}) => {
    const updatePoint = (index, value) => {
        const updated = [...points];
        updated[index] = value;
        setPoints(updated);
    };

    const addPoint = () => setPoints([...points, ""]);
    const removePoint = (index) =>
        setPoints(points.filter((_, i) => i !== index));

    return (
        <div className="space-y-4 w-full">
            <h3 className="text-lg font-semibold text-black dark:text-white">{title}</h3>
            <Input
                placeholder={`Intro for ${title}`}
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
            />
            <div className="space-y-2 w-full p-6 bg-gray-50 dark:bg-black rounded-lg border border-gray-200 dark:border-gray-dark">
                {points.map((point, idx) => (
                    <div key={idx} className="w-full items-center">
                        <Input
                            placeholder={`Bullet ${idx + 1}`}
                            value={point}
                            onChange={(e) => updatePoint(idx, e.target.value)}
                            className="w-full bg-white dark:bg-black"
                        />
                        <button
                            onClick={() => removePoint(idx)}
                            className="text-sm text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addPoint}
                    className="text-sm text-brand-600 hover:underline"
                >
                    + Add another point
                </button>
            </div>
        </div>
    );
};

export default function AddPortfolio() {
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [error, setError] = useState("");

    const [overview, setOverview] = useState("");
    const [problemIntro, setProblemIntro] = useState("");
    const [problemPoints, setProblemPoints] = useState([""]);
    const [challengeIntro, setChallengeIntro] = useState("");
    const [challengePoints, setChallengePoints] = useState([""]);
    const [workflowIntro, setWorkflowIntro] = useState("");
    const [solutionIntro, setSolutionIntro] = useState("");
    const [solutionPoints, setSolutionPoints] = useState([""]);

    const [techStack, setTechStack] = useState("");
    const [platform, setPlatform] = useState("");
    const [customer, setCustomer] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [categories, setCategories] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 4) {
            setError("You can upload a maximum of 4 images.");
            return;
        }

        const total = images.length + files.length;
        if (total > 4) {
            setError("Total selected images exceed the limit of 4.");
            return;
        }

        setError("");
        const newImages = [...images, ...files].slice(0, 4);
        setImages(newImages);
        setImagePreviews(newImages.map((file) => URL.createObjectURL(file)));
    };

    const handleSubmit = () => {
        if (images.length !== 4) {
            alert("Please upload exactly 4 images.");
            return;
        }

        const projectId = "project-" + Date.now();

        const finalPayload = {
            id: projectId,
            project: {
                name: "Empower your finance with alpine banking",
                overview,
                categories,
                portfolioSnapshots: images.map((_, i) => `/portfolio/${projectId}/p${i + 1}.png`),
            },
            projectFeatures: [
                {
                    title: "Project overview",
                    description: overview,
                },
                {
                    title: "Problem",
                    description: problemIntro,
                    key_point_description:
                        "Here are some key challenges to consider when developing such a platform:",
                    key_points: problemPoints,
                },
                {
                    title: "Challanges",
                    key_point_description:
                        "Here are some key challenges to consider when developing such a platform:",
                    key_points: challengePoints,
                },
                {
                    title: "Workflow scenario",
                    description: workflowIntro,
                },
                {
                    title: "Solutions",
                    description: solutionIntro,
                    key_points: solutionPoints,
                },
            ],
            techOverview: [
                { title: "TECHNOLOGIES", description: techStack },
                { title: "PLATFORMS", description: platform },
                { title: "CUSTOMER", description: customer },
            ],
            liveUrl,
        };

        console.log("\uD83D\uDCE6 Final Portfolio JSON:", finalPayload);
        alert("Portfolio submitted successfully. Check console for payload.");
    };

    const categoryOptions = [
        { value: "Fintech", text: "Fintech" },
        { value: "Web", text: "Web" },
        { value: "Mobile", text: "Mobile" },
        { value: "AI", text: "AI" },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="space-y-10  bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-dark w-full p-6 lg:w-3/5">
                <h1 className="text-3xl font-bold text-black dark:text-white">Add Portfolio</h1>

                <div>
                    <Label>Upload 4 Images</Label>
                    <FileInput onChange={handleImageChange} />
                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                </div>

                <div>
                    <Label>Categories</Label>
                    <MultiSelect
                        label="Select Categories"
                        options={categoryOptions}
                        defaultSelected={[]}
                        onChange={(selected) => setCategories(selected)}
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">Project Overview</h3>
                    <Input
                        placeholder="Describe the project overview"
                        value={overview}
                        onChange={(e) => setOverview(e.target.value)}
                    />
                </div>

                <SectionWithBullets
                    title="Problem"
                    intro={problemIntro}
                    setIntro={setProblemIntro}
                    points={problemPoints}
                    setPoints={setProblemPoints}
                />

                <SectionWithBullets
                    title="Challanges"
                    intro={challengeIntro}
                    setIntro={setChallengeIntro}
                    points={challengePoints}
                    setPoints={setChallengePoints}
                />

                <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">Workflow Scenario</h3>
                    <Input
                        placeholder="Workflow scenario"
                        value={workflowIntro}
                        onChange={(e) => setWorkflowIntro(e.target.value)}
                    />
                </div>

                <SectionWithBullets
                    title="Solutions"
                    intro={solutionIntro}
                    setIntro={setSolutionIntro}
                    points={solutionPoints}
                    setPoints={setSolutionPoints}
                />

                <div>
                    <h3 className="text-lg font-semibold mt-6 text-black dark:text-white">Tech Overview</h3>
                    <Label>Technologies</Label>
                    <Input placeholder="e.g. React, Node.js" value={techStack} onChange={(e) => setTechStack(e.target.value)} />

                    <Label className="mt-4">Platform</Label>
                    <Input placeholder="e.g. Salesforce" value={platform} onChange={(e) => setPlatform(e.target.value)} />

                    <Label className="mt-4">Customer</Label>
                    <Input placeholder="e.g. Confidential" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                </div>

                <div className="mt-6">
                    <Label>Live URL</Label>
                    <Input placeholder="https://example.com" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-4 w-full bg-brand-600 text-white py-2.5 rounded-lg hover:bg-brand-700 transition"
                >
                    Submit Portfolio
                </button>
            </div>
            <div className="lg:w-2/5 bg-white dark:bg-black p-5 rounded-xl h-fit max-h-full w-full overflow-y-auto border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Portfolio Preview
                </h2>

                {/* Image Preview or Skeleton */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {imagePreviews.length > 0
                        ? imagePreviews.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`Preview ${idx}`}
                                className="rounded h-40 w-full object-cover"
                            />
                        ))
                        : Array(4)
                            .fill(0)
                            .map((_, idx) => (
                                <div
                                    key={idx}
                                    className="h-40 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded"
                                ></div>
                            ))}
                </div>

                {/* Sections Preview or Skeleton */}
                {overview || problemIntro || challengeIntro || workflowIntro || solutionIntro ? (
                    <>
                        {overview && renderSection("Project Overview", overview)}
                        {problemIntro && renderSection("Problem", problemIntro, problemPoints)}
                        {challengeIntro && renderSection("Challanges", challengeIntro, challengePoints)}
                        {workflowIntro && renderSection("Workflow Scenario", workflowIntro)}
                        {solutionIntro && renderSection("Solutions", solutionIntro, solutionPoints)}
                    </>
                ) : (
                    <div className="space-y-6">
                        {Array(3)
                            .fill(0)
                            .map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
                                    <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
                                    <div className="h-3 w-5/6 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
                                </div>
                            ))}
                    </div>
                )}
            </div>

        </div>
    );
}


const renderSection = (title: string, intro: string, bullets?: string[]) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
        {intro && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{intro}</p>}
        {bullets?.length ? (
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                {bullets.map((b, i) => b && <li key={i}>{b}</li>)}
            </ul>
        ) : null}
    </div>
);