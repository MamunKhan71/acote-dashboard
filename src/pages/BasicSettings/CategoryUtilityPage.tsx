import { useState } from "react";
import Input from "../../components/form/input/InputField";
import { Modal } from "../../components/modal";

// Define type for category groups
type CategoryGroup = {
    [key in "events" | "products" | "design"]: string[];
};

// Define initial category groups with explicit type
const initialCategoryGroups: CategoryGroup = {
    events: ["Awards", "Events", "Fun activity", "Signing Ceremony", "Conferences"],
    products: ["AI/ML", "Beauty", "Business", "Ecommerce", "IOT"],
    design: ["Graphics Design", "Development", "UX/UI Design", "SaaS & Dashboard", "AI/ML"],
};

// Define props for CategorySection
interface CategorySectionProps {
    type: keyof CategoryGroup;
    categories: string[];
    onAdd: (name: string) => void;
    onRequestRemove: (index: number) => void;
    onUpdate: (index: number, newName: string) => void;
}

function CategorySection({
    type,
    categories,
    onAdd,
    onRequestRemove,
    onUpdate,
}: CategorySectionProps) {
    const [newCategory, setNewCategory] = useState("");

    const handleAdd = () => {
        if (!newCategory.trim()) return;
        onAdd(newCategory.trim());
        setNewCategory("");
    };

    const handleUpdate = (index: number, value: string) => {
        if (value.trim()) {
            onUpdate(index, value.trim());
        }
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
                        onChange={(e) => setNewCategory(e.target.value.trim())}
                    />
                </div>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 w-20"
                    disabled={!newCategory.trim()}
                >
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {categories.map((cat, index) => (
                    <li key={cat} className="flex items-center gap-3 w-full">
                        <div className="w-full">
                            <Input
                                value={cat}
                                onChange={(e) => handleUpdate(index, e.target.value)}
                                className="flex-1"
                            />
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
    const [categories, setCategories] = useState<CategoryGroup>(initialCategoryGroups);
    const [modalOpen, setModalOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<{
        type: keyof CategoryGroup;
        index: number;
    } | null>(null);

    const handleAdd = (type: keyof CategoryGroup, name: string) => {
        setCategories((prev) => ({ ...prev, [type]: [...prev[type], name] }));
    };

    const requestDelete = (type: keyof CategoryGroup, index: number) => {
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

    const handleUpdate = (type: keyof CategoryGroup, index: number, newName: string) => {
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
                        type={type as keyof CategoryGroup}
                        categories={list}
                        onAdd={(name) => handleAdd(type as keyof CategoryGroup, name)}
                        onRequestRemove={(index) => requestDelete(type as keyof CategoryGroup, index)}
                        onUpdate={(index, newName) => handleUpdate(type as keyof CategoryGroup, index, newName)}
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