import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.discription}</p>
                    <i
                        className="fa-solid fa-trash-can mx-2"
                        onClick={() => {
                            deleteNote(props.note._id);
                        }}
                    ></i>
                    <i
                        className="fa-solid fa-pen-to-square mx-2"
                        onClick={() => {
                            props.updateNote(props.note);
                        }}
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
