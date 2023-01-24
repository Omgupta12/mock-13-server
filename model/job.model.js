const {Schema,model} = require("mongoose")

const JobSchema = new Schema({
    name:{type:String,required:true},
    position:{type:String,required:true},
   contract:{type:String,required:true},
   location:{type:String,required:true}
},
{ timestamps: true }
)
const JobModel = model("job",JobSchema)

module.exports = JobModel