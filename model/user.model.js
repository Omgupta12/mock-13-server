const {Schema,model} = require("mongoose")

const UserSchema = new Schema({
    username:{type:String,required:true},
    email:{type:String, unique: true,required:true},
    password:{type:String,required:true},
    role:{
        type:String,
        default:"user"
       }
},
{ timestamps: true }
)
const UserModel = model("user",UserSchema)

module.exports = UserModel