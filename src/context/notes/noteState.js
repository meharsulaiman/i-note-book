import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    // Add note
    const getNotes = async () => {
        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0ZWNhNzE2MzZiM2MyYTYzMDBhMTBjIn0sImlhdCI6MTY2NjE1NDYwOX0.CtlKcp9hPYHE4_O5izB2iyUE8ymXYo4JQNvDultFBXM",
            },
        });
        // SET data in notes state
        const json = await response.json();
        setNotes(json);
    };

    // Delete note
    const deleteNote = async (id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0ZWNhNzE2MzZiM2MyYTYzMDBhMTBjIn0sImlhdCI6MTY2NjE1NDYwOX0.CtlKcp9hPYHE4_O5izB2iyUE8ymXYo4JQNvDultFBXM",
            },
        });
        // SET data in notes state
        const json = await response.json();
        // setNotes(json);
        console.log(json);

        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };

    const addNote = async (title, discription, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0ZWNhNzE2MzZiM2MyYTYzMDBhMTBjIn0sImlhdCI6MTY2NjE1NDYwOX0.CtlKcp9hPYHE4_O5izB2iyUE8ymXYo4JQNvDultFBXM",
            },
            body: JSON.stringify({ title, discription, tag }),
        });

        const json = await response.json();
        console.log(json);

        const note = {
            _id: "634ff7e220bd967e261ac6e69d",
            user: "634eca71636b3c2a6300a10c",
            title: title,
            discription: discription,
            tag: tag,
            date: "2022-10-19T13:13:06.153Z",
            __v: 0,
        };
        setNotes(notes.concat(note));
    };

    // Edit note
    const editNote = async (id, title, discription, tag) => {
        const response = await fetch(
            `${host}/api/notes/updatenote/634ff7c16a7d074f04bb7c2c`,
            {
                method: "PUT",
                headers: {
                    "auth-token":
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0ZWNhNzE2MzZiM2MyYTYzMDBhMTBjIn0sImlhdCI6MTY2NjE1NDYwOX0.CtlKcp9hPYHE4_O5izB2iyUE8ymXYo4JQNvDultFBXM",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, discription, tag }),
            }
        );
        const json = await response.json();
        console.log(json);

        for (let note of notes) {
            if (note._id === id) {
                note.title = title;
                note.discription = discription;
                note.tag = tag;
            }
        }
    };
    return (
        <NoteContext.Provider
            value={{ notes, addNote, deleteNote, editNote, getNotes }}
        >
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
