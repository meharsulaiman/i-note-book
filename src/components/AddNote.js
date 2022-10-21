import React from "react";
import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({
        title: "",
        discription: "",
        tag: "default",
    });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.discription, note.tag);
    };
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <h1>Add Notes</h1>
            <div className="container my-2">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            aria-describedby="text"
                            onChange={onchange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                            Tag
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            aria-describedby="text"
                            onChange={onchange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="discription" className="form-label">
                            Discription
                        </label>
                        <textarea
                            className="form-control"
                            id="discription"
                            name="discription"
                            rows="5"
                            onChange={onchange}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleClick}
                    >
                        Add Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNote;
