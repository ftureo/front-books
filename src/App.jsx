import { useState } from "react";
import "./App.css";

function App() {
    // const [bookName, setBookName] = useState("");
    // const [author, setAuthor] = useState("");
    // const [bookImage, setBookImage] = useState(null);

    // Improve the code above by using a single state object
    // const [book, setBook] = useState({
    //     bookName: "",
    //     author: "",
    //     bookImage: null,
    // });

    // Also we can set the initial state based on the db model
    const [book, setBook] = useState({
        bookTitle: "",
        bookAuthor: "",
        bookImage: null,
    });

    const handleSubmit = (event) => {
        
    };

    const handleInputChange = (event) => {
        setBook({
            ...book,
            [event.target.name]: event.target.value
        })
    };
    const handleFileChange = (event) => {
        setBook({
            ...book,
            [event.target.name]: event.target.files[0]
        })
    };

    return (
        <>
            <h1>Creando un libro</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Book Name:</label>
                    <input
                        type="text"
                        name="bookTitle"
                        value=""
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        name="bookAuthor"
                        value=""
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
        </>
    );
}

export default App;
