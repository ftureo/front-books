/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios"

export const BookForm = ({ existingBook, onSubmit }) => {
    const [formData, setFormData] = useState({
        bookTitle: existingBook?.title || "",
        bookDescription: existingBook?.description || "",
        bookImage: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("bookTitle", formData.bookTitle);
        data.append("bookDescription", formData.bookDescription);
        if (formData.bookImage) {
            data.append("bookImage", formData.bookImage);
        }

        try {
            const response = await axios.post(
                existingBook
                    ? `/api/edit-book/${existingBook.id}`
                    : "/api/create-book",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            onSubmit(response.data);
        } catch (error) {
            console.error("Error al enviar el formulario", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="bookTitle">Título del libro</label>
                <input
                    type="text"
                    name="bookTitle"
                    value={formData.bookTitle}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="bookDescription">Descripción del libro</label>
                <textarea
                    name="bookDescription"
                    value={formData.bookDescription}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="bookImage">Imagen del libro</label>
                <input type="file" name="bookImage" onChange={handleChange} />
            </div>
            <button type="submit">
                {existingBook ? "Editar Libro" : "Crear Libro"}
            </button>
        </form>
    );
};
