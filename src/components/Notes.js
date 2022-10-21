import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    useEffect(() => {
        getNotes();
    });
    const updateNote = (currentNote) => {
        ref.current.click();
        refClose.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            ediscription: currentNote.discription,
            etag: currentNote.tag,
        });
    };
    const [note, setNote] = useState({
        title: "",
        discription: "",
        tag: "default",
    });

    const handleClick = (e) => {
        e.preventDefault();
        refClose.current.click();
        console.log("clicked", note);
    };
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const ref = useRef(null);
    const refClose = useRef(null);
    return (
        <>
            <AddNote />

            <button
                type="button"
                ref={ref}
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            ></button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Edit Note
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label
                                        htmlFor="etitle"
                                        className="form-label"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        aria-describedby="text"
                                        onChange={onchange}
                                        value={note.etitle}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="etag"
                                        className="form-label"
                                    >
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        aria-describedby="text"
                                        onChange={onchange}
                                        value={note.etag}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="ediscription"
                                        className="form-label"
                                    >
                                        Discription
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="ediscription"
                                        name="ediscription"
                                        rows="3"
                                        onChange={onchange}
                                        value={note.ediscription}
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={refClose}
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleClick}
                                ref={ref}
                            >
                                Add Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <h1>Your Notes</h1>
                <div className="row my-3">
                    {notes.map((note) => {
                        return (
                            <Noteitem
                                key={note._id}
                                updateNote={updateNote}
                                note={note}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Notes;
