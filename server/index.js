const express = require("express");
const cors = require("cors");;
const dotenv = require("dotenv");
const connectMongo = require("./config/db.js")
const userRoute = require("./routes/userRoute.js")
const noteRoute = require("./routes/noteRoute.js")

const app = express();

dotenv.config()
connectMongo()
const PORT = 8000;


app.use(cors());
app.use(express.json())


app.use("/api/users" , userRoute);
app.use("/api/notes" , noteRoute);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello Buddy" });
})

app.get("/api/notes" , (req,res) => {
    res.send(notes);
})


app.listen(PORT, () => {
    console.log("server listen at port 8000");
})
