const User = require("../model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req,res) => {
    const { name, email, password , picUrl } = req.body;

    if (!name || !email || !password || !picUrl) {
        res.status(422).json({ error: "Plz Enter all Field Provided" })
    }

    try {
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            res.status(422).json({ error: "User already Exist" });
        } else {
            const user = new User({ name, email, password , picUrl });
            await user.save();

            res.status(201).json({ message: "User Registered Succesfully" })
        }

    } catch (error) {
        console.log(error);
    }

}
const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(422).json({ error: "Plz Enter all filed" });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(422).json({ error: "Invalid Credentials" })
            } else {
                userLogin.password = undefined
                const token = jwt.sign({ _id: userLogin._id }, "mynameisamritrajmauryaofjehanabad");
                res.status(200).json({ message: "User Login Succesfully", userLogin, token });
            }
        } else {
            return res.status(422).json({ error: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error);
    }

}

module.exports = { registerUser , loginUser };