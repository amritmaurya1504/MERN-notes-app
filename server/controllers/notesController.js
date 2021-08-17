const Note = require("../model/note.js");


const getNotes = async (req, res) => {
    const notes = await Note.find({ user : req.user._id })
    res.json(notes);
}

const createNote = async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category ) {
        res.status(422).json({ error: "Plz Enter all Field Provided" })
    }

    try {
        const note = new Note({user : req.user._id , title , content , category});

        const createNote = await note.save();

        res.status(201).json(createNote);

    } catch (error) {
        console.log(error);
    }
}

const getNoteBYId = async (req,res) => {
    try {
        const note = await Note.findById(req.params.id);

        if(note){
           res.json(note);
        }else{
            res.status(404).json({message : "Notes not found"})
        }

    } catch (error) {
        console.log(error);
    }
}

const updateNote = async (req,res) => {
   try {
       const { title , content , category } = req.body

       const note = await Note.findById(req.params.id);

       if(note.user.toString() !== req.user._id.toString()){
           res.status(401).json({error : "You cannot Perform this action"})
        }
        
        if(note){
            note.title = title;
            note.content = content;
            note.category = category;

            const updateNote = await note.save();
            res.status(201).json(updateNote)
        }else{
            res.status(404).json({error : "notes not found"})
        }


   } catch (error) {
       
   }
}

const deleteNote = async (req,res) => {
    const note = await Note.findById(req.params.id);

    
    if(note.user.toString() !== req.user._id.toString()){
        res.status(401).json({error : "You cannot Perform this action!"})
     }
    

     if(note){
         await note.remove();
         res.json({message : "Note Removed!"});
     }else{
         res.json("Note not found!")
     }
}


module.exports = { getNotes , createNote , getNoteBYId , updateNote , deleteNote}