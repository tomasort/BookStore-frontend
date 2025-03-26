import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { Book } from "@/types";
import { StarIcon } from "@heroicons/react/20/solid";
import AuthorDetailsForm from "./AuthorDetailsForm";
import { getImageUrl } from "@/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/Dialog"
import AddAuthorForm from "./AddAuthorForm";

interface EditBookDetailsProps {
    bookData: Book;
}

const EditBookDetails = ({ bookData }: EditBookDetailsProps) => {
    const [formData, setFormData] = useState<Book>(bookData);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (e: ChangeEvent<HTMLInputElement>, key: keyof Book) => {
        const valueArray = e.target.value.split(",").map((item) => item.trim());
        setFormData((prev) => ({ ...prev, [key]: valueArray }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // onSave(formData); // Call the onSave function to update the book details
    };

    const adjustTextareaHeight = () => {
        if (descriptionRef.current) {
            descriptionRef.current.style.height = 'auto';
            descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [formData.description]);

    return (
        <form onSubmit={handleSubmit} className="flex w-full">
            {/* Book cover image */}
            <div className="w-1/3">
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="relative w-full">
                            {formData.cover_url ? (
                                <img src={getImageUrl(formData.cover_url)} alt={`Cover of ${formData.title}`} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <span className="text-gray-400">Image not available</span>
                                </div>
                            )}
                        </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle>Change Image</DialogTitle>
                            <DialogDescription>
                                <div className="relative w-full">
                                    {formData.cover_url ? (
                                        <img src={getImageUrl(formData.cover_url)} alt={`Cover of ${formData.title}`} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <span className="text-gray-400">Image not available</span>
                                        </div>
                                    )}
                                </div>

                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <button>Select New Image</button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="w-2/3 pl-6 flex flex-col justify-between">
                <div>

                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mb-4 text-3xl font-semibold text-gray-800 w-full border rounded p-1"
                        />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                            ref={descriptionRef}
                            className="text-gray-700 leading-relaxed mb-4 w-full border rounded p-1"
                            style={{ overflow: 'hidden' }}
                        />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Authors</h3>
                        <div className="mb-4">
                            {formData.authors.map((author) => (
                                <div key={author.name} className="flex items-center">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button
                                                type="button"
                                                className="relative bg-white text-black px-3 py-1 rounded-full shadow-md hover:bg-gray-200 flex items-center"
                                                onClick={() => { console.log("Open overlay for editing") }}
                                            >
                                                {author.name}
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-white">
                                            <DialogHeader>
                                                <DialogTitle>Edit Author</DialogTitle>
                                                <DialogDescription>
                                                    Edit the author details for {author.name}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <AuthorDetailsForm />
                                            <DialogFooter>
                                                <button>Remove</button>
                                                <button>Save Changes</button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            ))}
                        </div>

                        <div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">Add Author</button>
                                </DialogTrigger>
                                <DialogContent className="bg-white">
                                    <DialogHeader>
                                        <DialogTitle>Add Author</DialogTitle>
                                        <DialogDescription>
                                            Add author to the book
                                        </DialogDescription>
                                    </DialogHeader>
                                    <AddAuthorForm />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Book details */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Details</h3>
                            <label className="block">
                                <span className="text-sm font-medium">ISBN-10</span>
                                <input type="text" name="isbn_10" value={formData.isbn_10 || ""} onChange={handleChange} className="w-full border rounded p-1" />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium">ISBN-13</span>
                                <input type="text" name="isbn_13" value={formData.isbn_13 || ""} onChange={handleChange} className="w-full border rounded p-1" />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium">Pages</span>
                                <input type="number" name="number_of_pages" value={formData.number_of_pages || ""} onChange={handleChange} className="w-full border rounded p-1" />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium">Format</span>
                                <input type="text" name="physical_format" value={formData.physical_format || ""} onChange={handleChange} className="w-full border rounded p-1" />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium">Weight</span>
                                <input type="text" name="weight" value={formData.weight || ""} onChange={handleChange} className="w-full border rounded p-1" />
                            </label>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Genres</h3>
                            <input
                                type="text"
                                value={formData.genres.map((genre) => genre.name).join(", ")}
                                onChange={(e) => handleArrayChange(e, "genres")}
                                className="w-full border rounded p-1"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">Publishers</h3>
                            <input
                                type="text"
                                value={formData.publishers.map((publisher) => publisher.name).join(", ")}
                                onChange={(e) => handleArrayChange(e, "publishers")}
                                className="w-full border rounded p-1"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">Series</h3>
                            <input
                                type="text"
                                value={formData.series.join(", ")}
                                onChange={(e) => handleArrayChange(e, "series")}
                                className="w-full border rounded p-1"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block">
                        <span className="text-sm font-medium">Current Price</span>
                        <input type="text" name="current_price" value={formData.current_price} onChange={handleChange} className="text-2xl font-bold text-gray-900 border rounded p-1" />
                    </label>
                </div>

                {/* Save Button */}
                <div className="mt-6">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
                        Save Changes
                    </button>
                </div>
            </div>
        </form >
    );
};

export default EditBookDetails;

