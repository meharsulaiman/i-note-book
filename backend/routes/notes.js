const express = require("express");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

const fetchuser = require("../middleware/fetchuser");

const router = express.Router();

// ROUTE 1: fetch all notes: GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal Server error occured");
    }
});

// ROUTE 2: create a new note: POST "/api/notes/addnote". login required
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body(
            "discription",
            "Discription must be at least 8 charecters"
        ).isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        try {
            const { title, discription, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title,
                discription,
                tag,
                user: req.user.id,
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal Server error occured");
        }
    }
);

// ROUTE 3: update an existing note: PUT "/api/notes/updatenote ". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, discription, tag } = req.body;
    try {
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (discription) {
            newNote.discription = discription;
        }
        if (tag) {
            newNote.tag = tag;
        }
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal Server error occured");
    }
});

// ROUTE 4: update an existing note: DELETE "/api/notes/deltenote ". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal Server error occured");
    }
});

module.exports = router;
