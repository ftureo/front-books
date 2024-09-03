/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import axios from "axios";

const BookForm = ({ bookId }) => {
    const [formData, setFormData] = useState({
        bookName: "",
        author: "",
        bookImage: null,
    });

    useEffect(() => {
        if (bookId) {
            // Fetch book data if bookId is provided (for editing)
            axios
                .get(`/api/books/${bookId}`)
                .then((response) => {
                    const { bookName, author, image } = response.data.book;
                    setFormData({ bookName, author, bookImage: image });
                })
                .catch((error) => {
                    console.error("Error fetching book:", error);
                });
        }
    }, [bookId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, bookImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("bookName", formData.bookName);
        data.append("author", formData.author);
        if (formData.bookImage) {
            data.append("bookImage", formData.bookImage);
        }

        try {
            if (bookId) {
                // Edit existing book
                await axios.put(`/api/update-book/${bookId}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true, // Include cookies
                });
            } else {
                // Create new book
                await axios.post("/api/create-book", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true, // Include cookies
                });
            }
            alert("Book saved successfully!");
        } catch (error) {
            console.error("Error saving book:", error);
            alert("Failed to save book");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Book Name:</label>
                <input
                    type="text"
                    name="bookName"
                    value={formData.bookName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Author:</label>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Book Image:</label>
                <input
                    type="file"
                    name="bookImage"
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit">
                {bookId ? "Update Book" : "Create Book"}
            </button>
        </form>
    );
};

export default BookForm;
