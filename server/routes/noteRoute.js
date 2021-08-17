const express = require("express");
const router = express.Router();
const { getNotes , createNote , getNoteBYId , updateNote , deleteNote } = require("../controllers/notesController.js")
const { protect } = require("../middleware/auth.js")

router.route("/").get(protect,getNotes)
router.route("/create").post(protect , createNote)
router.route("/:id").get(getNoteBYId).put(protect , updateNote).delete(protect , deleteNote)
// .put().delete();




module.exports = router;