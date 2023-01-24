const express = require("express")
const UserModel = require("../model/user.model")
const app = express.Router()
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

app.get("/getProfile", async(req, res) => {
    try {
        const allusers = await UserModel.find()
        // console.log(allusers)
        res.send(allusers)
    }
    catch (e) {
        console.log("err", e)
        res.send({ message: e.message })
    }
})

// register-route
app.post("/register", async (req, res) => {
    const {username,email, password } = req.body
    const hash = await argon2.hash(password)

    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.send({ status: false, message: "User already exist!" });
    }
    else{
    try {
        const admin = email.includes("@masaischool.com");
        console.log('admin:', admin)
        if(admin){
          const user =  new UserModel({
            username,
            email,
            password ,
            role:"admin"
          });
          await user.save()
          return res.send({ status: true, message: "ADMIN" });
          
        }
        else{
            const newuser = new UserModel({username, email, password:hash })
            await newuser.save()
            console.log(newuser)
            return  res.status(201).send("user created")
        }
    }
    catch (e) {
       return res.send({ message: e.message })
    }
}
})

// login-route
app.post("/login", async(req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })

    try {
        if(user){
            if(user.email=== email && user.password == password || await argon2.verify(user.password, password)){
                const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, "SECRET", { expiresIn: "5 days" })
                return res.status(201).send({message:"login success",token})
            }
            else{
                return  res.send("wrong details ")
            }
        }
        else{
            return  res.send("wrong details ")
        }


    } catch (e) {
       return  res.send(e.message)
    }
})

module.exports = app