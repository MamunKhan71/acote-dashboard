import { useState } from "react";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import FileInput from "../../components/form/input/FileInput";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/input/Checkbox";
import Select from "../../components/form/Select";
import DatePicker from "../../components/form/date-picker";
import DropzoneComponent from "../../components/form/form-elements/DropZone";

const categoryTabs = [
    "Awards",
    "Events",
    "Fun activity",
    "Signing Ceremony",
    "Conferences"
];

export default function UploadEventForm() {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [isVideo, setIsVideo] = useState(false);
    const [video, setVideo] = useState("");
    const [description, setDescription] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleDateChange = (selectedDates: Date[]) => {
        if (selectedDates.length > 0) {
            const formatted = selectedDates[0].toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
            setDate(formatted);
        }
    };

    const handleSubmit = () => {
        if (!image || !date || !title || !category || !description) {
            alert("Please fill all required fields.");
            return;
        }

        const eventId = Date.now();
        const payload = {
            image: `/events/event-${eventId}.jpeg`,
            date,
            title,
            category,
            isVideo,
            video: isVideo ? video : undefined,
            description
        };

        console.log("\uD83D\uDCC5 Event Payload:", payload);
        alert("Event submitted successfully. Check console.");
    };

    return (
        <div className="flex gap-6 w-full">
            <div className="bg-white dark:bg-black p-6 rounded-lg border dark:border-gray-700 flex flex-col lg:flex-row gap-6 lg:w-3/5">
                {/* Form */}
                <div className="w-full">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Upload Event</h2>
                    <DropzoneComponent />

                    <Label>Event Title</Label>
                    <Input placeholder="Enter event title" value={title} onChange={(e) => setTitle(e.target.value)} />

                    <div className="mt-4">
                        <DatePicker
                            id="event-date-picker"
                            label="Event Date"
                            placeholder="Select a date"
                            onChange={handleDateChange}
                        />
                    </div>

                    <Label className="mt-4">Category</Label>
                    <Select
                        options={categoryTabs.map((item) => ({ value: item, label: item }))}
                        placeholder="Select category"
                        onChange={setCategory}
                        defaultValue={category}
                    />

                    <Label className="mt-4">Description</Label>
                    <TextArea placeholder="Write a short description" value={description} onChange={setDescription} />

                    <div className="mt-4">
                        <Checkbox
                            label="Include Video?"
                            checked={isVideo}
                            onChange={setIsVideo}
                        />
                    </div>

                    {isVideo && (
                        <div className="mt-2">
                            <Label>Video URL</Label>
                            <Input
                                type="url"
                                placeholder="https://www.youtube.com/watch?v=xxxxxx"
                                value={video}
                                onChange={(e) => setVideo(e.target.value)}
                            />
                        </div>
                    )}

                    <Label className="mt-6">Event Cover Image</Label>
                    <FileInput onChange={handleImageChange} />

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-6 w-full py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
                    >
                        Submit Event
                    </button>
                </div>

                {/* Preview */}
            </div>
            <div className="w-full lg:w-2/5 bg-white dark:bg-black p-6 rounded-2xl h-fit border border-gray-200 dark:border-gray-700 flex flex-col items-left">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Event Preview</h3>
                {/* Skeleton Loader */}
                {!imagePreview && !title && !date && !category && !description && !isVideo ? (
                    <div className="animate-pulse space-y-5 w-full">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-xl w-full h-44 mb-4" />
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-start">
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Event Preview"
                                className="rounded-xl mb-5 w-full h-96 object-cover border border-gray-200 dark:border-gray-700"
                            />
                        )}
                        {title && (
                            <p className="text-xl font-bold text-gray-800 dark:text-white mb-1 text-left">{title}</p>
                        )}
                        {date && (
                            <p className="text-sm text-gray-500 mb-2 text-center">{date}</p>
                        )}
                        {category && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 text-left">
                                <span className="font-semibold">Category:</span> {category}
                            </p>
                        )}
                        {description && (
                            <p className="text-sm text-gray-700 dark:text-gray-200 mb-4 text-left">{description}</p>
                        )}
                        {isVideo && video && (
                            <a
                                href={video}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mt-2 hover:underline"
                            >
                                🎬 Watch Video
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}