const express = require("express");
const cors = require("cors");;
const dotenv = require("dotenv");
const connectMongo = require("./config/db.js")
const userRoute = require("./routes/userRoute.js")
const noteRoute = require("./routes/noteRoute.js")
const path = require("path");

const app = express();

dotenv.config()
connectMongo()
const PORT = 1337;


app.use(cors());
app.use(express.json())



app.use("/api/users", userRoute);
app.use("/api/notes", noteRoute);


app.get("/api/notes", (req, res) => {
    res.send(notes);
})


const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/build")));


app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "build", "index.html"))
})

app.listen(PORT, () => {
    console.log("server started!");
})
