const mongoose=require('mongoose')
const dbSchema=mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        message:{
            type:String,
            require:true
        }
    }
);

const contactUserData=new mongoose.model('contactme',dbSchema)

module.exports=contactUserData