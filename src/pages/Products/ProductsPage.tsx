import { useState, useEffect } from "react";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import FileInput from "../../components/form/input/FileInput";
import Label from "../../components/form/Label";
import MultiSelect from "../../components/form/MultiSelect";
import Select from "../../components/form/Select";

// Define options for MultiSelect and Select
const featureOptions = [
    "Responsive Design",
    "Fast Performance",
    "High Security",
    "Scalable Architecture",
].map((feature) => ({ value: feature, text: feature }));


const frontendTechOptions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Next.js",
    "RESTful APIs",
    "GraphQL",
    "SQL",
    "NoSQL",
    "Git",
    "CI/CD",
    "Cloud Services (AWS/Azure/GCP)",
].map((skill) => ({ value: skill, text: skill }));

const backendTechOptions = [
    "Node.js",
    "Django",
    "Spring Boot",
    "Ruby on Rails",
    "Express.js",
    "Flask",
    "Laravel",
    "ASP.NET Core",
    "Go",
    "Kotlin",
    "Firebase",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Cloud Services (AWS/Azure/GCP)",
].map((skill) => ({ value: skill, text: skill }));

const categoryOptions = ["Beauty", "Skincare", "Electronics", "Software"].map(
  (category) => ({ value: category.toLowerCase(), label: category })
);
export default function UploadProductForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [features, setFeatures] = useState<string[]>([]);
    const [frontendSpecs, setFrontendSpecs] = useState<string[]>([]);
    const [backendSpecs, setBackendSpecs] = useState<string[]>([]);
    const [category, setCategory] = useState("");
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [mainImagePreview, setMainImagePreview] = useState<string>("");
    const [screenshots, setScreenshots] = useState<File[]>([]);
    const [screenshotPreviews, setScreenshotPreviews] = useState<string[]>([]);
    const [error, setError] = useState("");

    // Cleanup preview URLs on unmount
    useEffect(() => {
        return () => {
            screenshotPreviews.forEach((url) => URL.revokeObjectURL(url));
            if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
        };
    }, [screenshotPreviews, mainImagePreview]);

    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setError("Main image must be an image file (PNG, JPEG).");
            return;
        }
        setError("");
        if (mainImagePreview) URL.revokeObjectURL(mainImagePreview); // Clean up old preview
        setMainImage(file);
        setMainImagePreview(URL.createObjectURL(file));
    };

    const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Validate file types
        const invalidFiles = files.filter((file) => !file.type.startsWith("image/"));
        if (invalidFiles.length > 0) {
            setError("All screenshots must be image files (PNG, JPEG).");
            return;
        }

        // Check per-upload limit
        if (files.length > 4) {
            setError("You can upload a maximum of 4 images at a time.");
            return;
        }

        // Check cumulative limit
        const total = screenshots.length + files.length;
        if (total > 4) {
            setError("Total selected images exceed the limit of 4.");
            return;
        }

        setError("");
        // Clean up old previews
        screenshotPreviews.forEach((url) => URL.revokeObjectURL(url));
        // Append new files
        const newScreenshots = [...screenshots, ...files].slice(0, 4);
        setScreenshots(newScreenshots);
        setScreenshotPreviews(newScreenshots.map((file) => URL.createObjectURL(file)));
    };

    const handleSubmit = () => {
        if (!title || !description || !mainImage || screenshots.length === 0 || !category) {
            alert("Please fill all required fields.");
            return;
        }

        const productId = "product-" + Date.now();
        const payload = {
            id: productId,
            title,
            description,
            features,
            image: `/products/${productId}/main.png`,
            screenshots: screenshots.map(
                (_, i) => `/products/${productId}/screenshot-${i + 1}.png`
            ),
            techSpecs: {
                frontend: frontendSpecs,
                backend: backendSpecs,
            },
            category,
        };

        console.log("📦 Product Upload Payload:", payload);
        alert("Product submitted successfully. Check console.");
        // Clean up previews after submission
        screenshotPreviews.forEach((url) => URL.revokeObjectURL(url));
        setScreenshotPreviews([]);
        if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
        setMainImagePreview("");
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 ">
            {/* Form */}
            <div className="w-full lg:w-3/5 bg-white dark:bg-black p-6 rounded-lg shadow border dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    Upload Product
                </h2>
                <Label>Product Title</Label>
                <Input
                    placeholder="Enter product title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Label className="mt-4">Product Description</Label>
                <TextArea
                    id="description"
                    placeholder="Write a short description"
                    value={description}
                    onChange={(value) => setDescription(value)}
                />

                <MultiSelect
                    label="Select Features"
                    options={featureOptions}
                    defaultSelected={features}
                    onChange={(selected) => setFeatures(selected)}
                />

                <Label className="mt-6">Main Product Image</Label>
                <FileInput
                    onChange={handleMainImageChange}
                    accept="image/png,image/jpeg"
                />
                {error && mainImage && (
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                )}

                <Label className="mt-6">Screenshots (Max 4)</Label>
                <FileInput
                    onChange={handleScreenshotChange}
                    multiple={true}
                    accept="image/png,image/jpeg"
                />
                {error && (
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    {screenshotPreviews.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            alt={`Screenshot ${idx}`}
                            className="h-32 w-full object-cover rounded border"
                        />
                    ))}
                </div>

                <MultiSelect
                    label="Select Frontend Technologies"
                    options={frontendTechOptions}
                    defaultSelected={frontendSpecs}
                    onChange={(selected) => setFrontendSpecs(selected)}
                />

                <MultiSelect
                    label="Select Backend Technologies"
                    options={backendTechOptions}
                    defaultSelected={backendSpecs}
                    onChange={(selected) => setBackendSpecs(selected)}
                />

                <Label className="mt-6">Product Category</Label>
                <Select
                    options={categoryOptions}
                    placeholder="Select a category"
                    onChange={(value) => setCategory(value)}
                    defaultValue={category}
                />

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="mt-6 w-full py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
                >
                    Submit Product
                </button>
            </div>

            {/* Preview */}
            <div className="w-full lg:w-2/5 bg-white dark:bg-black p-5 rounded-xl h-fit border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Product Preview
                </h3>

                {/* Skeleton Loader */}
                {!title && !description && !mainImagePreview && features.length === 0 && frontendSpecs.length === 0 && backendSpecs.length === 0 && !category ? (
                    <div className="animate-pulse space-y-4">
                        <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full rounded mb-4" />
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                    </div>
                ) : (
                    <>
                        {mainImagePreview && (
                            <img
                                src={mainImagePreview}
                                alt="Main Preview"
                                className="rounded mb-4 w-full h-48 object-cover"
                            />
                        )}

                        {title && (
                            <p className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">
                                {title}
                            </p>
                        )}
                        {description && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                {description}
                            </p>
                        )}

                        {features.length > 0 && (
                            <div className="mb-4">
                                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    Features
                                </h4>
                                <ul className="list-disc ml-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                    {features.map((value, idx) => {
                                        const feature =
                                            featureOptions.find((opt) => opt.value === value)?.text ||
                                            value;
                                        return feature && <li key={idx}>{feature}</li>;
                                    })}
                                </ul>
                            </div>
                        )}

                        {screenshotPreviews.length > 0 && (
                            <div className="mb-4">
                                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    Screenshots
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {screenshotPreviews.map((src, idx) => (
                                        <img
                                            key={idx}
                                            src={src}
                                            alt={`Screenshot ${idx}`}
                                            className="rounded h-24 object-cover w-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {(frontendSpecs.length > 0 || backendSpecs.length > 0) && (
                            <div>
                                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    Technical Specifications
                                </h4>
                                {frontendSpecs.length > 0 && (
                                    <div className="mb-2">
                                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                            Frontend
                                        </p>
                                        <ul className="list-disc ml-5 text-sm text-gray-600 dark:text-gray-300">
                                            {frontendSpecs.map((value, i) => {
                                                const tech =
                                                    frontendTechOptions.find((opt) => opt.value === value)
                                                        ?.text || value;
                                                return tech && <li key={i}>{tech}</li>;
                                            })}
                                        </ul>
                                    </div>
                                )}
                                {backendSpecs.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                            Backend
                                        </p>
                                        <ul className="list-disc ml-5 text-sm text-gray-600 dark:text-gray-300">
                                            {backendSpecs.map((value, i) => {
                                                const tech =
                                                    backendTechOptions.find((opt) => opt.value === value)
                                                        ?.text || value;
                                                return tech && <li key={i}>{tech}</li>;
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {category && (
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium">Category:</span>{" "}
                                {categoryOptions.find((opt) => opt.value === category)?.label ||
                                    category}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}