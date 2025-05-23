import { useState } from "react";
import Input from "../../components/form/input/InputField";
import { Modal } from "../../components/ui/Modal"; // ✅ adjust import path if needed

const initialCategoryGroups = {
    events: ["Awards", "Events", "Fun activity", "Signing Ceremony", "Conferences"],
    products: ["AI/ML", "Beauty", "Business", "Ecommerce", "IOT"],
    design: ["Graphics Design", "Development", "UX/UI Design", "SaaS & Dashboard", "AI/ML"],
};

function CategorySection({
    type,
    categories,
    onAdd,
    onRequestRemove,
    onUpdate,
}: {
    type: string;
    categories: string[];
    onAdd: (name: string) => void;
    onRequestRemove: (index: number) => void;
    onUpdate: (index: number, newName: string) => void;
}) {
    const [newCategory, setNewCategory] = useState("");

    const handleAdd = () => {
        if (!newCategory.trim()) return;
        onAdd(newCategory.trim());
        setNewCategory("");
    };

    return (
        <div className="mb-6 p-5 border rounded-lg bg-white dark:bg-black w-full">
            <h2 className="text-lg font-semibold mb-4">
                {type.charAt(0).toUpperCase() + type.slice(1)} Categories
            </h2>

            <div className="flex gap-2 mb-4 w-full">
                <div className="w-full">
                    <Input
                        placeholder="Add new category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 w-20"
                >
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {categories.map((cat, index) => (
                    <li key={index} className="flex items-center gap-3 w-full">
                        <div className="w-full">
                            <Input value={cat} className="flex-1" disabled />
                        </div>
                        <button
                            onClick={() => onRequestRemove(index)}
                            className="text-sm text-white px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 w-20"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function CategoryUtilityPage() {
    const [categories, setCategories] = useState(initialCategoryGroups);
    const [modalOpen, setModalOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<{ type: string; index: number } | null>(null);

    const handleAdd = (type: string, name: string) => {
        setCategories((prev) => ({ ...prev, [type]: [...prev[type], name] }));
    };

    const requestDelete = (type: string, index: number) => {
        setPendingDelete({ type, index });
        setModalOpen(true);
    };

    const confirmDelete = () => {
        if (!pendingDelete) return;
        const { type, index } = pendingDelete;
        setCategories((prev) => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index),
        }));
        setModalOpen(false);
        setPendingDelete(null);
    };

    const handleUpdate = (type: string, index: number, newName: string) => {
        setCategories((prev) => {
            const updated = [...prev[type]];
            updated[index] = newName;
            return { ...prev, [type]: updated };
        });
    };

    return (
        <div className="dark:bg-black p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Manage Categories
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(categories).map(([type, list]) => (
                    <CategorySection
                        key={type}
                        type={type}
                        categories={list}
                        onAdd={(name) => handleAdd(type, name)}
                        onRequestRemove={(index) => requestDelete(type, index)}
                        onUpdate={(index, newName) => handleUpdate(type, index, newName)}
                    />
                ))}
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                        Confirm Deletion
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Are you sure you want to delete this category?
                    </p>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
