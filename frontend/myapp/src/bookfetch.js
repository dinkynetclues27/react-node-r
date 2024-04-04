import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import './style.css';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Booktable() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editedBook, setEditedBook] = useState({
        title: "",
        description: "",
        publish_year: "",
        quantity: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;
    const totalpage = Math.ceil(books.length / itemsPerPage);
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
      }, [token, navigate]);

    useEffect(() => {
        fetchBooks();
    }, [currentPage]);

    const fetchBooks = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:4000/bookget', true);
        // xhr.withCredentials = true;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    setBooks(data);
                } else {
                    console.error('Error fetching books:', xhr.statusText);
                }
            }
        };
        xhr.send();
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedBook({ ...books[index] });
    };

    // const handleDelete = (id, idx) => {
    //     console.log("Deleting book with id:", id);
    //     console.log("Books before deletion:", books);
    //     let response = window.confirm(`Delete id: ${id}`);
    //     if (response) {
    //         const xhr = new XMLHttpRequest();
    //         xhr.open('DELETE', `http://localhost:4000/deletebook/${id}`, true);
    //         xhr.onload = () =>{
    //             if (xhr.readyState === XMLHttpRequest.DONE) {
    //                 console.log('XHR status:', xhr.status);
    //                 if (xhr.status === 200) {
    //                     console.log('Book deleted successfully');
    //                     //fetchBooks();

    //                     toast.success('Book deleted successfully')
    //                 } else {
    //                     console.error('Error deleting book:', xhr.statusText);
    //                     toast.error("error")
    //                 }
    //             }
    //         };
    //         xhr.send();
    //     } else {
    //         alert("Deletion cancelled");
    //     }
    // };

    const handleDelete = (id, idx) => {
        console.log("Deleting book with id:", id);
        console.log("Books before deletion:", books);
        let result = window.confirm(`Delete id: ${id}`);
        console.log(result)
        if (result) {
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', `http://localhost:4000/deletebook/${id}`, true);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log('XHR status:', xhr.status);
                    console.log('Book deleted successfully');
                    fetchBooks();
                    toast.success('Book deleted successfully')

                } else {
                    console.error('Error deleting book:', xhr.statusText);
                    toast.error("error")
                }
            };
            xhr.send();
        } else {
            alert("Deletion cancelled");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditIndex(-1);
    };

    const handleSaveEdit = (bookid) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `http://localhost:4000/bookupdate/${bookid}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Book updated successfully');
                    fetchBooks();
                    setEditIndex(-1);
                    toast.success('Book updated successfully')
                } else {
                    console.error('Error updating book:', xhr.statusText);
                    toast.error('error updating book')
                }

            }
        };
        xhr.send(JSON.stringify(editedBook));
    };

    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const handlepage = (event)  => {
        setCurrentPage(Math.floor(event.target.value))  
    }
    return (
        <div className="booktable-container">
            <table className="booktable-table">
                <thead>
                    <tr>
                        <th>Book Id:</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Publish year</th>
                        <th>Quantity</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBooks.map((book, idx) => (
                        <tr key={idx}>
                            <td>{book.bookid}</td>
                            <td>{book.title}</td>
                            <td>{book.description}</td>
                            <td>{book.publish_year}</td>
                            <td>{book.quantity}</td>
                            <td>
                                <button onClick={() => handleEdit(idx)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(book.bookid, idx)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {editIndex !== -1 && (
                <div className="popup">
                    <h2>Edit Book</h2>
                    <input type="text" name="title" value={editedBook.title} onChange={handleInputChange} placeholder="Title" />
                    <input type="text" name="description" value={editedBook.description} onChange={handleInputChange} placeholder="Description" />
                    <input type="text" name="publish_year" value={editedBook.publish_year} onChange={handleInputChange} placeholder="Publish Year" />
                    <input type="text" name="quantity" value={editedBook.quantity} onChange={handleInputChange} placeholder="Quantity" />
                    <button onClick={() => handleSaveEdit(books[editIndex].bookid)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            )}
            <div className="pagination">
                <button onClick={() => setCurrentPage(page => Math.max(page - 1, 1))} disabled={currentPage === 1}>Previous</button>
                {/* <span>Page {currentPage}</span> */}
                <input type="number" min={1} max={totalpage} value={currentPage} onChange={handlepage} />
                <button onClick={() => setCurrentPage(page => page + 1)} disabled={currentPage === totalpage}>Next</button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Booktable;